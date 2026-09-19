import { Seigaiha } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { IconCalendar, IconPhone } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { restaurant } from "@/lib/restaurant";

/**
 * Последний экран перед подвалом — красная плоскость Tairyo с белым текстом (5,1:1) и узором
 * сэйгайха белой линией, как красная полоса внизу страниц их карты. Главное действие — звонок.
 */
export function CtaBand({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.ctaBand;

  return (
    <section aria-labelledby="cta-title" className="tone-red relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
        <Seigaiha id="cta-waves" r={22} lineClass="stroke-on-red/25" fillClass="fill-tairyo" />
      </div>
      <Reveal className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="cta-title" className="balance font-display text-[2.1rem] leading-tight text-on-red sm:text-[2.8rem]">
            {c.title}
          </h2>
          <p className="mt-3 max-w-[44ch] text-[1.05rem] text-on-red">{c.text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={`tel:${restaurant.phone.tel}`}
            className="tabular inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-8 text-base font-bold whitespace-nowrap text-on-dark transition-colors duration-200 hover:bg-ink-soft"
          >
            <IconPhone width={18} height={18} />
            {dict.cta.callLong(locale === "en" ? restaurant.phone.international : restaurant.phone.display)}
          </a>
          <a
            href={restaurant.reserveOnline[locale]}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border-2 border-on-red/70 bg-tairyo px-8 text-base font-bold whitespace-nowrap text-on-red transition-colors duration-200 hover:border-on-red"
          >
            <IconCalendar width={18} height={18} />
            {dict.cta.reserveOnline}
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
