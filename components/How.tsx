import { Img } from "@/components/Img";
import { RevealGroup, RevealItem, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { IconBelt, IconHash, IconPlate, IconTrain } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { photos } from "@/lib/photos";

/**
 * «Cómo funciona» (DESIGN.md §7.3): четыре шага кайтэна по их сайту, карте и Instagram.
 * Слева шаги с крупными номерами, как в их карте; справа — два кадра: лента и поезд,
 * который везёт заказ à la carte (главное отличие Tairyo).
 */
const ICONS = [IconBelt, IconPlate, IconTrain, IconHash];

export function How({ locale }: { locale: Locale }) {
  const h = getDictionary(locale).how;

  return (
    <Section id="como-funciona" eyebrow={h.eyebrow} title={h.title} note={h.note} tone="deep" kanji="回転">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-12 lg:gap-14">
        <RevealGroup as="ol" className="flex flex-col lg:col-span-6">
          {h.steps.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem as="li" key={s.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-t border-ink/15 py-7 first:border-t-0 first:pt-0 sm:gap-x-7">
                <span aria-hidden="true" className="tabular font-display text-[2.6rem] leading-none text-tairyo sm:text-[3.2rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="flex items-center gap-3 font-display text-[1.3rem] leading-snug text-ink sm:text-[1.45rem]">
                    <Icon width={24} height={24} className="shrink-0 text-tairyo-deep" />
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[52ch] leading-relaxed text-muted">{s.text}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="grid grid-cols-2 gap-4 self-start lg:col-span-6 lg:gap-5">
          <figure className="col-span-2">
            <div className="overflow-hidden rounded-[1.5rem] bg-ink">
              <Img photo={photos.trenBao} locale={locale} sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 92vw" className="aspect-[2/1] w-full object-cover" />
            </div>
            <figcaption className="mt-3 text-[0.9rem] leading-snug text-muted">{h.trainCaption}</figcaption>
          </figure>
          <figure>
            <div className="overflow-hidden rounded-[1.5rem] bg-ink">
              <Img photo={photos.cinta} locale={locale} sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, 45vw" className="aspect-[3/4] w-full object-cover" />
            </div>
            <figcaption className="mt-3 text-[0.9rem] leading-snug text-muted">{h.beltCaption}</figcaption>
          </figure>
          <figure>
            <div className="overflow-hidden rounded-[1.5rem] bg-ink">
              <Img photo={photos.mesa} locale={locale} sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, 45vw" className="aspect-[3/4] w-full object-cover" />
            </div>
          </figure>
          <p className="col-span-2 text-[0.82rem] text-muted">{h.sourceNote}</p>
        </Reveal>
      </div>
    </Section>
  );
}
