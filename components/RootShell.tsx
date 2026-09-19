import localFont from "next/font/local";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/MotionProvider";
import { getDictionary, type Locale } from "@/lib/dictionaries";

/**
 * Общая оболочка для обоих корневых layout-ов ((es) и (en)): у каждого языка
 * свой <html lang>, поэтому layout-ов два, а шрифты и body описаны один раз.
 *
 * Шрифты (DESIGN.md §6): Dela Gothic One — заголовки, номера и цены-акценты (тяжёлый
 * японский плакатный гротеск, ближе всего к рубленым заголовкам их карты); Zen Kaku
 * Gothic New 400/700 — текст, кнопки, карта. Файлы — сабсеты Google Fonts по символам сайта
 * (Latin-1, пунктуация, € и ~20 иероглифов: _data/scripts/fetch-fonts.mjs), три woff2 ~42 КБ.
 * next/font/google отдавал Zen 238 срезами по unicode-range и предзагружал их все (2,9 МБ).
 */

const display = localFont({
  src: "../app/fonts/dela-gothic-one-400.woff2",
  variable: "--font-dela",
  weight: "400",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "../app/fonts/zen-kaku-gothic-new-400.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/zen-kaku-gothic-new-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-zen",
  display: "swap",
});

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);
  return (
    <html lang={dict.htmlLang} className={`${display.variable} ${sans.variable} h-full`}>
      <head>
        {/* Без JS motion не снимает свой inline opacity:0 — блоки возвращаются на место; карта показывается целиком (DESIGN.md §7–8). */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}@layer theme{.menu-panel[hidden]{display:block!important}[role=tablist]{display:none!important}}.menu-panel::before{content:attr(data-title);display:block;margin:2rem 0 1rem;font-family:var(--font-display);font-size:1.6rem}.cinta-pause{display:none!important}.cinta-track{animation:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
