import type { CSSProperties } from "react";
import type { Locale } from "@/lib/dictionaries";
import { srcFor, type Photo } from "@/lib/photos";

/**
 * Обычный <img> со srcset (next/image при статическом экспорте не оптимизирует).
 * width/height — от исходника, против сдвига вёрстки; `sizes` задаёт место.
 * Точка кадрирования по умолчанию — `photo.position` (lib/photos.ts).
 */
export function Img({
  photo,
  locale,
  sizes,
  className = "",
  style,
  priority = false,
  decorative = false,
}: {
  photo: Photo;
  locale: Locale;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  decorative?: boolean;
}) {
  const { src, srcSet } = srcFor(photo);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={decorative ? "" : photo.alt[locale]}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={className}
      style={{ objectPosition: photo.position, ...style }}
    />
  );
}
