/**
 * Генератор lib/menu.ts (DESIGN.md §1, §3).
 *
 *   _data/menu-text/menu-final.json      — карта Tairyo Valencia 01.2026: два независимых
 *                                          прочтения каждой страницы + сверка по картинке
 *   _data/menu-text/translate-en-final.json — перевод (переводчик → 2 проверяющих → арбитр)
 *
 * Испанский выводится как в карте; правятся только явные опечатки и ударения — списком
 * FIXES, у каждой правки причина. Цены не трогаются вовсе (их сверяет scripts/check-menu.mjs).
 *
 *   node scripts/build-menu.mjs
 */
import fs from "node:fs";

const final = JSON.parse(fs.readFileSync("_data/menu-text/menu-final.json", "utf8"));
const tr = JSON.parse(fs.readFileSync("_data/menu-text/translate-en-final.json", "utf8"));
const trByKey = new Map(tr.items.map((t) => [t.key, t]));
const sectionEn = new Map(tr.sections.map((s) => [s.es, s.en]));

/** Правки испанского текста карты: [номер, поле, было, стало, причина]. */
const FIXES = [
  ["2", "name", "Salmon flambeado", "Salmón flambeado", "ударение, как у №1 «Salmón»"],
  ["302", "name", "Salmon philadelphia", "Salmón Philadelphia", "ударение; Philadelphia — марка сыра"],
  ["306", "description", "lamina", "lámina", "ударение"],
  ["309", "description", "Roll de laga", "Roll de alga", "опечатка: у всех остальных роллов «alga»"],
  ["501", "description", "salmon, atun", "salmón, atún", "ударения"],
  ["502", "description", "salmon, atun", "salmón, atún", "ударения"],
  ["607", "name", "tailandes", "tailandés", "ударение"],
  ["701", "description", "champiñon", "champiñón", "ударение"],
  ["702", "description", "hierba de limon", "hierba de limón", "ударение"],
  ["802", "name", "Arroz tailandes", "Arroz tailandés", "ударение"],
  ["803", "name", "Tallarines Con verdura y huevo", "Tallarines con verdura y huevo", "заглавная посреди названия"],
  ["804", "name", "Wudong Con verdura y huevo", "Udon con verdura y huevo", "«Wudong» — фонетическая запись udon; заглавная посреди названия"],
  ["2004", "name", "Ternera seta y bambu", "Ternera, seta y bambú", "ударение"],
  ["2005", "name", "Ternera sichuan", "Ternera Sichuan", "имя собственное"],
  ["2006", "name", "Ternera hongkong", "Ternera Hong Kong", "имя собственное"],
  ["2007", "name", "Pollo estilo taiwan", "Pollo estilo Taiwán", "имя собственное"],
  ["2009", "name", "Pollo hongkong", "Pollo Hong Kong", "имя собственное"],
  ["2010", "name", "Pollo sichuan", "Pollo Sichuan", "имя собственное"],
  ["3004", "name", "jakao", "Jakao", "строчная в начале названия"],
  ["9002", "name", "Agua vichi", "Agua Vichy", "Vichy — марка/тип минеральной воды"],
  ["9003", "name", "Coca Cola original", "Coca-Cola original", "написание марки"],
  ["9004", "name", "Coca Cola zero", "Coca-Cola Zero", "написание марки"],
  ["9006", "name", "Fanta limon", "Fanta limón", "ударение"],
  ["9008", "name", "Aquarius limon", "Aquarius limón", "ударение"],
  ["9014", "name", "Cerveza mahou 5 estrellas", "Cerveza Mahou 5 Estrellas", "написание марки"],
  ["9015", "name", "Cerveza mahou 0,0 tostada", "Cerveza Mahou 0,0 Tostada", "написание марки"],
  ["9016", "name", "Estrella galicia", "Estrella Galicia", "написание марки"],
  ["9017", "name", "Cerveza japonesa sapooro", "Cerveza japonesa Sapporo", "опечатка в марке"],
  ["9024", "name", "Marqués de Cáceres -crianza", "Marqués de Cáceres Crianza", "лишний дефис"],
  ["9026", "name", "El Coto Rioja - Crianza", "El Coto Rioja Crianza", "лишний дефис"],
  ["9028", "name", "MarquÉs de Vizhoja", "Marqués de Vizhoja", "заглавная É посреди слова"],
  ["9030", "name", "MarquÉs de Cáceres blanco", "Marqués de Cáceres blanco", "заглавная É посреди слова"],
  ["9033", "name", "Lambrusco valmarone", "Lambrusco Valmarone", "как у №9025"],
  ["9034", "name", "Visiega Vaca Brut", "Visiega Cava Brut", "перестановка букв: третья позиция — «Visiega Cava Brut Rosado»"],
  ["9035", "name", "Visiega Vaca Semi", "Visiega Cava Semi", "перестановка букв, как выше"],
];

