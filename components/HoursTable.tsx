"use client";

import { useSyncExternalStore } from "react";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { DAYS, restaurant, type DayKey } from "@/lib/restaurant";

/**
 * Часы работы (две смены в день) с выделением сегодняшнего дня и строкой статуса.
 * Время — Europe/Madrid, а не часы посетителя: турист из другого пояса должен видеть,
 * открыто ли в Валенсии. На сервере «сегодня» неизвестно (useSyncExternalStore → null):
 * статус и выделение появляются после гидратации, HTML сервера не зависит от даты сборки.
 */

const WEEKDAY: Record<string, DayKey> = { Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu", Fri: "fri", Sat: "sat", Sun: "sun" };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

type Now = { day: DayKey; minutes: number };
let cache: { key: string; value: Now } | null = null;
function snapshot(): Now {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const value = { day: WEEKDAY[get("weekday")], minutes: Number(get("hour")) * 60 + Number(get("minute")) };
  const key = `${value.day}|${value.minutes}`;
  if (!cache || cache.key !== key) cache = { key, value };
  return cache.value;
}
const subscribe = (cb: () => void) => {
  const t = window.setInterval(cb, 30_000);
  return () => window.clearInterval(t);
};

export function HoursTable({ locale }: { locale: Locale }) {
  const v = getDictionary(locale).visit;
  const now = useSyncExternalStore<Now | null>(subscribe, snapshot, () => null);

  let status: string | null = null;
  let isOpen = false;
  if (now) {
    const shifts = restaurant.hours.find((d) => d.day === now.day)!.shifts;
    const open = shifts.find((s) => now.minutes >= toMinutes(s.opens) && now.minutes < toMinutes(s.closes));
    const next = shifts.find((s) => now.minutes < toMinutes(s.opens));
    if (open) {
      isOpen = true;
      status = v.openNow(open.closes);
    } else if (next) status = v.opensAt(next.opens);
    else {
      // После ужина — открытие завтрашнего дня, и в тексте это «mañana», а не «a las 13:00».
      const tomorrow = restaurant.hours.find((d) => d.day === DAYS[(DAYS.indexOf(now.day) + 1) % 7])!.shifts[0];
      status = v.opensTomorrow(tomorrow.opens);
    }
  }

  return (
    <div>
      <p className="tabular min-h-7 font-bold text-ink">
        {status ? (
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 rounded-full ${isOpen ? "bg-tairyo" : "border-2 border-muted"}`} />
            {status}
          </span>
        ) : null}
      </p>
      <table className="mt-3 w-full max-w-md text-[0.98rem]">
        <caption className="sr-only">{v.hours}</caption>
        <tbody>
          {restaurant.hours.map((d) => {
            const isToday = now?.day === d.day;
            return (
              <tr key={d.day} className="border-b border-line">
                <th scope="row" className={`py-2.5 text-left ${isToday ? "font-bold" : "font-normal"} text-ink`}>
                  {v.days[d.day]}{" "}
                  {isToday ? <span className="ml-2 rounded-full bg-tairyo px-2 py-0.5 text-[0.75rem] font-bold text-on-red">{v.today}</span> : null}
                </th>
                <td className={`tabular py-2.5 text-right text-ink ${isToday ? "font-bold" : ""}`}>{d.shifts.map((s) => `${s.opens}–${s.closes}`).join(" · ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-3 text-[0.9rem] text-muted">{v.hoursNote}</p>
    </div>
  );
}
