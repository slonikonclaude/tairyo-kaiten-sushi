"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Wordmark } from "@/components/Logo";
import { IconCalendar, IconClose, IconMenuBars, IconPhone } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { restaurant } from "@/lib/restaurant";
import { hrefFor } from "@/lib/site";

/**
 * Шапка: бумага поверх бумаги hero, после первых 40 px прокрутки — линия снизу.
 * Клиентская из-за этого и мобильной панели: на узком экране ссылки уезжают
 * в полноэкранный блок, который закрывается по Esc и по нажатию на ссылку;
 * пока он открыт, страница под ним не прокручивается и недоступна фокусу (inert).
 *
 * Главное действие — «Reservar»: звонок на 666 25 63 50 (их Instagram: «¡Reserva ya tu
 * mesa!», DESIGN.md §2.7). До 420 px кнопка — одна иконка, иначе вордмарк, EN, кнопка и
 * бургер не помещаются в 375 px.
 */
export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Меню, открытое на узком экране, закрывается, если окно стало шире xl (поворот планшета):
  // бургер и панель там скрыты, а inert и запрет прокрутки иначе остались бы висеть.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        // Фокус был внутри панели, которая сейчас скроется — возвращаем его на кнопку меню.
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const behind = [document.getElementById("contenido"), document.querySelector("body > footer")];
    behind.forEach((el) => el?.setAttribute("inert", ""));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      behind.forEach((el) => el?.removeAttribute("inert"));
    };
  }, [open]);

  const links = [
    { href: "#como-funciona", label: dict.nav.how },
    { href: "#precios", label: dict.nav.prices },
    { href: "#carta", label: dict.nav.carta },
    { href: "#local", label: dict.nav.local },
    { href: "#opiniones", label: dict.nav.reviews },
    { href: "#visitanos", label: dict.nav.visit },
  ];

  const ring = "border-ink/25 hover:border-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-paper/95 text-ink backdrop-blur-md transition-colors duration-300 ${
        scrolled || open ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <a
        href="#contenido"
        className="sr-only rounded-sm bg-ink text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:px-4 focus:py-2"
      >
        {dict.nav.skipToContent}
      </a>

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <a href={hrefFor(locale)} className="flex min-h-11 min-w-0 items-center" aria-label={dict.nav.home}>
          <Wordmark height={30} className="max-[380px]:hidden" />
          <Wordmark height={24} className="min-[380px]:hidden" />
        </a>

        <nav className="hidden items-center gap-7 xl:flex" aria-label={dict.nav.sections}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="inline-flex min-h-11 items-center text-[0.95rem] transition-colors duration-200 hover:text-tairyo-deep">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={hrefFor(dict.otherLocale.code)}
            hrefLang={dict.otherLocale.code}
            lang={dict.otherLocale.code}
            aria-label={`${dict.otherLocale.label} — ${dict.otherLocale.aria}`}
            className={`flex h-11 min-w-11 items-center justify-center rounded-full border px-3 text-xs font-bold tracking-[0.18em] transition-colors duration-200 ${ring}`}
          >
            {dict.otherLocale.label}
          </a>

          <a
            href={`tel:${restaurant.phone.tel}`}
            aria-label={dict.cta.reserveAria(locale === "en" ? restaurant.phone.international : restaurant.phone.display)}
            className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-tairyo px-3 text-[0.95rem] font-bold text-on-red transition-colors duration-200 hover:bg-tairyo-deep min-[420px]:px-5"
          >
            <IconPhone width={18} height={18} />
            <span className="hidden min-[420px]:inline">{dict.cta.reserveShort}</span>
          </a>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 xl:hidden ${ring}`}
          >
            {open ? <IconClose /> : <IconMenuBars />}
          </button>
        </div>
      </div>

      <div id={panelId} hidden={!open} className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-paper text-ink xl:hidden">
        <nav className="mx-auto max-w-7xl px-5 py-4 sm:px-8" aria-label={dict.nav.sections}>
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center border-b border-line font-display text-[1.6rem] text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-6 sm:flex-row">
            <a
              href={`tel:${restaurant.phone.tel}`}
              className="tabular flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-tairyo px-5 text-base font-bold text-on-red"
            >
              <IconPhone width={18} height={18} />
              {dict.cta.callLong(locale === "en" ? restaurant.phone.international : restaurant.phone.display)}
            </a>
            <a
              href={restaurant.reserveOnline[locale]}
              target="_blank"
              rel="noopener"
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink/30 px-5 text-base font-bold text-ink"
            >
              <IconCalendar width={18} height={18} />
              {dict.cta.reserveOnline}
              <span className="sr-only"> {dict.cta.newTab}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
