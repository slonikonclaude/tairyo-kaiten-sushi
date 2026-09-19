/**
 * Снимки из public/photos. Каждое имя есть в двух ширинах: <name>-800.webp и
 * <name>-1600.webp (scripts/optimize-photos.mjs; меньшие исходники не растягиваются —
 * фактическая ширина считается в srcFor). width/height — размеры `_photos/<name>.jpg`
 * из photo-manifest.json, против сдвига вёрстки.
 *
 * Откуда (DESIGN.md §1): фото гостей из карточки Google Maps (номер кадра в
 * `_data/maps/all-photos.json` — в комментарии), отобраны по каталогу `_data/photo-sheets/`.
 * Без лиц; руки, лица по краям и водяной знак телефона обрезаны, пароль Wi-Fi на табличке стола (tren-bao) закрыт. Блюда подписаны только там, где их можно
 * опознать по карте (бао с уткой — №3006, чизкейк с матчей — №8003); иначе подпись общая.
 * `position` — точка кадрирования для object-cover.
 */

import { withBase } from "@/lib/basePath";

export type Photo = {
  name: string;
  width: number;
  height: number;
  alt: { es: string; en: string };
  position?: string;
};

const p = (name: string, width: number, height: number, es: string, en: string, position?: string): Photo => ({
  name,
  width,
  height,
  alt: { es, en },
  position,
});

export const photos = {
  // #311 — поезд над лентой
  hero: p(
    "hero",
    1080,
    1440,
    "Un shinkansen en miniatura con su vagón sobre el carril, encima de la cinta llena de platos de colores con cúpula; al fondo, paredes shoji y techo de luz amarilla",
    "A miniature shinkansen and its wagon on the rail above the belt of colourful domed plates; shoji walls and a glowing yellow ceiling behind",
    "30% 50%",
  ),

  // Cómo funciona
  trenBao: p("tren-bao", 1960, 1009, "El tren bala en el carril superior junto a un vagón con dos baos al vapor en sus vaporeras", "The bullet train on the upper rail next to a wagon carrying two steamed bao in their steamers", "55% 50%"), // #261
  cinta: p("cinta", 2400, 3200, "La cinta haciendo curva, con platos de nigiri y temaki pasando", "The belt curving round, with plates of nigiri and temaki going by", "50% 60%"), // #437
  mesa: p("mesa", 2400, 2880, "Una mesa junto a la cinta llena de platos de colores: makis, nigiris con salsa y un tartar", "A table by the belt full of colourful plates: maki, nigiri with sauce and a tartare", "50% 55%"), // #55

  // La carta
  nigiris: p("nigiris", 2400, 2656, "Nigiris de salmón y de atún, y dos con salsa y topping crujiente, en un plato azul sobre el mantel de Tairyo", "Salmon and tuna nigiri, plus two topped with sauce and crispy flakes, on a blue plate on the Tairyo placemat", "50% 45%"), // #196
  baoPato: p("bao-pato", 2400, 3200, "Bao de pato con lonchas de pato, salsa oscura y lechuga", "Duck bao with sliced duck, dark sauce and lettuce", "50% 45%"), // #211
  matcha: p("matcha", 2400, 3200, "Porción de tarta de queso vasca de matcha, verde por dentro y tostada por fuera", "A slice of matcha Basque cheesecake, green inside and caramelised outside", "50% 40%"), // #217
  trenRefrescos: p("tren-refrescos", 2016, 3200, "El shinkansen con su vagón cargado de botellas de agua y refrescos, sobre la cinta, bajo el techo de luz amarilla", "The shinkansen with its wagon loaded with bottles of water and soft drinks, above the belt under the yellow light ceiling", "45% 45%"), // #414

  // El local
  barra: p("barra", 2400, 3200, "La barra a lo largo de la cinta: taburetes de madera, paneles de luz amarilla y el logo luminoso de Tairyo al fondo", "The counter along the belt: wooden stools, yellow light panels and the illuminated Tairyo logo at the end", "50% 50%"), // #11
  entrada: p("entrada", 2400, 3200, "La rampa de entrada bajo decenas de banderas nobori y farolillos, bajando hacia la sala", "The entrance ramp under dozens of nobori banners and lanterns, leading down to the dining room", "50% 40%"), // #306
  mascaras: p("mascaras", 2400, 1800, "Tres máscaras japonesas en una pared de madera, farolillos de papel y una ventana shoji iluminada", "Three Japanese masks on a wooden wall, paper lanterns and a lit shoji window", "50% 45%"), // #157
  trenVapor: p("tren-vapor", 1080, 1920, "La locomotora de vapor negra con ruedas rojas en su carril, delante de la pared shoji", "The black steam locomotive with red wheels on its rail, in front of the shoji wall", "50% 60%"), // #161
  trenNeon: p("tren-neon", 1080, 1536, "La locomotora de vapor sobre la cinta, con el logo luminoso de Tairyo detrás", "The steam locomotive above the belt, with the illuminated Tairyo logo behind", "50% 40%"), // #316
  shinkansen: p("shinkansen", 2400, 4267, "El shinkansen blanco bajo las banderas, sobre la cinta con platos amarillos", "The white shinkansen under the banners, above the belt with yellow plates", "50% 35%"), // #454
  kokeshi: p("kokeshi", 2400, 3200, "La muñeca kokeshi gigante de kimono rojo en la puerta", "The giant red-kimono kokeshi doll at the door", "50% 50%"), // #96
  banderas: p("banderas", 2400, 3200, "Banderas nobori con caligrafía japonesa y farolillos de papel colgando del techo", "Nobori banners with Japanese calligraphy and paper lanterns hanging from the ceiling", "50% 40%"), // #143
  onigiri: p("onigiri", 2400, 3200, "Un onigiri con cara de alga en un plato rosa, pasando por la cinta", "An onigiri with a seaweed face on a pink plate, going by on the belt", "50% 55%"), // #210
  baoConejo: p("bao-conejo", 2400, 3200, "Un bollito al vapor con forma de conejo en su vaporera", "A rabbit-shaped steamed bun in its little steamer", "50% 55%"), // #238
  neon: p("neon", 2400, 1800, "El logo luminoso de Tairyo Kaiten Sushi, con sus kanji, en una pared de madera", "The illuminated Tairyo Kaiten Sushi logo, with its kanji, on a wooden wall", "50% 45%"), // #248
  inari: p("inari", 2400, 3200, "Inari relleno con dados de atún y mango en un plato amarillo", "Inari pouch filled with diced tuna and mango on a yellow plate", "50% 50%"), // #34

  // Visítanos
  fachada: p("fachada", 2400, 1800, "La fachada de noche en la calle Isabel la Católica: rótulo de madera, farolillos, cortina noren y la kokeshi roja", "The façade at night on Calle Isabel la Católica: wooden sign, lanterns, noren curtain and the red kokeshi", "50% 55%"), // #318
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/**
 * srcset с фактическими ширинами: исходник 1080 px не превращается в «1600w».
 * Снимки ≤ 800 px существуют в одном файле -800.
 */
export function srcFor(photo: Photo) {
  const small = withBase(`/photos/${photo.name}-800.webp`);
  if (photo.width <= 800) return { src: small, srcSet: `${small} ${photo.width}w` };
  const large = withBase(`/photos/${photo.name}-1600.webp`);
  return { src: large, srcSet: `${small} 800w, ${large} ${Math.min(1600, photo.width)}w` };
}
