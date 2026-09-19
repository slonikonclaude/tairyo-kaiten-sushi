"use client";

import { useState, useSyncExternalStore } from "react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { DAYS, popularTimes, venueHours, type DayKey, type Hour } from "@/lib/restaurant";

/**
 * «Cuándo venir» (DESIGN.md §7.7): «Horas punta» Google (`[84]` карточки) по дням — две
 * группы столбиков, обед 13–16 и ужин 20–23. Высота — transform: scaleY (не height).
 * Смысл не держится на графике: под ним строкой пик и спокойный час, для скринридера —
 * таблица. На сервере выбрана суббота (самый загруженный день), после гидратации — сегодня
 * по Мадриду: статический HTML не зависит от даты сборки.
 *
 * «Спокойный час» берётся только из часов, целиком попадающих в смену (13, 14, 15 и 20, 21, 22):
 * 16:00 и 23:00 — последние полчаса перед закрытием, приходить туда на буфет бессмысленно.
 * Объявление для скринридера — отдельный live-регион, пустой до первого выбора дня: иначе
 * он читался бы сам при загрузке.
 */
const noop = () => () => {};
const WEEKDAY: Record<string, DayKey> = { Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu", Fri: "fri", Sat: "sat", Sun: "sun" };
const today = (): DayKey => WEEKDAY[new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", weekday: "short" }).format(new Date())] ?? "sat";
const busiestDay = (): DayKey => "sat";

const toHours = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h + m / 60;
};
/** Час h целиком внутри смены: opens ≤ h и h + 1 ≤ closes. */
const fullyOpen = (h: Hour) => venueHours[0].shifts.some((s) => toHours(s.opens) <= h.hour && h.hour + 1 <= toHours(s.closes));

const hourLabel = (h: number) => `${h}:00`;
/** Буква на кнопке («X» — miércoles) должна входить в доступное имя: «X, miércoles», но просто «Lunes». */
const plain = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function Busy({ locale }: { locale: Locale }) {
  const b = getDictionary(locale).busy;
  const initial = useSyncExternalStore(noop, today, busiestDay);
  const [picked, setPicked] = useState<DayKey | null>(null);
  const day = picked ?? initial;
  const hours = popularTimes[day];
  const peak = hours.reduce((a, h) => (h.load > a.load ? h : a));
  const calm = hours.filter(fullyOpen).reduce((a, h) => (h.load < a.load ? h : a));
  const groups: { label: string; hours: Hour[] }[] = [
    { label: b.lunch, hours: hours.filter((h) => h.hour < 17) },
    { label: b.dinner, hours: hours.filter((h) => h.hour >= 20) },
  ];
  const peakLine = b.peak(b.days[day], hourLabel(peak.hour));

  return (
    <Section id="cuando-venir" eyebrow={b.eyebrow} title={b.title} note={b.note}>
      <Reveal className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div role="group" aria-label={b.dayPicker} className="grid grid-cols-7 gap-0 rounded-full bg-paper-deep p-1 sm:gap-1">
            {DAYS.map((d) => {
              const letter = b.daysShort[d];
              const full = b.days[d];
              const spoken = plain(full).startsWith(plain(letter)) ? full : `${letter}, ${full}`;
              return (
                <button
                  key={d}
                  type="button"
                  aria-pressed={d === day}
                  onClick={() => setPicked(d)}
                  className={`min-h-11 cursor-pointer rounded-full text-[0.9rem] font-bold transition-colors duration-200 ${
                    d === day ? "bg-ink text-on-dark focus-visible:outline-offset-2 forced-colors:underline forced-colors:decoration-2 forced-colors:underline-offset-4" : "text-muted hover:text-ink"
                  }`}
                >
                  <span aria-hidden="true">{letter}</span>
                  <span className="sr-only">{spoken}</span>
                </button>
              );
            })}
          </div>

          <div aria-hidden="true" className="mt-8 grid grid-cols-2 gap-6 sm:gap-10">
            {groups.map((g) => (
              <div key={g.label}>
                <div className="flex h-44 items-end gap-2 border-b border-ink/20 sm:gap-3">
                  {g.hours.map((h) => (
                    <div key={h.hour} className="h-full flex-1">
                      <div
                        className={`h-full w-full origin-bottom rounded-t-lg transition-transform duration-300 ease-out motion-reduce:transition-none ${
                          h === peak ? "bg-tairyo forced-colors:bg-[Highlight]" : "bg-ink/75 forced-colors:bg-[CanvasText]"
                        }`}
                        style={{ transform: `scaleY(${Math.max(h.load, 4) / 100})` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="tabular mt-2 flex gap-2 text-[0.75rem] text-muted sm:gap-3">
                  {g.hours.map((h) => (
                    <span key={h.hour} className="flex-1 text-center">
                      {h.hour}
                    </span>
                  ))}
                </div>
                <p className="eyebrow mt-3 text-ink">{g.label}</p>
              </div>
            ))}
          </div>

          <div className="sr-only">
            <table>
              <caption>
                {b.chartTitle} — {b.days[day]}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{b.table.hour}</th>
                  <th scope="col">{b.table.load}</th>
                </tr>
              </thead>
              <tbody>
                {hours.map((h) => (
                  <tr key={h.hour}>
                    <th scope="row">{hourLabel(h.hour)}</th>
                    <td>{h.load}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="sr-only" aria-live="polite">
            {picked ? `${peakLine} ${b.calm(hourLabel(calm.hour))}` : ""}
          </p>
        </div>

        <div className="flex flex-col justify-end gap-4 lg:col-span-4">
          <p className="font-display text-[1.35rem] leading-snug text-ink">{peakLine}</p>
          <p className="text-muted">{b.calm(hourLabel(calm.hour))}</p>
          <p className="border-t border-ink/15 pt-4 text-[0.95rem] text-ink">{b.busiest}</p>
        </div>
      </Reveal>
    </Section>
  );
}