/** Правки английского после арбитра: [номер, поле, стало, причина]. */
const EN_FIXES = [["9029", "nameEn", "Oroya “Especial Sushi”", "«Especial Sushi» — надпись на этикетке, а не описание; не переводим"]];

/** Разделы карты → вкладки сайта (DESIGN.md §7.5). id — для якорей и ключей. */
const GROUPS = [
  ["sushi", "nigiris", "Nigiris"],
  ["sushi", "gunkan", "Gunkan"],
  ["sushi", "hosomaki", "Hosomaki"],
  ["sushi", "uramakis", "Uramakis"],
  ["sushi", "temaki", "Temaki"],
  ["sushi", "futomaki", "Futomaki"],
  ["cocina", "entrantes", "Entrantes"],
  ["cocina", "sopa", "Sopa"],
  ["cocina", "arroces", "Arroces y tallarines"],
  ["cocina", "fritos", "Fritos"],
  ["cocina", "brochetas", "Brochetas"],
  ["cocina", "calientes", "Platos calientes"],
  ["cocina", "vapor", "Platos al vapor"],
  ["fuera", "sashimi", "Fuera de buffet — Sashimi"],
  ["fuera", "nigiri-extra", "Fuera de buffet — Sushi / Nigiri"],
  ["fuera", "uramaki-extra", "Fuera de buffet — Uramaki"],
  ["fuera", "tartar", "Fuera de buffet — Tartar"],
  ["fuera", "postres", "Fuera de buffet — Postre"],
  ["bebidas", "refrescos", "Bebidas sin alcohol"],
  ["bebidas", "alcohol", "Bebidas con alcohol"],
  ["bebidas", "tinto", "Vino tinto"],
  ["bebidas", "blanco", "Vino blanco"],
  ["bebidas", "rosado", "Vino rosado"],
  ["bebidas", "cava", "Cava"],
  ["bebidas", "cafe", "Cafe e infusiones"],
];
/** Заголовки разделов на сайте: без префикса «Fuera de buffet — » (он — название вкладки) и с ударениями. */
const TITLE_ES = { "Cafe e infusiones": "Café e infusiones", "Fuera de buffet — Postre": "Postres" };

const pieceEs = (p) => {
  if (!p) return "";
  const m = p.match(/^(\d+)\s*(pzs|ud)\.?(.*)$/i);
  if (!m) return p;
  const n = Number(m[1]);
  const rest = m[3].replace(/^\s*\.?\s*Max\.?\s*(\d+)\s*pzs\/persona/i, " · máx. $1 por persona");
  return `${n} ${n === 1 ? "pieza" : "piezas"}${rest}`;
};

/** Цена из priceText: «+1€» — доплата; «3,50€ / copa 10,90€ / botella» — две цены. */
function prices(it) {
  const t = it.priceText.trim();
  if (!t) return [];
  const nums = [...t.matchAll(/(\d+[.,]\d+|\d+)\s*€/g)].map((m) => Number(m[1].replace(",", ".")));
  if (t.startsWith("+")) return [{ value: nums[0], supplement: true }];
  if (/copa/.test(t)) return [{ value: nums[0], unit: "glass" }, { value: nums[1], unit: "bottle" }];
  if (/botella/.test(t)) return [{ value: nums[0], unit: "bottle" }];
  return [{ value: nums[0] }];
}

const fixesLeft = new Set(FIXES.map((f) => f.slice(0, 3).join("|")));
const items = final.items.map((it, key) => {
  const t = trByKey.get(key);
  if (!t) throw new Error(`нет перевода для key ${key} (№${it.num})`);
  let name = it.name;
  let desc = it.description;
  for (const [num, field, from, to] of FIXES) {
    if (num !== it.num) continue;
    const before = field === "name" ? name : desc;
    if (!before.includes(from)) continue;
    if (field === "name") name = name.replace(from, to);
    else desc = desc.replace(from, to);
    fixesLeft.delete([num, field, from].join("|"));
  }
  // «Picante +» / «Picante ++» — значок на сайте (spicy), из текста убираем.
  desc = desc.replace(/\s*Picante \+\+?,?\s*/g, " ").replace(/^\s*con /, "Con ").trim();
  if (desc && !/[.)]$/.test(desc)) desc += ".";
  // Описание в скобках (урамаки с угрём) — без скобок.
  desc = desc.replace(/^\((.*)\)\.?$/, (_, s) => s.charAt(0).toUpperCase() + s.slice(1) + ".");
  // «Tallarines con verdura y huevo» / «Udon …»: описание повторяет название — не выводим.
  if (/^(803|804)$/.test(it.num)) desc = "";

  let nameEn = t.nameEn;
  for (const [num, field, to] of EN_FIXES) if (num === it.num && field === "nameEn") nameEn = to;

  return {
    section: it.section,
    num: it.num,
    // №8003 в карте дважды (чизкейк с матчей и дораяки) — у дораяки номер не показываем.
    hideNum: it.num === "8003" && /Dorayaki/i.test(it.name),
    name: { es: name, en: nameEn },
    desc: desc ? { es: desc, en: t.descEn } : null,
    pieces: it.pieces ? { es: pieceEs(it.pieces), en: t.piecesEn } : null,
    spicy: it.spicy,
    allergens: it.allergens,
    prices: prices(it),
  };
});
if (fixesLeft.size) throw new Error("правки не применились: " + [...fixesLeft].join("; "));

