import { HoursTable } from "@/components/HoursTable";
import { Img } from "@/components/Img";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { IconCalendar, IconDirections, IconExternal, IconInstagram, IconMail, IconPhone, IconPin } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { photos } from "@/lib/photos";
import { restaurant } from "@/lib/restaurant";

/**
 * «Visítanos» (DESIGN.md §7.9): часы (Google) с живым статусом по Мадриду, адрес и контакты,
 * бронь (звонок + Reserve with Google), фасад и карта Google по клику (components/MapEmbed.tsx).
 */
export function Visit({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const v = dict.visit;
  const a = restaurant.address;
  const link = "inline-flex min-h-11 items-center gap-3 underline decoration-line underline-offset-4 transition-colors hover:decoration-tairyo";

  return (
    <Section id="visitanos" tone="light" eyebrow={v.eyebrow} title={v.title} note={v.near} kanji="地図">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <Reveal className="flex flex-col gap-10">
          <div>
            <h3 className="eyebrow text-tairyo-deep">{v.hours}</h3>
            <div className="mt-4">
              <HoursTable locale={locale} />
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-tairyo-deep">{v.reserve}</h3>
            <p className="mt-3 max-w-[46ch] text-muted">{v.reserveText}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`tel:${restaurant.phone.tel}`}
                className="tabular inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-tairyo px-6 font-bold whitespace-nowrap text-on-red transition-colors duration-200 hover:bg-tairyo-deep"
              >
                <IconPhone width={18} height={18} />
                {dict.cta.callLong(locale === "en" ? restaurant.phone.international : restaurant.phone.display)}
              </a>
              <a
                href={restaurant.reserveOnline[locale]}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 font-bold whitespace-nowrap text-ink transition-colors duration-200 hover:border-ink"
              >
                <IconCalendar width={18} height={18} />
                {dict.cta.reserveOnline}
                <span className="sr-only"> {dict.cta.newTab}</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-tairyo-deep">{v.contact}</h3>
            <address className="mt-4 flex flex-col gap-1 text-ink not-italic">
              <span className="flex items-start gap-3 py-2">
                <IconPin width={19} height={19} className="mt-1 shrink-0 text-tairyo-deep" />
                <span>
                  {a.street}
                  <br />
                  {a.district}, {a.postalCode} {a.city}
                </span>
              </span>
              <a href={restaurant.directionsUrl} target="_blank" rel="noopener" className={link}>
                <IconDirections width={19} height={19} className="shrink-0 text-tairyo-deep" />
                {dict.cta.directions}
                <span className="sr-only"> {dict.cta.newTab}</span>
              </a>
              <a href={`mailto:${restaurant.email}`} className={link}>
                <IconMail width={19} height={19} className="shrink-0 text-tairyo-deep" />
                {restaurant.email}
              </a>
              <a href={restaurant.instagram.url} target="_blank" rel="noopener" className={link}>
                <IconInstagram width={19} height={19} className="shrink-0 text-tairyo-deep" />@{restaurant.instagram.handle}
                <span className="sr-only"> {dict.cta.newTab}</span>
              </a>
            </address>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-[1.75rem] bg-paper-deep">
            <Img photo={photos.fachada} locale={locale} sizes="(min-width: 1280px) 640px, (min-width: 1024px) 52vw, 92vw" className="aspect-[4/3] w-full object-cover" />
          </div>
          <MapEmbed locale={locale} />
          <a
            href={restaurant.googleMapsUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 self-start font-bold text-ink underline decoration-tairyo underline-offset-4 hover:decoration-2"
          >
            <IconExternal width={16} height={16} />
            {v.openMaps}
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
