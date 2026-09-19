"use client";

import { m, useReducedMotion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Img } from "@/components/Img";
import { IconFlame } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatPrice } from "@/lib/format";
import { carta, TABS, type Dish, type TabId } from "@/lib/menu";
import { photos, type PhotoKey } from "@/lib/photos";

/**
 * Карта вкладками (DESIGN.md §7.5): Sushi · Cocina caliente · Fuera de buffet · Bebidas.
 * Настоящий tablist: стрелки ←/→, Home/End, фокус переезжает вместе с выбором. Лента
 * вкладок липкая внутри секции — у секции `overflow-x-clip`, а не hidden (hidden ломает sticky).
 *
 * Все панели есть в HTML (неактивные — `hidden`): без JS, при печати и для поисковиков карта
 * видна целиком (правила в RootShell и globals.css, заголовок панели — из `data-title`).
 * При смене вкладки из глубины длинного списка страница возвращается к началу карты.
 * Первая панель приходит из SSR без анимации; проявление — только после первой смены.
 */

const PHOTO: Record<TabId, PhotoKey> = { sushi: "nigiris", cocina: "baoPato", fuera: "matcha", bebidas: "trenRefrescos" };

const count = (tab: TabId) => carta[tab].reduce((n, g) => n + g.dishes.length, 0);

