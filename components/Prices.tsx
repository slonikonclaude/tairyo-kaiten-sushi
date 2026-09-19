"use client";

import { useSyncExternalStore } from "react";
import { Seigaiha } from "@/components/Logo";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { IconCheck, IconChild } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatPrice } from "@/lib/format";
import { buffet, type TierId } from "@/lib/menu";

/**
 * Цены буфета (DESIGN.md §7.4): три взрослых тарифа карточками, дети, правила.
 * Клиентская ради метки «ahora»: по времени Мадрида (не посетителя) выбирается тариф
 * ближайшей смены — обед (до 16:30), ужин (до 23:30), после — обед завтра. На сервере и
 * без JS метки нет (useSyncExternalStore → null), статический HTML не зависит от даты
 * сборки. Праздники не угадываем: под карточками — строка «en festivos…».
 */

type Now = { tier: TierId; when: "lunchToday" | "dinnerToday" | "lunchTomorrow" };

function madridNow(): Now {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((x) => x.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  const weekendLunch = (d: number) => d === 0 || d === 6;
  if (minutes < 16 * 60 + 30) return { tier: weekendLunch(day) ? "weekend" : "lunch", when: "lunchToday" };
  if (minutes < 23 * 60 + 30) return { tier: day >= 1 && day <= 4 ? "dinner" : "weekend", when: "dinnerToday" };
  const next = (day + 1) % 7;
  return { tier: weekendLunch(next) ? "weekend" : "lunch", when: "lunchTomorrow" };
}

let cache: { key: string; value: Now } | null = null;
/** Снимок для useSyncExternalStore должен быть стабильным между вызовами — кэш по значению. */
const snapshot = () => {
  const v = madridNow();
  const key = `${v.tier}|${v.when}`;
  if (!cache || cache.key !== key) cache = { key, value: v };
  return cache.value;
};
const subscribe = (cb: () => void) => {
  const t = window.setInterval(cb, 60_000);
  return () => window.clearInterval(t);
};

export function Prices({ locale }: { locale: Locale }) {
  const pr = getDictionary(locale).prices;
  const now = useSyncExternalStore<Now | null>(subscribe, snapshot, () => null);
  const eur = (v: number) => formatPrice(v, locale);

  return (
    <Section id="precios" eyebrow={pr.eyebrow} title={pr.title} note={pr.note} kanji="価格">
      <RevealGroup as="ul" className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-3">
        {buffet.adult.map((t) => {
          const tier = pr.tiers[t.id];
          const current = now?.tier === t.id;
          return (
            <RevealItem
              as="li"
              key={t.id}
              className={`relative flex flex-col overflow-hidden rounded-[1.75rem] border p-7 sm:p-8 ${
                current ? "border-tairyo bg-paper ring-2 ring-tairyo" : "border-line bg-paper"
              }`}
            >
              {t.id === "weekend" ? (
                <div aria-hidden="true" className="absolute -right-10 -bottom-12 h-44 w-44 overflow-hidden rounded-full">
                  <Seigaiha id="tier-waves" r={14} lineClass="stroke-tairyo/30" />
                </div>
              ) : null}
              <div className="relative flex min-h-8 items-center justify-between gap-3">
                <h3 className="font-display text-[1.35rem] leading-tight text-ink">{tier.name}</h3>
                {current && now ? (
                  <span className="shrink-0 rounded-full bg-tairyo px-3 py-1 text-[0.78rem] font-bold text-on-red">{pr.now[now.when]}</span>
                ) : null}
              </div>
              <p className="relative mt-2 text-[0.95rem] leading-snug text-muted">{tier.when}</p>
              <p className="relative mt-8 flex items-baseline gap-2">
                <span className="tabular font-display text-[2.8rem] leading-none text-ink sm:text-[3.2rem]">{eur(t.price)}</span>
              </p>
              <p className="relative mt-1 text-[0.9rem] text-muted">{pr.perPerson}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <p className="mt-4 text-[0.9rem] text-muted">{pr.now.holiday}</p>

      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h3 className="flex items-center gap-3 font-display text-[1.3rem] text-ink">
            <IconChild width={24} height={24} className="text-tairyo-deep" />
            {pr.kids}
          </h3>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            <div className="flex items-baseline justify-between gap-4 py-4">
              <dt>{pr.kidsUnder}</dt>
              <dd className="tabular font-display text-[1.4rem] text-ink">{eur(buffet.kids)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-4">
              <dt>{pr.babies}</dt>
              <dd className="font-display text-[1.4rem] text-tairyo-deep">{pr.free}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal className="lg:col-span-7">
          <h3 className="font-display text-[1.3rem] text-ink">{pr.rulesTitle}</h3>
          <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-3 sm:grid-cols-2">
            {pr.rules.map((r) => (
              <li key={r} className="flex gap-3 leading-snug">
                <IconCheck width={20} height={20} className="mt-0.5 shrink-0 text-tairyo-deep" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.82rem] text-muted">{pr.source}</p>
        </Reveal>
      </div>
    </Section>
  );
}
