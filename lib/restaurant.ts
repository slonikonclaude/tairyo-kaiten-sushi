/**
 * Факты о Tairyo Kaiten Sushi Valencia (C/ d'Isabel la Catòlica, 22).
 * Источники: карточка Google Maps (`0xd6049ee1638ec79:0xe1c35dee9909f208`, снята
 * 18.09.2026 → `_data/maps/`), их печатная карта 01.2026 и сайт (→ `_data/web/`),
 * Instagram @tairyokaitensushivalencia (→ `_data/maps/ig/`). Ничего не выдумано: если
 * поля в источнике нет, его нет и здесь. Расхождения решены в DESIGN.md §2–3.
 */

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export const DAYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export type Shift = { opens: string; closes: string };

/**
 * Недельная таблица карточки (`[203]`): каждый день 13:00–16:30 и 20:00–23:30.
 * Карта и страница контактов пишут «20:00–00:00», Instagram — «20:00–13:30h» (опечатка):
 * берём 23:30 Google — консервативно (DESIGN.md §2.5).
 */
export const venueHours: { day: DayKey; shifts: Shift[] }[] = DAYS.map((day) => ({
  day,
  shifts: [
    { opens: "13:00", closes: "16:30" },
    { opens: "20:00", closes: "23:30" },
  ],
}));

export const restaurant = {
  name: "Tairyo",
  fullName: "Tairyo Kaiten Sushi",
  /** Как в их Instagram: «Tairyo Kaiten Sushi Valencia». */
  localName: "Tairyo Kaiten Sushi Valencia",
  /** Иероглифы с логотипа: 大漁 «большой улов» + 回転寿司 «кайтэн-суси». */
  kanji: "大漁回転寿司",

  address: {
    street: "C/ d'Isabel la Catòlica, 22",
    district: "L'Eixample",
    postalCode: "46004",
    city: "València",
    region: "Comunitat Valenciana",
    country: "ES",
  },

  geo: { lat: 39.4675013, lng: -0.3696433 },
  plusCode: "FJ9J+24 València",

  /** Google + Instagram «Reservas: 666 256 350». Стационарный 963 28 55 74 с их сайта не показываем (DESIGN.md §2.4). */
  phone: { display: "666 25 63 50", international: "+34 666 25 63 50", tel: "+34666256350" },
  email: "info@tairyokaitensushi.com",

  instagram: { handle: "tairyokaitensushivalencia", url: "https://www.instagram.com/tairyokaitensushivalencia/" },
  website: "https://tairyokaitensushi.com/inicio-valencia/",
  /** Второй ресторан сети (их сайт, «Historia»): C/ Gerona, 15, Alicante. */
  alicante: { url: "https://tairyokaitensushi.com/inicio-alicante/", street: "C/ Gerona, 15", city: "Alicante" },

  /** «Reservar una mesa» карточки Google → Reserve with Google (партнёр Octotable). */
  reserveOnline: {
    es: "https://www.google.com/maps/reserve/v/dine/c/k_9swGzKF7k?source=pa&hl=es-ES",
    en: "https://www.google.com/maps/reserve/v/dine/c/k_9swGzKF7k?source=pa&hl=en-GB",
  },

  /** Короткая ссылка — та, что прислал заказчик; ведёт на эту карточку (place id ChIJeew4Fu5JYA0RCPIJme5dw-E). */
  googleMapsUrl: "https://maps.app.goo.gl/AaBT3UiktD4ZAo3G8",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Tairyo+Kaiten+Sushi%2C+Carrer+d%27Isabel+la+Cat%C3%B2lica+22%2C+46004+Val%C3%A8ncia&destination_place_id=ChIJeew4Fu5JYA0RCPIJme5dw-E",
  googleMapsEmbedQuery: "Tairyo+Kaiten+Sushi,+Carrer+d%27Isabel+la+Cat%C3%B2lica,+22,+46004+Val%C3%A8ncia",

  rating: {
    value: 4.4,
    count: 400,
    /** Распределение звёзд карточки (`[175][3]`, там 1★→5★ = 16/15/32/53/284), здесь от 5 к 1. */
    histogram: [
      { stars: 5, count: 284 },
      { stars: 4, count: 53 },
      { stars: 3, count: 32 },
      { stars: 2, count: 15 },
      { stars: 1, count: 16 },
    ],
  },

  /** Темы отзывов Google (`[153]`) с числом упоминаний — все десять, как есть. */
  topics: [
    { key: "train", count: 56 },
    { key: "buffet", count: 40 },
    { key: "carta", count: 26 },
    { key: "belt", count: 22 },
    { key: "concept", count: 21 },
    { key: "flavour", count: 12 },
    { key: "nigiri", count: 8 },
    { key: "salmon", count: 8 },
    { key: "sashimi", count: 7 },
    { key: "system", count: 5 },
  ],

  /** Карточка: «20-30 € por persona · Notificado por 220 personas» (163 из 220 — эта корзина). */
  pricePerPerson: { from: 20, to: 30, reports: 220 },

  /** Атрибуты карточки (`[100]`), только «да»; «Aparcamiento adaptado» = нет. */
  attributes: {
    wheelchair: true,
    wheelchairSeating: true,
    kids: true,
    groups: true,
    reservations: true,
    reserveForDinner: true,
    takeaway: true,
    delivery: true,
    cards: true,
    nfc: true,
    paidParking: true,
  },

  hours: venueHours,
} as const;

/** «13:00–16:30 · 20:00–23:30» — все дни одинаковые, строка для hero и подвала. */
export const hoursLine = venueHours[0].shifts.map((s) => `${s.opens}–${s.closes}`).join(" · ");

/** Отзывы карточки в Google (вкладка «Reseñas»). */
export const reviewsUrl = "https://search.google.com/local/reviews?placeid=ChIJeew4Fu5JYA0RCPIJme5dw-E";

export type TopicKey = (typeof restaurant.topics)[number]["key"];

/**
 * «Horas punta» карточки (`[84]`): загрузка 0–100 по часам 13–23. Ноль вне часов работы
 * Google сам не показывает — здесь только часы с данными. Google нумерует дни 1 = lunes … 7 = domingo.
 */
export type Hour = { hour: number; load: number };
const H = (loads: number[]): Hour[] => [13, 14, 15, 16, 20, 21, 22, 23].map((hour, i) => ({ hour, load: loads[i] }));

export const popularTimes: Record<DayKey, Hour[]> = {
  mon: H([39, 53, 51, 35, 38, 47, 36, 26]),
  tue: H([32, 45, 44, 31, 46, 51, 45, 28]),
  wed: H([37, 46, 41, 33, 51, 55, 40, 22]),
  thu: H([43, 57, 58, 40, 54, 63, 51, 39]),
  fri: H([38, 53, 51, 38, 78, 87, 63, 34]),
  sat: H([50, 71, 70, 47, 74, 100, 88, 60]),
  sun: H([50, 66, 68, 48, 31, 41, 41, 31]),
};
