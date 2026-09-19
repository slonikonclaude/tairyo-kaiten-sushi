import { Img } from "@/components/Img";
import { Brush, Seigaiha } from "@/components/Logo";
import { Stars } from "@/components/Stars";
import { IconArrow, IconCalendar, IconPhone } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatPrice, formatRating, formatCount } from "@/lib/format";
import { buffet } from "@/lib/menu";
import { photos } from "@/lib/photos";
import { restaurant } from "@/lib/restaurant";

/**
 * Первый экран (DESIGN.md §7.1). Без скролловой анимации: это LCP, а motion при SSR
 * вписал бы opacity:0 в HTML. Слева — h1 их строкой из Instagram, слоган их карты
 * красным, цена «desde», рейтинг и часы; справа — поезд над лентой в раме с красным
 * «солнцем» и узором сэйгайха, как фон их карты.
 */
export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const h = dict.hero;
  const from = Math.min(...buffet.adult.map((t) => t.price));

  return (
    <section data-hero="" className="tone-light relative overflow-hidden pt-18">
      <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-12 px-5 pt-10 pb-16 sm:px-8 sm:pt-16 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-20">
        <div className="lg:col-span-7">
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-tairyo-deep">
            <span>{h.eyebrow}</span>
            <span aria-hidden="true" className="h-px w-8 bg-tairyo/50" />
            <span lang="ja" className="font-sans tracking-[0.3em] text-muted">
              {restaurant.kanji}
            </span>
          </p>

          <h1 className="balance mt-6 font-display text-[2.6rem] leading-[1.06] text-ink sm:text-[3.6rem] lg:text-[4.1rem] xl:text-[4.6rem]">{h.title}</h1>

          <p className="mt-6 flex flex-col gap-2 text-tairyo-deep">
            <span className="balance font-display text-[1.25rem] leading-snug sm:text-[1.5rem]">{h.slogan}</span>
            <Brush className="h-3 w-44 text-tairyo" />
          </p>

          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted">{h.lead}</p>

          <div className="mt-9 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <a
              href={`tel:${restaurant.phone.tel}`}
              className="tabular inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-tairyo px-7 text-[1.02rem] font-bold text-on-red transition-colors duration-200 hover:bg-tairyo-deep"
            >
              <IconPhone width={19} height={19} />
              {dict.cta.reserveCall(restaurant.phone.display)}
            </a>
            <a
              href="#carta"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ink/25 px-7 text-[1.02rem] font-bold text-ink transition-colors duration-200 hover:border-ink"
            >
              {dict.cta.seeCarta}
              <IconArrow width={18} height={18} />
            </a>
          </div>
          <p className="mt-4 text-[0.95rem] text-muted">
            <a
              href={restaurant.reserveOnline[locale]}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 underline decoration-tairyo/40 underline-offset-4 transition-colors hover:text-ink hover:decoration-tairyo"
            >
              <IconCalendar width={17} height={17} />
              {dict.cta.reserveOnlineLong}
              <span className="sr-only"> {dict.cta.newTab}</span>
            </a>
          </p>

          <dl className="mt-10 grid max-w-xl grid-cols-[minmax(0,1fr)] gap-5 border-t border-line pt-7 min-[520px]:grid-cols-3 min-[520px]:gap-6">
            <div>
              <dt className="eyebrow text-muted">{h.factPrice}</dt>
              <dd className="tabular mt-1.5 font-display text-[1.45rem] whitespace-nowrap text-ink">{formatPrice(from, locale)}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">{h.factRating}</dt>
              <dd className="mt-1.5 flex flex-col gap-1">
                <span className="tabular font-display text-[1.45rem] text-ink">
                  {formatRating(restaurant.rating.value, locale)} <span className="font-sans text-[0.95rem] text-muted">/ 5</span>
                </span>
                <span className="flex items-center gap-2 text-[0.85rem] text-muted">
                  <Stars value={restaurant.rating.value} idPrefix="hero" size={14} className="text-tairyo" />
                  <span className="tabular">{h.reviews(formatCount(restaurant.rating.count, locale))}</span>
                </span>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">{h.factHours}</dt>
              <dd className="tabular mt-1.5 text-[1rem] leading-snug font-bold text-ink">
                {restaurant.hours[0].shifts.map((sh) => (
                  <span key={sh.opens} className="block">
                    {sh.opens}–{sh.closes}
                  </span>
                ))}
                <span className="mt-0.5 block text-[0.85rem] font-normal text-muted">{h.everyDay}</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          {/* Красное «солнце» и волны — фон их карты; декор. */}
          <div aria-hidden="true" className="absolute -top-8 -right-10 h-56 w-56 rounded-full bg-tairyo sm:h-72 sm:w-72" />
          <div aria-hidden="true" className="absolute bottom-16 -left-12 h-64 w-64 overflow-hidden rounded-full">
            <Seigaiha id="hero-waves" r={18} lineClass="stroke-tairyo/35" />
          </div>
          <figure className="relative">
            <div className="overflow-hidden rounded-[2rem] border-[6px] border-paper bg-paper-deep">
              <Img photo={photos.hero} locale={locale} priority sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, (min-width: 488px) 436px, calc(100vw - 52px)" className="aspect-[4/5] w-full object-cover" />
            </div>
            <figcaption className="relative mt-4 flex items-start gap-3 text-[0.9rem] leading-snug text-muted">
              <span aria-hidden="true" className="mt-2 h-px w-6 shrink-0 bg-tairyo" />
              {h.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
