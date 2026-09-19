/**
 * Иконки — свои SVG, один набор: штрих 1.6, скругление round, сетка 24.
 * Эмодзи вместо иконок нет: они зависят от шрифта системы и не красятся токенами.
 *
 * Все иконки декоративные: рядом всегда есть видимый текст, поэтому
 * aria-hidden и focusable="false" зашиты внутрь. Если иконка останется одна,
 * текстовая альтернатива ставится на месте использования.
 */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base: P = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const IconPin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </svg>
);

export const IconStar = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="m12 3.6 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.6Z" />
  </svg>
);

/** Частично залитая звезда — для дробного рейтинга 4,7 (`ratio` 0…1). Градиент с уникальным id,
 *  иначе при нескольких рядах звёзд на странице id бы совпадали. */
export const IconStarHalf = ({ gradientId = "halfStar", ratio = 0.5, ...p }: P & { gradientId?: string; ratio?: number }) => (
  <svg {...base} {...p}>
    <defs>
      <linearGradient id={gradientId}>
        <stop offset={`${ratio * 100}%`} stopColor="currentColor" />
        <stop offset={`${ratio * 100}%`} stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      d="m12 3.6 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.6Z"
      fill={`url(#${gradientId})`}
      stroke="currentColor"
      strokeWidth={1.2}
    />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconExternal = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 5h5v5M19 5l-7.5 7.5" />
    <path d="M18 13.5V18a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V7.5A1.5 1.5 0 0 1 6 6h4.5" />
  </svg>
);

export const IconMenuBars = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.2 4L19 7" />
  </svg>
);

/** Instagram — контур камеры, без логотипа бренда. */
export const IconInstagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

/** Направление — стрелка-указатель для «Cómo llegar». */
export const IconDirections = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2.8 21.2 12 12 21.2 2.8 12 12 2.8Z" />
    <path d="M9.5 14v-2.2a1.3 1.3 0 0 1 1.3-1.3h4.2M13.2 8.5 15 10.5l-1.8 2" />
  </svg>
);

/** Чашка — для «как заказать». */

/** Лапа — «perros bienvenidos». */

/** Лист — «opción vegana». */

export const IconPhone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 4h3.2l1.6 4.2-2 1.3a11 11 0 0 0 6.7 6.7l1.3-2L20 15.8V19a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 3.4 5.7 1.6 1.6 0 0 1 5 4Z" />
  </svg>
);

export const IconCalendar = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <path d="M8 14h2M14 14h2M8 17h2" />
  </svg>
);



export const IconPlate = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="6" />
    <path d="M3 4v5a2 2 0 0 0 2 2v9M5 4v4M21 4c-1.7 0-3 2-3 5s1.3 3 3 3v8" />
  </svg>
);


export const IconUsers = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
    <circle cx="16.5" cy="9.5" r="2.4" />
    <path d="M15.8 14.3c2.3.1 4 1.7 4.7 4.2" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7 7.5 6 7.5-6" />
  </svg>
);

export const IconWheelchair = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="4.5" r="1.6" />
    <path d="M11 7.5V13h5l2.5 5.5" />
    <path d="M11 10h4.5" />
    <path d="M8 11.2a5 5 0 1 0 7 6" />
  </svg>
);

export const IconCard = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18M7 15h3" />
  </svg>
);

export const IconBag = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5.5 8h13l-1 12.5h-11Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);

/** Синкансэн сбоку: длинный нос, окна, колёса на рельсе — поезд, который везёт заказ. */
export const IconTrain = (p: P) => (
  <svg {...base} {...p}>
    <path d="M2.5 16.5h15.5c2.5 0 3.5-1.3 3.5-2.3 0-1.4-2.6-3.1-6.5-4.4-2.6-.9-5.2-1.3-8-1.3H2.5Z" />
    <path d="M5 11.3h7.5M15 11.2c1.4.5 2.6 1 3.4 1.6" />
    <path d="M1.5 20h21" />
    <circle cx="6" cy="18.3" r=".9" />
    <circle cx="13" cy="18.3" r=".9" />
  </svg>
);

/** Тарелка под куполом на ленте — кайтэн. */
export const IconBelt = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 14a6 6 0 0 1 12 0" />
    <path d="M12 7.2V6.5" />
    <path d="M4 14h16l-1.5 2.5h-13Z" />
    <path d="M2 19.5h20" />
    <circle cx="5" cy="19.5" r=".4" />
    <circle cx="12" cy="19.5" r=".4" />
    <circle cx="19" cy="19.5" r=".4" />
  </svg>
);

/** Номер на столе / в карте — заказ по номеру. */
export const IconHash = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9.5 4 7.5 20M16.5 4l-2 16M5 9h15M4 15h15" />
  </svg>
);

/** Бокал/стакан — обязательный напиток. */
export const IconDrink = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.5 4h11l-1.4 15.2a1.5 1.5 0 0 1-1.5 1.3H9.4a1.5 1.5 0 0 1-1.5-1.3Z" />
    <path d="M7.2 10h9.6" />
  </svg>
);

/** Ребёнок — детский тариф. */
export const IconChild = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="6" r="2.5" />
    <path d="M8 21v-4.5L6.5 12.5c1.6-.8 3.5-1.3 5.5-1.3s3.9.5 5.5 1.3L16 16.5V21" />
    <path d="M12 16.5V21" />
  </svg>
);

/** Перо огня — «Picante». */
export const IconFlame = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21c3.6 0 6-2.4 6-5.6 0-3.8-3.3-5.6-4.1-9.4-2.4 1.6-3.6 3.8-3.4 6.2-1-.6-1.7-1.6-2-2.9C7.1 10.8 6 12.9 6 15.4 6 18.6 8.4 21 12 21Z" />
  </svg>
);

export const IconPause = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 6v12M15 6v12" />
  </svg>
);

export const IconPlay = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 5.5v13l10.5-6.5Z" />
  </svg>
);

