import type { CSSProperties } from "react";
import { withBase } from "@/lib/basePath";

/**
 * Знак Tairyo — их настоящий логотип, вырезанный с обложки PDF-карты (300 dpi) в две
 * альфа-маски: тушь (буквы, ролл, иероглифы) и красный (кольцо-энсо, начинка ролла)
 * — `_data/scripts/make-brand.py`. Цвет туши — currentColor (на светлом тушь, на тёмном
 * бумага), красный всегда токен `tairyo`. Сами знаки декоративные: подпись — в `label`.
 */
export const LOGO = {
  ink: "/brand/logo-ink.webp",
  red: "/brand/logo-red.webp",
  /** «TAIRYO / KAITEN SUSHI» без кольца — для шапки (270×92). */
  wordmark: "/brand/wordmark.webp",
  markInk: "/brand/mark-ink.webp",
  markRed: "/brand/mark-red.webp",
} as const;

const mask = (src: string) => ({ "--mask": `url("${withBase(src)}")` }) as CSSProperties;

/** Горизонтальный вордмарк (270×92, ширина : высота ≈ 2,93; 3× от 30 px шапки). */
export function Wordmark({ height = 30, className = "", label }: { height?: number; className?: string; label?: string }) {
  return (
    <span className={`inline-flex ${className}`}>
      <span aria-hidden="true" className="logo-mask" style={{ ...mask(LOGO.wordmark), height, width: Math.round(height * 2.93) }} />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}

/** Полный круглый логотип (540×456, 3× от 180 px на 404): кольцо, ролл, два слова, иероглифы. */
export function LogoRound({ width = 240, className = "", label }: { width?: number; className?: string; label?: string }) {
  const height = Math.round((width * 456) / 540);
  return (
    <span className={`relative inline-block shrink-0 ${className}`} style={{ width, height }}>
      <span aria-hidden="true" className="logo-mask absolute inset-0 bg-tairyo" style={mask(LOGO.red)} />
      <span aria-hidden="true" className="logo-mask absolute inset-0" style={mask(LOGO.ink)} />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}

/** Ролл с красной начинкой — знак без слов (191×205). */
export function Mark({ size = 40, className = "" }: { size?: number; className?: string }) {
  const width = Math.round((size * 191) / 205);
  return (
    <span aria-hidden="true" className={`relative inline-block shrink-0 ${className}`} style={{ width, height: size }}>
      <span className="logo-mask absolute inset-0" style={mask(LOGO.markInk)} />
      <span className="logo-mask absolute inset-0 bg-tairyo" style={mask(LOGO.markRed)} />
    </span>
  );
}

/**
 * Мазок кисти — как под каждым заголовком их карты. Рваные края и «сухие» волокна
 * на хвосте; растягивается по ширине контейнера. Цвет — currentColor.
 */
export function Brush({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 400 40" preserveAspectRatio="none" className={`block ${className}`}>
      <path
        fill="currentColor"
        d="M6 21c12-5 30-8 52-9 30-2 64-2 96-3 34-1 70-1 104 0 30 1 62 1 92 2 16 0 30 1 42 3l-2 3c-10 0-20 0-30 1 12 1 24 2 34 4l-3 3c-14 0-28 0-42 1 14 1 28 2 38 4l-6 2c-26 1-58 2-92 2-38 1-80 1-118 0-34-1-66-2-92-3-22-1-44-1-62-2 6-2 4-4-2-5 4-1 2-3-9-3z"
      />
      <path fill="currentColor" opacity=".75" d="M232 34c34 0 72 0 108 1 16 0 30 1 42 1l-1 1.6c-40 0-86 0-128-.4-8 0-16-.6-21-.9z" />
      <path fill="currentColor" opacity=".6" d="M286 7.5c28-.6 58-.4 84 .6l-.4 1.4c-28-.6-56-.8-84-.8z" />
    </svg>
  );
}

/**
 * Сэйгайха — узор волн с фона их карты: ряды концентрических полукругов тонкой линией.
 * SVG-паттерн: круги залиты цветом фона, поэтому нижний ряд перекрывает верхний, как в
 * оригинале. `id` обязателен и уникален на странице (паттерн ссылается на него).
 */
export function Seigaiha({
  id,
  className = "",
  r = 26,
  lineClass = "stroke-tairyo/20",
  fillClass = "fill-paper",
}: {
  id: string;
  className?: string;
  r?: number;
  lineClass?: string;
  fillClass?: string;
}) {
  const rings = [1, 0.78, 0.56, 0.34, 0.12];
  // Ряды через r/2, чётные со сдвигом на r; порядок отрисовки — сверху вниз.
  const centers: [number, number][] = [
    [r, -r / 2],
    [0, 0],
    [2 * r, 0],
    [r, r / 2],
    [0, r],
    [2 * r, r],
    [r, (3 * r) / 2],
  ];
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={id} width={2 * r} height={r} patternUnits="userSpaceOnUse">
          {centers.map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              {rings.map((k, i) => (
                <circle
                  key={k}
                  cx={cx}
                  cy={cy}
                  r={r * k}
                  className={`${i === 0 ? fillClass : "fill-none"} ${lineClass}`}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
