"use client";

import { useState } from "react";
import { IconPause, IconPlay } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { carta, type Dish } from "@/lib/menu";

/**
 * Лента кайтэн (DESIGN.md §4, §7.2): полоса туши, по которой едут «тарелки» с номерами и
 * названиями блюд из их карты. Дорожка — два одинаковых набора, сдвиг на −50 % по кругу
 * (только transform, CSS-анимация в globals.css). Сама лента — декор (aria-hidden): те же
 * блюда есть текстом в карте. Кнопка паузы нужна по WCAG 2.2.2 (движение дольше 5 с);
 * при prefers-reduced-motion лента стоит, и кнопка скрыта.
 */

/** Блюда с понятными без раздела названиями — по номерам карты, чтобы не разойтись с ней. */
const NUMS = ["301", "2001", "309", "3002", "908", "311", "3006", "910", "102", "8", "2012", "305", "401", "701"];
const PLATES = ["bg-plate-yellow", "bg-plate-blue", "bg-plate-pink", "bg-plate-green", "bg-tairyo"];

const all: Dish[] = Object.values(carta).flat().flatMap((g) => g.dishes);
const dishes = NUMS.map((n) => all.find((d) => d.num === n)).filter((d): d is Dish => Boolean(d));

export function Cinta({ locale }: { locale: Locale }) {
  const c = getDictionary(locale).cinta;
  const [paused, setPaused] = useState(false);

  return (
    <div className="cinta tone-dark relative overflow-hidden border-y-4 border-tairyo" data-paused={paused}>
      <div aria-hidden="true" className="cinta-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center gap-12 py-6 pr-12 pl-6 sm:gap-16 sm:pr-16">
            {dishes.map((d, i) => (
              <li key={`${copy}-${d.num}`} className="flex items-center gap-4 whitespace-nowrap">
                <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${PLATES[i % PLATES.length]}`}>
                  <span className="h-5 w-5 rounded-full border-2 border-ink/25 bg-paper/90" />
                </span>
                <span className="tabular text-[0.8rem] font-bold tracking-[0.12em] text-tairyo-bright">{d.num}</span>
                <span className="font-display text-[1.15rem] text-on-dark">{d.name[locale]}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        className="cinta-pause absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-on-dark/30 bg-ink text-on-dark transition-colors duration-200 hover:border-on-dark motion-reduce:hidden"
      >
        {paused ? <IconPlay width={18} height={18} /> : <IconPause width={18} height={18} />}
        <span className="sr-only">{paused ? c.play : c.pause}</span>
      </button>
    </div>
  );
}
