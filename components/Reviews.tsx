import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Stars } from "@/components/Stars";
import { IconExternal } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatCount, formatMonth, formatRating } from "@/lib/format";
import { restaurant, reviewsUrl } from "@/lib/restaurant";
import { reviews } from "@/lib/reviews";

/**
 * «Opiniones» (DESIGN.md §7.8). Сводка честная: рейтинг 4,4, вся гистограмма звёзд
 * (включая 16 единиц) и десять тем Google с числом упоминаний. Витрина — отзывы
 * на языке страницы, в оригинале (lib/reviews.ts), без переводов.
 */
export function Reviews({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const r = dict.reviews;
  const { value, count, histogram } = restaurant.rating;
  const max = Math.max(...histogram.map((h) => h.count));

  return (
    <Section id="opiniones" tone="deep" eyebrow={r.eyebrow} title={r.title} kanji="口コミ">
      <div className="grid gap-12 grid-cols-[minmax(0,1fr)] lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16">
        <Reveal className="flex flex-col gap-10">
          <div>
            <p className="flex items-end gap-3">
              <span className="tabular font-display text-[4.6rem] leading-[0.85] text-ink">{formatRating(value, locale)}</span>
              <span className="pb-1 text-muted">{r.outOf}</span>
            </p>
            <Stars value={value} idPrefix="reviews" size={20} className="mt-4 text-tairyo" />
            <p className="tabular mt-2 text-muted">{r.basedOn(formatCount(count, locale))}</p>
          </div>

          <div>
            <h3 className="eyebrow text-ink">{r.histogram}</h3>
            <dl className="mt-4 flex flex-col gap-2">
              {histogram.map((h) => (
                <div key={h.stars} className="grid grid-cols-[5rem_1fr_3rem] items-center gap-3 text-[0.9rem]">
                  <dt className="text-muted">{r.starsLabel(h.stars)}</dt>
                  <dd aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-paper">
                    <span className="block h-full rounded-full bg-tairyo" style={{ width: `${Math.max(1.5, (h.count / max) * 100)}%` }} />
                  </dd>
                  <dd className="tabular text-right text-ink">{formatCount(h.count, locale)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="eyebrow text-ink">{r.topicsTitle}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {restaurant.topics.map((t) => (
                <li key={t.key} className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-[0.9rem] text-ink">
                  {r.topics[t.key]}
                  <span aria-hidden="true" className="tabular text-muted">
                    {formatCount(t.count, locale)}
                  </span>
                  <span className="sr-only">, {r.topicCount(formatCount(t.count, locale))}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div>
          <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2">
            {reviews[locale].map((rv) => (
              <RevealItem as="li" key={rv.id}>
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6 sm:p-7">
                  <Stars value={rv.stars} idPrefix={`rv-${rv.id.slice(-10)}`} size={15} className="text-tairyo" />
                  <span className="sr-only">{r.stars(rv.stars)}</span>
                  <blockquote lang={locale} className="mt-4 flex-1 leading-relaxed whitespace-pre-line text-ink">
                    <p>{rv.text}</p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-baseline justify-between gap-3 border-t border-line pt-4 text-[0.92rem]">
                    <span className="font-bold text-ink">{rv.author}</span>
                    <span className="text-muted">{formatMonth(rv.month, locale)}</span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 font-bold text-ink underline decoration-tairyo underline-offset-4 hover:decoration-2"
            >
              {r.readAll}
              <IconExternal width={15} height={15} />
              <span className="sr-only"> {dict.cta.newTab}</span>
            </a>
            <p className="text-[0.88rem] text-muted">{r.googleNote}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
