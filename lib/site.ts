import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { photos } from "@/lib/photos";
import { restaurant } from "@/lib/restaurant";

/**
 * Абсолютный адрес сайта. В CI его отдаёт `actions/configure-pages`
 * (origin без basePath); локально метаданные остаются относительными.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "";
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/+$/, "");

/** Цвет адресной строки — `--color-paper` из globals.css (метаданные не читают CSS-переменные). */
export const THEME_COLOR = "#faf7f2";

/** Канонический адрес языковой версии: испанский в корне, английский в /en/. */
export const pathFor = (locale: Locale) => (locale === "es" ? "/" : "/en/");

/** То же, но с basePath — для обычных <a>, которым Next префикс не добавляет. */
export const hrefFor = (locale: Locale) => `${basePath}${pathFor(locale)}`;

export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const path = pathFor(locale);
  // Превью соцсетей — public/og.jpg 1200×630 (кадр ленты и поезда): JPEG, а не WebP, — его понимают все мессенджеры.
  const og = photos.hero;

  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl + basePath + "/") } : {}),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: path,
      languages: { es: pathFor("es"), en: pathFor("en"), "x-default": pathFor("es") },
    },
    openGraph: {
      type: "website",
      siteName: restaurant.fullName,
      locale: locale === "es" ? "es_ES" : "en_GB",
      alternateLocale: locale === "es" ? ["en_GB"] : ["es_ES"],
      title: dict.meta.title,
      description: dict.meta.description,
      url: path,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: og.alt[locale] }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}
