import type { Locale } from "@/lib/dictionaries";

const intlLocale = (locale: Locale) => (locale === "es" ? "es-ES" : "en-GB");

/** Целое число с разделителем групп: `useGrouping: "always"`, иначе CLDR не
 *  разделяет четырёхзначные числа и одно число выглядело бы по-разному. */
export function formatCount(value: number, locale: Locale) {
  return new Intl.NumberFormat(intlLocale(locale), { useGrouping: "always" }).format(value);
}

/** Рейтинг всегда с одним знаком после запятой: 4,5 / 4.5. */
export function formatRating(value: number, locale: Locale) {
  return new Intl.NumberFormat(intlLocale(locale), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Цена одной строкой. По-испански «13,90 €», по-английски «€13.90». Всегда
 * два знака после запятой — на их табличке «13.90», на тикете «13,90 €», а на
 * сайте колонка цен не должна прыгать. Intl сам ставит неразрывный пробел перед € в испанской локали.
 */
export function formatPrice(value: number, locale: Locale) {
  return new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Средний чек «от–до» без копеек: «10–20 €» по-испански, «€10–20» по-английски. */
export function formatPriceRange(from: number, to: number, locale: Locale) {
  return locale === "es" ? `${from}–${to}\u00a0€` : `€${from}–${to}`;
}

/**
 * Месяц источника: «septiembre de 2026» / «September 2026». Google даёт у фото
 * только относительную дату («hace una semana»), поэтому точнее месяца не пишем.
 */
export function formatMonth(iso: string, locale: Locale) {
  const [y, m] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(intlLocale(locale), { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 15)));
}

const utc = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
};

/** Кнопка дня в ленте: «mié.» + «16» / «Wed» + «16». */
export function formatDayChip(iso: string, locale: Locale) {
  const date = utc(iso);
  const weekday = new Intl.DateTimeFormat(intlLocale(locale), { weekday: "short", timeZone: "UTC" }).format(date);
  const day = new Intl.DateTimeFormat(intlLocale(locale), { day: "numeric", timeZone: "UTC" }).format(date);
  return { weekday, day };
}

/** Полная дата: «miércoles, 16 de septiembre de 2026» / «Wednesday 16 September 2026». */
export function formatDateLong(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(intlLocale(locale), { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(utc(iso));
}

/**
 * Короткая дата без дня недели: «16 sept. 2026» / «16 Sept 2026». CLDR отдаёт
 * испанские сокращения месяцев без точки — она добавляется к сокращённому месяцу.
 */
export function formatDateShort(iso: string, locale: Locale) {
  const parts = new Intl.DateTimeFormat(intlLocale(locale), { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).formatToParts(utc(iso));
  return parts
    .map((p) => (locale === "es" && p.type === "month" && !p.value.endsWith(".") && p.value.length < 5 ? `${p.value}.` : p.value))
    .join("");
}

/**
 * Диапазон дат недели: «9 al 16 de septiembre de 2026» (после «del» по-испански
 * нужен «al», а не тире) / «9–16 September 2026» (без тонких пробелов ICU).
 */
export function formatDateRange(fromIso: string, toIso: string, locale: Locale) {
  const long = (iso: string) => new Intl.DateTimeFormat(intlLocale(locale), { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(utc(iso));
  if (locale === "es") {
    const a = utc(fromIso);
    const b = utc(toIso);
    const sameMonth = a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth();
    return `${sameMonth ? a.getUTCDate() : long(fromIso)} al ${long(toIso)}`;
  }
  return new Intl.DateTimeFormat(intlLocale(locale), { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    .formatRange(utc(fromIso), utc(toIso))
    .replace(/(\d)\s*–\s*(\d)/g, "$1–$2");
}

/** Час «14:00» — 24-часовой формат на обоих языках, как часы работы на сайте. */
export function formatHour(hour: number) {
  return `${hour}:00`;
}

/**
 * Дата снимка: «febrero de 2026» / «Feb 2026», а если известен только год —
 * «2023». По-испански месяц полностью: сокращения CLDR идут без точки, а «may»
 * читается как английское слово.
 */
export function formatPhotoDate(date: string, locale: Locale) {
  if (/^\d{4}$/.test(date)) return date;
  const [y, m] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(intlLocale(locale), { month: locale === "es" ? "long" : "short", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 15)));
}
