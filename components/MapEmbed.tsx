"use client";

import { useEffect, useRef, useState } from "react";
import { Mark } from "@/components/Logo";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { restaurant } from "@/lib/restaurant";

/**
 * Карта Google грузится по клику: iframe сразу ставит cookies Google, а для
 * испанского сайта это требует согласия (RGPD/LSSI). До клика — заглушка того же
 * размера (без сдвига вёрстки) с адресом и знаком-роллом; ссылка «Abrir en Google Maps»
 * рядом работает всегда.
 */
export function MapEmbed({ locale }: { locale: Locale }) {
  const v = getDictionary(locale).visit;
  const [on, setOn] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  // Кнопка исчезает вместе с заглушкой — фокус переносится на саму карту, а не теряется в <body>.
  useEffect(() => {
    if (on) frameRef.current?.focus();
  }, [on]);
  const src = `https://www.google.com/maps?q=${restaurant.googleMapsEmbedQuery}&hl=${locale}&z=17&output=embed`;
  const a = restaurant.address;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-paper-deep">
      {on ? (
        <iframe ref={frameRef} title={v.mapTitle} src={src} referrerPolicy="no-referrer-when-downgrade" className="block aspect-[4/3] w-full border-0" />
      ) : (
        <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 p-6 text-center">
          <Mark size={52} />
          <p className="font-display text-[1.3rem] leading-tight text-ink">
            {a.street}
            <span className="mt-1 block font-sans text-[1rem] text-muted">
              {a.postalCode} {a.city}
            </span>
          </p>
          <button
            type="button"
            onClick={() => setOn(true)}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border border-ink/30 bg-paper px-5 text-[0.95rem] font-bold text-ink transition-colors duration-200 hover:border-ink"
          >
            {v.loadMap}
          </button>
          <p className="max-w-[40ch] text-[0.82rem] text-muted">{v.mapConsent}</p>
        </div>
      )}
    </div>
  );
}
