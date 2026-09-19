/**
 * Все тексты интерфейса на двух языках. Факты (цифры, часы, адрес, цены) сюда не
 * пишутся — они в lib/restaurant.ts и lib/menu.ts и подставляются функциями.
 * Каждое утверждение опирается на источник из DESIGN.md §1: их сайт, карта,
 * Instagram, карточка Google; то, что видно на фото, — только как «на фото видно».
 */

import type { DayKey, TopicKey } from "@/lib/restaurant";

export type Locale = "es" | "en";

const es = {
  htmlLang: "es",
  otherLocale: { code: "en" as Locale, label: "EN", aria: "English version" },

  meta: {
    title: "Tairyo Kaiten Sushi Valencia · Buffet de sushi giratorio sin límites",
    description:
      "Kaiten sushi sin límite en C/ d'Isabel la Catòlica, 22 (Valencia): cinta giratoria y trenes bala que te traen lo que pides. Desde 20,95 €. Todos los días.",
  },

  nav: {
    skipToContent: "Saltar al contenido",
    home: "Tairyo Kaiten Sushi, inicio",
    sections: "Secciones",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    how: "Cómo funciona",
    prices: "Precios",
    carta: "La carta",
    local: "El local",
    reviews: "Opiniones",
    visit: "Visítanos",
  },

  cta: {
    reserveShort: "Reservar",
    reserveAria: (n: string) => `Reservar mesa: llamar al ${n}`,
    reserveCall: (n: string) => `Reservar · ${n}`,
    callLong: (n: string) => `Llamar al ${n}`,
    reserveOnline: "Reservar online",
    reserveOnlineLong: "o reserva online con Google",
    seeCarta: "Ver la carta",
    directions: "Cómo llegar",
    newTab: "(se abre en otra pestaña)",
  },

  hero: {
    eyebrow: "Kaiten sushi · Valencia",
    title: "Buffet de sushi giratorio sin límites",
    slogan: "La infinidad de Japón a un precio cerrado",
    lead: "La cinta trae sin parar nigiris, makis, fritos, platos calientes y postres. Lo que no veas pasar, pídelo de la carta: te llega a la mesa en un tren bala, igual que la bebida.",
    factPrice: "Buffet desde",
    factRating: "Google",
    reviews: (n: string) => `${n} reseñas`,
    factHours: "Horario",
    everyDay: "todos los días",
    caption: "El tren bala de la sala, sobre la cinta de platos con cúpula.",
  },

  cinta: {
    pause: "Parar la cinta",
    play: "Poner en marcha la cinta",
  },

  how: {
    eyebrow: "Kaiten",
    eyebrowJa: "回転",
    title: "Así funciona la cinta",
    note: "Kaiten sushi es «sushi que gira»: los platos pasan delante de ti y tú eliges. En Tairyo hay además un segundo nivel: por encima de la cinta circulan trenes que traen la bebida y lo que pides de la carta.",
    steps: [
      {
        title: "Siéntate y mira pasar",
        text: "En cuanto te sientas empieza el desfile: nigiris, makis, fritos, platos calientes y postres pasan por la cinta, muchos bajo su cúpula transparente.",
      },
      {
        title: "Coge y repite",
        text: "Todo lo que pasa por la cinta entra en el menú. Prueba y repite las veces que quieras.",
      },
      {
        title: "¿No lo ves? Pídelo de la carta",
        text: "Si un plato de la carta no pasa, pídeselo al personal (cada plato tiene su número) y también entra en el buffet. Te llega a la mesa por el carril de arriba, en un tren en miniatura, igual que la bebida.",
      },
      {
        title: "Sin desperdiciar",
        text: "Coge solo lo que vayas a comer: cada plato que se queda sin comer se cobra a 2 €. El buffet no se comparte ni se lleva.",
      },
    ],
    trainCaption: "Baos al vapor llegando en tren: así viaja lo que se pide a la carta.",
    beltCaption: "La cinta: temakis, nigiris y gunkan en platos de colores.",
    sourceNote: "Cómo funciona, según su web, su carta, su Instagram y las reseñas de Google.",
  },

  prices: {
    eyebrow: "Precios del buffet",
    title: "Un precio cerrado, sin límite",
    note: "Incluye todo lo que pasa por la cinta, postres incluidos, y los platos sin precio de la carta. La bebida y lo de «Fuera de buffet» van aparte.",
    perPerson: "por persona",
    tiers: {
      lunch: { name: "Mediodía", when: "De lunes a viernes, no festivos" },
      dinner: { name: "Cena", when: "De lunes a jueves, no festivos" },
      weekend: { name: "Viernes noche y fin de semana", when: "Viernes noche, sábado, domingo y festivos" },
    },
    kids: "Niños",
    kidsUnder: "Menores de 1,20 m",
    babies: "Menores de 3 años",
    free: "Gratis",
    now: {
      lunchToday: "Hoy a mediodía",
      dinnerToday: "Esta noche",
      lunchTomorrow: "Mañana a mediodía",
      holiday: "En festivos se aplica la tarifa de fin de semana.",
    },
    rulesTitle: "A tener en cuenta",
    rules: [
      "La bebida no entra en el menú: mínimo una por persona.",
      "Se cobran 2 € por cada plato que se deja sin comer.",
      "El buffet es solo para comer en el local: no se comparte ni se lleva.",
      "Los platos con precio en la carta («Fuera de buffet») se pagan aparte.",
    ],
    source: "Precios de su carta de enero de 2026, iguales en su web, en su Instagram y en la pizarra de la entrada.",
  },

  carta: {
    eyebrow: "La carta",
    title: (n: number) => `${n} platos incluidos en el buffet`,
    note: "La carta del local, completa y con sus alérgenos. Todo lo que no tiene precio entra en el buffet: si no pasa por la cinta, pídelo al personal y llega en tren.",
    tabsLabel: "Partes de la carta",
    tabs: { sushi: "Sushi", cocina: "Cocina caliente", fuera: "Fuera de buffet", bebidas: "Bebidas" },
    intros: {
      sushi: "Nigiris, makis de todo tipo, gunkan y temakis. Todo incluido en el buffet.",
      cocina: "Entrantes, sopas, arroces y tallarines, fritos, brochetas, platos calientes y al vapor. Todo incluido en el buffet.",
      fuera: "Lo que no entra en el buffet: se pide aparte y se suma a la cuenta.",
      bebidas: "La bebida no entra en el buffet: mínimo una por persona.",
    },
    supplementNote: "«+1,00 €» es un suplemento: se paga además del precio del buffet.",
    number: "N.º",
    glass: "copa",
    bottle: "botella",
    spicy: ["", "Picante", "Muy picante"],
    allergensLabel: "Alérgenos",
    allergens: {
      gluten: "Gluten",
      crustaceos: "Crustáceos",
      huevos: "Huevo",
      pescado: "Pescado",
      cacahuetes: "Cacahuete",
      soja: "Soja",
      lacteos: "Lácteos",
      frutos_cascara: "Frutos de cáscara",
      apio: "Apio",
      mostaza: "Mostaza",
      sesamo: "Sésamo",
      sulfitos: "Sulfitos",
      altramuces: "Altramuces",
      moluscos: "Moluscos",
    },
    notes: [
      "Alérgenos tal como los marca la carta del restaurante. Si tienes alguna alergia o intolerancia, díselo al personal antes de pedir.",
      "El pescado ha sido previamente congelado.",
    ],
    source: "Carta de Tairyo Valencia, enero de 2026.",
    pdf: "Carta original en PDF (su web)",
    photoCaptions: {
      sushi: "Nigiris de salmón y de atún, sobre el mantel de Tairyo.",
      cocina: "Bao de pato, n.º 3006.",
      fuera: "Tarta de queso vasca de matcha, n.º 8003.",
      bebidas: "Agua y refrescos viajando en el tren bala.",
    },
  },

  local: {
    eyebrow: "El local",
    title: "Una calle de Japón bajo techo",
    text: [
      "Se entra por una rampa bajo decenas de banderas nobori, farolillos de ratán y máscaras japonesas. Abajo, la sala: paneles shoji iluminados en amarillo, techo de madera y la cinta recorriéndolo todo.",
      "Sobre la cinta, en su propio carril, circulan trenes en miniatura: un shinkansen blanco, una locomotora de vapor negra y hasta un camión. En la puerta, una kokeshi gigante da la bienvenida.",
    ],
    factsTitle: "Datos prácticos",
    facts: {
      wheelchair: "Entrada y mesas accesibles en silla de ruedas",
      kids: "Adecuado para niños: los trenes son la estrella",
      groups: "Ideal para grupos; para cenar, mejor reservar",
      cards: "Tarjeta y pago con el móvil",
      parking: "Aparcamiento de pago en la zona",
    },
    historyTitle: "Un invento de Osaka",
    history:
      "Según cuentan en su web, el kaiten sushi lo inventó Yoshiaki Shiraishi, cocinero de Osaka: se inspiró en la cinta transportadora de una fábrica de cerveza y en 1958 abrió el primer restaurante de sushi con cinta, Genroku Sushi.",
    gallery: "Fotos del local",
  },

  busy: {
    eyebrow: "Cuándo venir",
    title: "Horas punta, según Google",
    note: "Afluencia habitual por hora, de Google Maps. Los viernes y sábados por la noche se llena: para cenar, reserva.",
    chartTitle: "Afluencia por hora",
    dayPicker: "Elegir día",
    days: { mon: "Lunes", tue: "Martes", wed: "Miércoles", thu: "Jueves", fri: "Viernes", sat: "Sábado", sun: "Domingo" } satisfies Record<DayKey, string>,
    daysShort: { mon: "L", tue: "M", wed: "X", thu: "J", fri: "V", sat: "S", sun: "D" } satisfies Record<DayKey, string>,
    lunch: "Comida",
    dinner: "Cena",
    peak: (day: string, hour: string) => `${day}: lo más lleno, hacia las ${hour}.`,
    calm: (hour: string) => `Para venir con calma: ${hour}.`,
    table: { hour: "Hora", load: "Afluencia relativa (100 = la hora más concurrida de la semana)" },
    busiest: "El momento más concurrido de la semana: sábado a las 21:00.",
  },

  reviews: {
    eyebrow: "Opiniones",
    title: "Lo que cuentan en Google",
    outOf: "de 5",
    basedOn: (n: string) => `${n} reseñas en Google`,
    histogram: "Reparto de estrellas",
    starsLabel: (n: number) => (n === 1 ? "1 estrella" : `${n} estrellas`),
    stars: (n: number) => `${n} de 5 estrellas`,
    topicsTitle: "Lo más mencionado",
    topicCount: (n: string) => `mencionado en ${n} reseñas`,
    topics: {
      train: "tren",
      buffet: "buffet",
      carta: "carta",
      belt: "cinta",
      concept: "concepto",
      flavour: "sabor",
      nigiri: "nigiris",
      salmon: "salmón",
      sashimi: "sashimi",
      system: "sistema",
    } satisfies Record<TopicKey, string>,
    readAll: "Leer todas en Google",
    googleNote: "Reseñas de Google en su idioma original, sin editar.",
    translatedNote: "",
  },

  visit: {
    eyebrow: "Visítanos",
    title: "En pleno Eixample",
    near: "A un par de calles del Mercado de Colón.",
    hours: "Horario",
    today: "Hoy",
    openNow: (until: string) => `Abierto ahora · hasta las ${until}`,
    opensAt: (from: string) => `Cerrado ahora · abre a las ${from}`,
    opensTomorrow: (from: string) => `Cerrado ahora · abre mañana a las ${from}`,
    days: { mon: "Lunes", tue: "Martes", wed: "Miércoles", thu: "Jueves", fri: "Viernes", sat: "Sábado", sun: "Domingo" } satisfies Record<DayKey, string>,
    hoursNote: "Comidas de 13:00 a 16:30 y cenas de 20:00 a 23:30, todos los días.",
    contact: "Dirección y contacto",
    reserve: "Reservas",
    reserveText: "Por teléfono o online con Google. Para cenar, sobre todo viernes y sábado, mejor reservar.",
    loadMap: "Cargar el mapa",
    mapConsent: "Al cargar el mapa, Google puede instalar cookies.",
    mapTitle: "Mapa de Tairyo Kaiten Sushi Valencia",
    openMaps: "Abrir en Google Maps",
  },

  ctaBand: {
    title: "¿Mesa para esta noche?",
    text: "Viernes y sábado por la noche se llena. Llama o reserva online en un minuto.",
  },

  footer: {
    tagline: "Buffet de sushi giratorio sin límites en Valencia.",
    links: "Enlaces",
    alicante: (street: string) => `También en Alicante: ${street}`,
    officialSite: "Su web",
    sources:
      "Datos: su web y su carta (enero de 2026), su Instagram y la ficha de Google Maps (consultados en septiembre de 2026). Fotos: de clientes en Google Maps.",
  },

  notFound: {
    title: "Esta página no existe",
    home: "Volver al inicio",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  htmlLang: "en",
  otherLocale: { code: "es", label: "ES", aria: "versión en español" },

  meta: {
    title: "Tairyo Kaiten Sushi Valencia · All-you-can-eat conveyor-belt sushi",
    description:
      "All-you-can-eat kaiten sushi at C/ d'Isabel la Catòlica, 22, Valencia: a rotating belt and bullet trains that bring what you order. From €20.95. Open daily.",
  },

  nav: {
    skipToContent: "Skip to content",
    home: "Tairyo Kaiten Sushi, home",
    sections: "Sections",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    how: "How it works",
    prices: "Prices",
    carta: "Menu",
    local: "The place",
    reviews: "Reviews",
    visit: "Visit",
  },

  cta: {
    reserveShort: "Book",
    reserveAria: (n: string) => `Book a table: call ${n}`,
    reserveCall: (n: string) => `Book · ${n}`,
    callLong: (n: string) => `Call ${n}`,
    reserveOnline: "Book online",
    reserveOnlineLong: "or book online with Google",
    seeCarta: "See the menu",
    directions: "Get directions",
    newTab: "(opens in a new tab)",
  },

  hero: {
    eyebrow: "Kaiten sushi · Valencia",
    title: "Revolving sushi buffet, no limits",
    slogan: "Endless Japan at one fixed price",
    lead: "The belt keeps bringing nigiri, maki, fried bites, hot dishes and desserts. Anything you don’t see going by, order from the menu: it comes to your table on a bullet train, just like your drinks.",
    factPrice: "Buffet from",
    factRating: "Google",
    reviews: (n: string) => `${n} reviews`,
    factHours: "Hours",
    everyDay: "every day",
    caption: "The dining room’s bullet train, above the belt of domed plates.",
  },

  cinta: {
    pause: "Stop the belt",
    play: "Start the belt",
  },

  how: {
    eyebrow: "Kaiten",
    eyebrowJa: "回転",
    title: "How the belt works",
    note: "Kaiten sushi means “rotating sushi”: the plates pass in front of you and you choose. Tairyo adds a second level: above the belt, trains bring your drinks and whatever you order from the menu.",
    steps: [
      {
        title: "Sit down and watch",
        text: "The parade starts as soon as you sit: nigiri, maki, fried bites, hot dishes and desserts go by on the belt, many under a clear dome.",
      },
      {
        title: "Help yourself, again and again",
        text: "Everything on the belt is included. Try things and go back for more as often as you like.",
      },
      {
        title: "Can’t see it? Order from the menu",
        text: "If a dish from the menu doesn’t come by, ask the staff for it (every dish has a number) — it’s included in the buffet too. It reaches your table on the upper rail, aboard a miniature train, just like your drinks.",
      },
      {
        title: "No waste",
        text: "Only take what you’ll eat: every plate left unfinished is charged at €2. The buffet can’t be shared or taken away.",
      },
    ],
    trainCaption: "Steamed bao arriving by train: this is how à la carte orders travel.",
    beltCaption: "The belt: temaki, nigiri and gunkan on colourful plates.",
    sourceNote: "How it works, according to their website, menu, Instagram and Google reviews.",
  },

  prices: {
    eyebrow: "Buffet prices",
    title: "One fixed price, no limits",
    note: "Covers everything on the belt, desserts included, and every unpriced dish on the menu. Drinks and anything under “Not in the buffet” are extra.",
    perPerson: "per person",
    tiers: {
      lunch: { name: "Lunch", when: "Monday to Friday, except public holidays" },
      dinner: { name: "Dinner", when: "Monday to Thursday, except public holidays" },
      weekend: { name: "Friday night & weekend", when: "Friday night, Saturday, Sunday and public holidays" },
    },
    kids: "Children",
    kidsUnder: "Under 1.20 m",
    babies: "Under 3",
    free: "Free",
    now: {
      lunchToday: "Today at lunch",
      dinnerToday: "Tonight",
      lunchTomorrow: "Tomorrow at lunch",
      holiday: "On public holidays the weekend price applies.",
    },
    rulesTitle: "Good to know",
    rules: [
      "Drinks aren’t included, and each person must order at least one.",
      "Every plate left uneaten is charged at €2.",
      "The buffet is for eating in only: it can’t be shared or taken away.",
      "Dishes with a price on the menu (“Not in the buffet”) are paid separately.",
    ],
    source: "Prices from their January 2026 menu, the same on their website, their Instagram and the board at the door.",
  },

  carta: {
    eyebrow: "The menu",
    title: (n: number) => `${n} dishes included in the buffet`,
    note: "The restaurant’s full menu, with its allergens. Everything without a price is included in the buffet: if it doesn’t come by on the belt, ask the staff and it arrives by train. Spanish names are shown in grey, as the staff know them.",
    tabsLabel: "Menu sections",
    tabs: { sushi: "Sushi", cocina: "From the kitchen", fuera: "Not in the buffet", bebidas: "Drinks" },
    intros: {
      sushi: "Nigiri, gunkan, hosomaki, uramaki, temaki and futomaki. All included in the buffet.",
      cocina: "Starters, soups, rice and noodles, fried bites, skewers, hot and steamed dishes. All included in the buffet.",
      fuera: "Not included in the buffet: ordered separately and added to the bill.",
      bebidas: "Drinks aren’t included in the buffet, and each person must order at least one.",
    },
    supplementNote: "“+€1.00” is a supplement: paid on top of the buffet price.",
    number: "No.",
    glass: "glass",
    bottle: "bottle",
    spicy: ["", "Spicy", "Very spicy"],
    allergensLabel: "Allergens",
    allergens: {
      gluten: "Gluten",
      crustaceos: "Crustaceans",
      huevos: "Egg",
      pescado: "Fish",
      cacahuetes: "Peanut",
      soja: "Soya",
      lacteos: "Dairy",
      frutos_cascara: "Tree nuts",
      apio: "Celery",
      mostaza: "Mustard",
      sesamo: "Sesame",
      sulfitos: "Sulphites",
      altramuces: "Lupin",
      moluscos: "Molluscs",
    },
    notes: [
      "Allergens as marked on the restaurant’s own menu. If you have an allergy or intolerance, tell the staff before ordering.",
      "The fish has been previously frozen.",
    ],
    source: "Tairyo Valencia menu, January 2026.",
    pdf: "Original menu as a PDF (their website, in Spanish)",
    photoCaptions: {
      sushi: "Salmon and tuna nigiri on the Tairyo placemat.",
      cocina: "Duck bao, no. 3006.",
      fuera: "Matcha Basque cheesecake, no. 8003.",
      bebidas: "Water and soft drinks riding the bullet train.",
    },
  },

  local: {
    eyebrow: "The place",
    title: "A Japanese street, indoors",
    text: [
      "You walk in down a ramp under dozens of nobori banners, rattan lanterns and Japanese masks. Below is the dining room: shoji panels glowing yellow, a wooden ceiling and the belt running through it all.",
      "Above the belt, on their own rail, run miniature trains: a white shinkansen, a black steam locomotive and even a lorry. At the door, a giant kokeshi doll says hello.",
    ],
    factsTitle: "Practical details",
    facts: {
      wheelchair: "Wheelchair-accessible entrance and seating",
      kids: "Good for children: the trains steal the show",
      groups: "Great for groups; book for dinner",
      cards: "Cards and mobile payments",
      parking: "Paid parking in the area",
    },
    historyTitle: "Invented in Osaka",
    history:
      "As they tell it on their website, kaiten sushi was invented by Yoshiaki Shiraishi, a cook in Osaka: inspired by a brewery’s conveyor belt, he opened the first conveyor-belt sushi restaurant, Genroku Sushi, in 1958.",
    gallery: "Photos of the place",
  },

  busy: {
    eyebrow: "When to come",
    title: "Busy times, according to Google",
    note: "Usual footfall by hour, from Google Maps. Friday and Saturday nights fill up: book for dinner.",
    chartTitle: "Footfall by hour",
    dayPicker: "Choose a day",
    days: { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" },
    daysShort: { mon: "M", tue: "T", wed: "W", thu: "T", fri: "F", sat: "S", sun: "S" },
    lunch: "Lunch",
    dinner: "Dinner",
    peak: (day: string, hour: string) => `${day}: busiest around ${hour}.`,
    calm: (hour: string) => `Quietest time to arrive: ${hour}.`,
    table: { hour: "Hour", load: "Relative footfall (100 = the busiest hour of the week)" },
    busiest: "The busiest moment of the week: Saturday at 21:00.",
  },

  reviews: {
    eyebrow: "Reviews",
    title: "What people say on Google",
    outOf: "out of 5",
    basedOn: (n: string) => `${n} Google reviews`,
    histogram: "Star breakdown",
    starsLabel: (n: number) => (n === 1 ? "1 star" : `${n} stars`),
    stars: (n: number) => `${n} out of 5 stars`,
    topicsTitle: "Most mentioned (in Spanish reviews)",
    topicCount: (n: string) => `mentioned in ${n} reviews`,
    topics: {
      train: "train",
      buffet: "buffet",
      carta: "menu",
      belt: "belt",
      concept: "concept",
      flavour: "flavour",
      nigiri: "nigiri",
      salmon: "salmon",
      sashimi: "sashimi",
      system: "system",
    },
    readAll: "Read them all on Google",
    googleNote: "Google reviews in their original language, unedited.",
    translatedNote: "",
  },

  visit: {
    eyebrow: "Visit",
    title: "In the heart of L'Eixample",
    near: "A couple of streets from Mercado de Colón.",
    hours: "Opening hours",
    today: "Today",
    openNow: (until: string) => `Open now · until ${until}`,
    opensAt: (from: string) => `Closed now · opens at ${from}`,
    opensTomorrow: (from: string) => `Closed now · opens tomorrow at ${from}`,
    days: { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" },
    hoursNote: "Lunch 13:00–16:30 and dinner 20:00–23:30, every day.",
    contact: "Address & contact",
    reserve: "Bookings",
    reserveText: "By phone or online with Google. For dinner, especially on Fridays and Saturdays, it’s best to book.",
    loadMap: "Load the map",
    mapConsent: "Loading the map lets Google set cookies.",
    mapTitle: "Map of Tairyo Kaiten Sushi Valencia",
    openMaps: "Open in Google Maps",
  },

  ctaBand: {
    title: "A table for tonight?",
    text: "Friday and Saturday nights fill up. Call, or book online in a minute.",
  },

  footer: {
    tagline: "All-you-can-eat conveyor-belt sushi in Valencia.",
    links: "Links",
    alicante: (street: string) => `Also in Alicante: ${street}`,
    officialSite: "Their website",
    sources:
      "Data: their website and menu (January 2026), their Instagram and the Google Maps listing (checked in September 2026). Photos: by customers on Google Maps.",
  },

  notFound: {
    title: "This page doesn’t exist",
    home: "Go to the homepage",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
