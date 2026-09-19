/**
 * Сверка цен сайта с источниками (DESIGN.md §1): `npm run check:menu`.
 *
 * 1. Мультимножество всех цен карты (priceText в _data/menu-text/menu-final.json — сверенная
 *    расшифровка PDF 01.2026) = мультимножество цен lib/menu.ts. Номер позиции тоже сверяется.
 * 2. Буфет lib/menu.ts = страница 2 карты = пост Instagram «Lista de precios» и доска у входа
 *    (фото 24.04.2026): 20,95 / 23,95 / 26,95 / 9,95 / gratis.
 * 3. Аллергены и «Picante» каждой позиции совпадают с картой.
 */
import fs from "node:fs";
import { buffet, carta } from "../lib/menu.ts";

const final = JSON.parse(fs.readFileSync("_data/menu-text/menu-final.json", "utf8"));
let errors = 0;
const fail = (msg) => {
  errors++;
  console.error("✗", msg);
};

const key = (num, v) => `${num}:${v.toFixed(2)}`;
const src = new Map();
for (const it of final.items)
  for (const m of it.priceText.matchAll(/(\d+[.,]\d+|\d+)\s*€/g)) {
    const k = key(it.num, Number(m[1].replace(",", ".")));
    src.set(k, (src.get(k) ?? 0) + 1);
  }

const site = new Map();
const dishes = Object.values(carta).flat().flatMap((g) => g.dishes);
for (const d of dishes)
  for (const p of d.prices) {
    const k = key(d.num, p.value);
    site.set(k, (site.get(k) ?? 0) + 1);
  }

for (const k of new Set([...src.keys(), ...site.keys()]))
  if ((src.get(k) ?? 0) !== (site.get(k) ?? 0)) fail(`цена ${k}: карта ×${src.get(k) ?? 0}, сайт ×${site.get(k) ?? 0}`);

if (dishes.length !== final.items.length) fail(`позиций: карта ${final.items.length}, сайт ${dishes.length}`);

// Аллергены и острота — по порядку позиций внутри номера.
const byNum = new Map();
for (const it of final.items) byNum.set(it.num, [...(byNum.get(it.num) ?? []), it]);
const seen = new Map();
for (const d of dishes) {
  const i = seen.get(d.num) ?? 0;
  seen.set(d.num, i + 1);
  const s = byNum.get(d.num)?.[i];
  if (!s) {
    fail(`№${d.num} нет в карте`);
    continue;
  }
  if (s.allergens.join(",") !== d.allergens.join(",")) fail(`№${d.num} аллергены: карта ${s.allergens}, сайт ${d.allergens}`);
  if (s.spicy !== d.spicy) fail(`№${d.num} picante: карта ${s.spicy}, сайт ${d.spicy}`);
}

// Буфет: карта (стр. 2), Instagram «Lista de precios», доска у входа 24.04.2026.
const page2 = final.prices.prices.map((p) => p.price);
const instagram = [20.95, 23.95, 26.95, 9.95, 0];
const siteBuffet = [...buffet.adult.map((t) => t.price), buffet.kids, buffet.babies];
if (siteBuffet.join() !== page2.join()) fail(`буфет: карта ${page2}, сайт ${siteBuffet}`);
if (siteBuffet.join() !== instagram.join()) fail(`буфет: Instagram ${instagram}, сайт ${siteBuffet}`);

const total = [...src.values()].reduce((a, b) => a + b, 0);
if (errors) {
  console.error(`\n${errors} расхождений`);
  process.exit(1);
}
console.log(`✓ ${total} цен карты = сайт; ${dishes.length} позиций, аллергены и острота совпадают; буфет ${siteBuffet.join(" / ")} = карта = Instagram`);
