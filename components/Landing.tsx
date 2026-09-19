import { Busy } from "@/components/Busy";
import { Carta } from "@/components/Carta";
import { Cinta } from "@/components/Cinta";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { How } from "@/components/How";
import { JsonLd } from "@/components/JsonLd";
import { Local } from "@/components/Local";
import { Prices } from "@/components/Prices";
import { Reviews } from "@/components/Reviews";
import { Visit } from "@/components/Visit";
import { preload } from "react-dom";
import { LOGO } from "@/components/Logo";
import { withBase } from "@/lib/basePath";
import type { Locale } from "@/lib/dictionaries";

/**
 * Порядок секций — DESIGN.md §7; тон чередуется: бумага, лента-тушь, плотная бумага,
 * бумага, плотная бумага (карта), тушь (зал), бумага, плотная бумага, бумага, красный CTA.
 * Обе языковые страницы собираются из одного компонента.
 */
export function Landing({ locale }: { locale: Locale }) {
  // Вордмарк в шапке — CSS-маска: без предзагрузки браузер находит файл только после раскладки.
  // Здесь, а не в RootShell: на 404 шапки нет, и предзагрузка висела бы впустую.
  preload(withBase(LOGO.wordmark), { as: "image", fetchPriority: "high", crossOrigin: "anonymous" });
  return (
    <>
      <JsonLd locale={locale} />
      <Header locale={locale} />
      <main id="contenido" className="flex-1">
        <Hero locale={locale} />
        <Cinta locale={locale} />
        <How locale={locale} />
        <Prices locale={locale} />
        <Carta locale={locale} />
        <Local locale={locale} />
        <Busy locale={locale} />
        <Reviews locale={locale} />
        <Visit locale={locale} />
        <CtaBand locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
