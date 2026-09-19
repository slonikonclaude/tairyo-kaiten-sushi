import { Dela_Gothic_One, Zen_Kaku_Gothic_New } from "next/font/google";
import type { ReactNode } from "react";
import { preload } from "react-dom";
import { LOGO } from "@/components/Logo";
import { MotionProvider } from "@/components/MotionProvider";
import { withBase } from "@/lib/basePath";
import { getDictionary, type Locale } from "@/lib/dictionaries";

/**
 * Общая оболочка для обоих корневых layout-ов ((es) и (en)): у каждого языка
 * свой <html lang>, поэтому layout-ов два, а шрифты и body описаны один раз.
 *
 * Шрифты (DESIGN.md §6): Dela Gothic One — заголовки, номера и цены-акценты (тяжёлый
 * японский плакатный гротеск, ближе всего к рубленым заголовкам их карты); Zen Kaku
 * Gothic New — текст, кнопки, карта. Subset latin: в нём все знаки испанского; иероглифы
 * 大漁回転寿司 Google отдаёт отдельными срезами по unicode-range — грузятся, только если
 * встречаются на странице, и не предзагружаются.
 */

const display = Dela_Gothic_One({
  variable: "--font-dela",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const sans = Zen_Kaku_Gothic_New({
  variable: "--font-zen",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);
  // Вордмарк в шапке — CSS-маска: без предзагрузки браузер находит файл только после раскладки.
  preload(withBase(LOGO.wordmark), { as: "image", fetchPriority: "high", crossOrigin: "anonymous" });

  return (
    <html lang={dict.htmlLang} className={`${display.variable} ${sans.variable} h-full`}>
      <head>
        {/* Без JS motion не снимает свой inline opacity:0 — блоки возвращаются на место; карта показывается целиком (DESIGN.md §7–8). */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}@layer theme{.menu-panel[hidden]{display:block!important}[role=tablist]{display:none!important}}.menu-panel::before{content:attr(data-title);display:block;margin:2rem 0 1rem;font-family:var(--font-display);font-size:1.6rem}.cinta-pause{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
