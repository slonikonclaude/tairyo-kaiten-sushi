import { LogoRound } from "@/components/Logo";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { hoursLine, restaurant } from "@/lib/restaurant";
import { hrefFor } from "@/lib/site";

/** Подвал: круглый логотип (тушь → бумага на тёмном), адрес, часы, телефон, ссылки, Аликанте, источники данных. */
export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const f = dict.footer;
  const a = restaurant.address;
  const link = "inline-flex min-h-11 items-center text-on-dark-muted underline-offset-4 transition-colors duration-200 hover:text-on-dark hover:underline";

  return (
    <footer className="tone-dark">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <LogoRound width={150} className="text-on-dark" label={restaurant.fullName} />
          <p className="mt-6 max-w-[34ch] text-on-dark-muted">{f.tagline}</p>
        </div>
        <div className="flex flex-col gap-1 text-[0.97rem] text-on-dark">
          <p>{a.street}</p>
          <p>
            {a.district}, {a.postalCode} {a.city}
          </p>
          <p className="tabular mt-3">{hoursLine}</p>
          <p className="text-on-dark-muted">{dict.hero.everyDay}</p>
          <a href={`tel:${restaurant.phone.tel}`} className={`tabular ${link}`}>
            {restaurant.phone.display}
          </a>
        </div>
        <nav aria-label={f.links} className="flex flex-col text-[0.97rem]">
          <a href={restaurant.instagram.url} target="_blank" rel="noopener" className={link}>
            Instagram · @{restaurant.instagram.handle}
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
          <a href={restaurant.googleMapsUrl} target="_blank" rel="noopener" className={link}>
            Google Maps
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
          <a href={restaurant.website} target="_blank" rel="noopener" className={link}>
            {f.officialSite} · tairyokaitensushi.com
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
          <a href={restaurant.alicante.url} target="_blank" rel="noopener" className={link}>
            {f.alicante(restaurant.alicante.street)}
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
          <a href={hrefFor(dict.otherLocale.code)} hrefLang={dict.otherLocale.code} lang={dict.otherLocale.code} className={link}>
            {dict.otherLocale.code === "en" ? "English" : "Español"}
          </a>
        </nav>
      </div>
      <div className="border-t border-ink-line">
        <p className="mx-auto max-w-7xl px-5 py-6 text-[0.82rem] text-on-dark-muted sm:px-8">{f.sources}</p>
      </div>
    </footer>
  );
}
