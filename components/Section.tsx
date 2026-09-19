import type { ReactNode } from "react";
import { Brush } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";

export type Tone = "light" | "deep" | "dark";

/**
 * Оболочка секции: надзаголовок капсом, заголовок Dela Gothic One и под ним мазок
 * красной кисти — как заголовки разделов их карты (DESIGN.md §4). Заголовок всегда h2 —
 * h1 один и живёт в hero. `kanji` — крупный иероглиф-водяной знак справа (декор, aria-hidden).
 * Тон чередуется: бумага, плотная бумага, тушь.
 */
export function Section({
  id,
  eyebrow,
  title,
  note,
  tone = "light",
  kanji,
  children,
  headerRight,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  note?: ReactNode;
  tone?: Tone;
  kanji?: string;
  children: ReactNode;
  headerRight?: ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`tone-${tone} relative py-20 sm:py-28 ${className}`}>
      {kanji ? (
        <span
          aria-hidden="true"
          lang="ja"
          className={`pointer-events-none absolute top-10 right-3 hidden font-display text-[9rem] leading-none select-none [writing-mode:vertical-rl] lg:block xl:right-10 ${
            dark ? "text-on-dark/[0.05]" : "text-ink/[0.045]"
          }`}
        >
          {kanji}
        </span>
      ) : null}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal as="header" className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div className="min-w-0">
              <p className={`eyebrow ${dark ? "text-tairyo-bright" : "text-tairyo-deep"}`}>{eyebrow}</p>
              <h2
                id={`${id}-title`}
                className={`balance mt-4 font-display text-[2.1rem] leading-[1.12] sm:text-[3rem] ${dark ? "text-on-dark" : "text-ink"}`}
                style={{ maxInlineSize: "20ch" }}
              >
                {title}
              </h2>
              <Brush className="mt-4 h-3.5 w-40 text-tairyo sm:h-4 sm:w-52" />
            </div>
            {headerRight}
          </div>
          {note ? <p className={`mt-7 max-w-[62ch] text-lg leading-relaxed ${dark ? "text-on-dark-muted" : "text-muted"}`}>{note}</p> : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
