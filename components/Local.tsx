import { Img } from "@/components/Img";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { IconCard, IconChild, IconPin, IconUsers, IconWheelchair } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { photos, type PhotoKey } from "@/lib/photos";

/**
 * «El local» (DESIGN.md §7.6): тёмная секция — жёлтый свет шоджи и неон лучше всего читаются
 * на туши. Текст — только то, что видно на фото и сказано в карточке Google (атрибуты) и на
 * их сайте (история кайтэна). Галерея — колонками (masonry): высокие и широкие кадры без дыр.
 */
const GALLERY: PhotoKey[] = ["trenVapor", "mascaras", "kokeshi", "onigiri", "shinkansen", "neon", "banderas", "baoConejo", "trenNeon", "inari"];

export function Local({ locale }: { locale: Locale }) {
  const l = getDictionary(locale).local;
  const facts = [
    { Icon: IconWheelchair, text: l.facts.wheelchair },
    { Icon: IconChild, text: l.facts.kids },
    { Icon: IconUsers, text: l.facts.groups },
    { Icon: IconCard, text: l.facts.cards },
    { Icon: IconPin, text: l.facts.parking },
  ];

  return (
    <Section id="local" eyebrow={l.eyebrow} title={l.title} tone="dark" kanji="店内">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="flex flex-col gap-10 lg:col-span-5">
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-on-dark-muted">
            {l.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>

          <div>
            <h3 className="eyebrow text-tairyo-bright">{l.factsTitle}</h3>
            <ul className="mt-4 flex flex-col divide-y divide-ink-line border-y border-ink-line">
              {facts.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-4 py-3.5 text-on-dark">
                  <Icon width={22} height={22} className="shrink-0 text-tairyo-bright" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-[1.5rem] border border-ink-line bg-ink-soft p-6 sm:p-7">
            <h3 className="font-display text-[1.25rem] text-on-dark">{l.historyTitle}</h3>
            <p className="mt-3 leading-relaxed text-on-dark-muted">{l.history}</p>
          </aside>
        </Reveal>

        <Reveal className="grid grid-cols-5 gap-4 self-start lg:col-span-7 lg:grid-rows-[minmax(0,1fr)] lg:self-stretch">
          <div className="col-span-3 aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-ink-soft lg:aspect-auto">
            <Img photo={photos.barra} locale={locale} sizes="(min-width: 1280px) 420px, (min-width: 1024px) 34vw, 56vw" className="h-full w-full object-cover" />
          </div>
          <div className="col-span-2 overflow-hidden rounded-[1.75rem] bg-ink-soft">
            <Img photo={photos.entrada} locale={locale} sizes="(min-width: 1280px) 280px, (min-width: 1024px) 23vw, 37vw" className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </div>

      <h3 className="sr-only">{l.gallery}</h3>
      <RevealGroup as="ul" className="mt-14 columns-2 gap-4 md:columns-3 lg:columns-5">
        {GALLERY.map((k) => (
          <RevealItem as="li" key={k} className="mb-4 break-inside-avoid overflow-hidden rounded-[1.25rem] bg-ink-soft">
            <Img photo={photos[k]} locale={locale} sizes="(min-width: 1024px) 240px, (min-width: 768px) 31vw, 46vw" className="block h-auto w-full" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