export function MenuTabs({ locale }: { locale: Locale }) {
  const c = getDictionary(locale).carta;
  const [active, setActive] = useState<TabId>("sushi");
  const [changed, setChanged] = useState(false);
  const reduced = useReducedMotion();
  const base = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const select = (id: TabId, focus = false) => {
    if (id === active) return;
    const strip = stripRef.current;
    const panel = document.getElementById(`${base}-panel-${active}`);
    const stuck = strip && panel && panel.getBoundingClientRect().top < strip.getBoundingClientRect().bottom - 1;
    setActive(id);
    setChanged(true);
    const tab = document.getElementById(`${base}-tab-${id}`);
    if (focus) tab?.focus();
    tab?.scrollIntoView({ inline: "nearest", block: "nearest", behavior: reduced ? "auto" : "smooth" });
    if (stuck) rootRef.current?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = TABS.length;
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    select(TABS[next], true);
  };

  const content = (tab: TabId) => {
    const photo = photos[PHOTO[tab]];
    return (
      <>
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-12">
          <div>
            <p className="font-display text-[1.6rem] leading-tight text-ink sm:text-[1.9rem]">{c.tabs[tab]}</p>
            <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-ink">{c.intros[tab]}</p>
            {tab === "fuera" ? <p className="mt-3 text-[0.95rem] text-muted">{c.supplementNote}</p> : null}
          </div>
          <figure>
            <div className="overflow-hidden rounded-[1.5rem] bg-paper">
              <Img photo={photo} locale={locale} sizes="(min-width: 1280px) 520px, (min-width: 768px) 42vw, 92vw" className="aspect-[16/10] w-full object-cover" />
            </div>
            <figcaption className="mt-2 text-[0.85rem] text-muted">{c.photoCaptions[tab]}</figcaption>
          </figure>
        </div>

        <div className="mt-12 gap-14 md:columns-2">
          {carta[tab].map((g) => (
            <div key={g.id} className="mb-12 break-inside-avoid">
              <h3 className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2 font-display text-[1.45rem] leading-tight text-ink">
                {g.title[locale]}
                <span className="tabular font-sans text-[0.8rem] font-bold tracking-[0.12em] text-muted">{g.dishes.length}</span>
              </h3>
              <ul>
                {g.dishes.map((d) => (
                  <DishRow key={`${d.num}-${d.name.es}`} dish={d} locale={locale} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div ref={rootRef}>
      <div ref={stripRef} className="sticky top-18 z-20 -mx-5 border-b border-ink/10 bg-paper-deep/95 px-5 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div role="tablist" aria-label={c.tabsLabel} className="rail -mb-px flex gap-1 overflow-x-auto py-2">
          {TABS.map((id, i) => {
            const selected = id === active;
            return (
              <button
                key={id}
                id={`${base}-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${base}-panel-${id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(id)}
                onKeyDown={(e) => onKey(e, i)}
                className={`inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 text-[0.95rem] font-bold whitespace-nowrap transition-colors duration-200 focus-visible:outline-offset-[-4px] ${
                  selected ? "bg-ink text-on-dark focus-visible:outline-on-dark forced-colors:underline forced-colors:decoration-2 forced-colors:underline-offset-4" : "text-ink hover:bg-paper"
                }`}
              >
                {c.tabs[id]}
                <span className={`tabular text-[0.78rem] ${selected ? "text-on-dark-muted" : "text-muted"}`}>{count(id)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {TABS.map((id) => {
        const isActive = id === active;
        return (
          <div
            key={id}
            id={`${base}-panel-${id}`}
            role="tabpanel"
            aria-labelledby={`${base}-tab-${id}`}
            data-title={c.tabs[id]}
            tabIndex={0}
            hidden={!isActive}
            className="menu-panel pt-10 focus-visible:outline-offset-8"
          >
            {isActive && changed && !reduced ? (
              <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                {content(id)}
              </m.div>
            ) : (
              content(id)
            )}
          </div>
        );
      })}
    </div>
  );
}

function DishRow({ dish, locale }: { dish: Dish; locale: Locale }) {
  const c = getDictionary(locale).carta;
  const eur = (v: number) => formatPrice(v, locale);
  const showEs = locale === "en" && dish.name.es !== dish.name.en;
  const single = dish.prices.length === 1 && !dish.prices[0].unit;

  return (
    <li className="grid grid-cols-[3.4rem_minmax(0,1fr)] gap-x-3 border-b border-ink/10 py-4 last:border-b-0">
      <span className="tabular pt-0.5 font-display text-[1rem] leading-snug text-tairyo-deep">
        {dish.hideNum ? null : (
          <>
            <span className="sr-only">{c.number} </span>
            {dish.num}
          </>
        )}
      </span>
      <div className="min-w-0">
        <div className="flex items-baseline gap-3">
          <p className="min-w-0 font-bold leading-snug text-ink" style={{ overflowWrap: "anywhere" }}>
            {dish.name[locale]}
            {dish.spicy ? (
              <span className="ml-2 inline-flex translate-y-[-0.08em] items-center gap-0.5 rounded-full bg-tairyo/10 px-2 py-0.5 align-middle text-[0.72rem] font-bold text-tairyo-deep">
                {Array.from({ length: dish.spicy }).map((_, i) => (
                  <IconFlame key={i} width={12} height={12} />
                ))}
                <span className="ml-0.5">{c.spicy[dish.spicy]}</span>
              </span>
            ) : null}
          </p>
          {single ? (
            <>
              <span aria-hidden="true" className="leader" />
              <p className="tabular shrink-0 text-right font-bold text-ink">
                {dish.prices[0].supplement ? `+${eur(dish.prices[0].value)}` : eur(dish.prices[0].value)}
              </p>
            </>
          ) : null}
        </div>
        {showEs ? (
          <p lang="es" className="text-[0.85rem] text-muted italic">
            {dish.name.es}
          </p>
        ) : null}
        {dish.desc ? <p className="mt-1 text-[0.93rem] leading-relaxed text-muted">{dish.desc[locale]}</p> : null}
        {dish.prices.length > 1 || (dish.prices.length === 1 && dish.prices[0].unit) ? (
          <p className="tabular mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.93rem] text-ink">
            {dish.prices.map((p) => (
              <span key={p.unit} className="whitespace-nowrap">
                <span className="text-muted">{p.unit === "glass" ? c.glass : c.bottle} </span>
                <span className="font-bold">{eur(p.value)}</span>
              </span>
            ))}
          </p>
        ) : null}
        {dish.pieces || dish.allergens.length ? (
          <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[0.78rem] leading-tight text-muted">
            {dish.pieces ? <span className="mr-1 font-bold text-ink/80">{dish.pieces[locale]}</span> : null}
            {dish.allergens.length ? <span className="sr-only">{c.allergensLabel}: </span> : null}
            {dish.allergens.map((a) => (
              <span key={a} className="rounded-full border border-ink/15 bg-paper px-2 py-0.5">
                {c.allergens[a]}
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </li>
  );
}