const tabs = {};
for (const [tab, id, section] of GROUPS) {
  const dishes = items.filter((i) => i.section === section).map((i) => Object.fromEntries(Object.entries(i).filter(([k]) => k !== "section")));
  if (!dishes.length) throw new Error("пустой раздел " + section);
  const esTitle = TITLE_ES[section] ?? section.replace(/^Fuera de buffet — /, "");
  (tabs[tab] ??= []).push({ id, title: { es: esTitle, en: sectionEn.get(section) }, dishes });
}
const used = Object.values(tabs).flat().reduce((n, g) => n + g.dishes.length, 0);
if (used !== items.length) throw new Error(`в разделы попало ${used} из ${items.length}`);

const p = final.prices.prices;
const buffet = {
  adult: [
    { id: "lunch", price: p[0].price },
    { id: "dinner", price: p[1].price },
    { id: "weekend", price: p[2].price },
  ],
  kids: p[3].price,
  babies: p[4].price,
};

/** Одна позиция — одна строка: файл читается как карта, а не как 2500 строк JSON. */
const NL = String.fromCharCode(10);
const compact = (t) => {
  const lines = ["{"];
  for (const [tab, groups] of Object.entries(t)) {
    lines.push(`  ${tab}: [`);
    for (const g of groups) {
      lines.push("    {", `      id: ${JSON.stringify(g.id)},`, `      title: ${JSON.stringify(g.title)},`, "      dishes: [");
      for (const d of g.dishes) lines.push(`        ${JSON.stringify(d)},`);
      lines.push("      ],", "    },");
    }
    lines.push("  ],");
  }
  lines.push("}");
  return lines.join(NL);
};

const out = `/**
 * Карта Tairyo Kaiten Sushi Valencia — СГЕНЕРИРОВАНО scripts/build-menu.mjs, руками не править.
 * Источник: их PDF «CARTA-Valencia-vieiras» (создан 09.01.2026) → два независимых прочтения
 * + сверка по картинке (_data/menu-text/menu-final.json); английский — перевод с двумя
 * проверками (_data/menu-text/translate-en-final.json). Правки опечаток — FIXES в генераторе.
 * Цены сверяет scripts/check-menu.mjs.
 */

export type Allergen =
  | "gluten" | "crustaceos" | "huevos" | "pescado" | "cacahuetes" | "soja" | "lacteos"
  | "frutos_cascara" | "apio" | "mostaza" | "sesamo" | "sulfitos" | "altramuces" | "moluscos";

type T = { es: string; en: string };

/** supplement — доплата к буфету («+1 €»); unit — копа/бутылка у вин. */
export type Price = { value: number; supplement?: boolean; unit?: "glass" | "bottle" };

export type Dish = {
  num: string;
  hideNum: boolean;
  name: T;
  desc: T | null;
  pieces: T | null;
  spicy: number;
  allergens: Allergen[];
  prices: Price[];
};

export type MenuGroup = { id: string; title: T; dishes: Dish[] };
export type TabId = "sushi" | "cocina" | "fuera" | "bebidas";

export const TABS: TabId[] = ["sushi", "cocina", "fuera", "bebidas"];

export const carta: Record<TabId, MenuGroup[]> = ${compact(tabs)};

/** Буфет (стр. 2 карты): обед пн–пт, ужин пн–чт, пятница вечером/выходные/праздники; дети < 1,20 м; до 3 лет — бесплатно. */
export const buffet = ${JSON.stringify(buffet, null, 2)} as const;

export type TierId = (typeof buffet.adult)[number]["id"];

/** Оригинал карты на их сайте (PDF, 9 стр.). */
export const cartaPdf = "https://tairyokaitensushi.com/wp-content/uploads/2026/01/CARTA-Valencia-vieiras.pdf";

/** Всего позиций карты (для заголовков). */
export const dishCount = ${items.length};
`;
fs.writeFileSync("lib/menu.ts", out);
console.log("lib/menu.ts:", items.length, "позиций,", Object.entries(tabs).map(([k, v]) => `${k} ${v.reduce((n, g) => n + g.dishes.length, 0)}`).join(", "));
