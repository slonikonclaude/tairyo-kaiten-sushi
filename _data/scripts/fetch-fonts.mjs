// node _data/scripts/fetch-fonts.mjs — шрифты сайта как сабсеты Google Fonts (параметр text=), DESIGN.md §6.
// Набор символов: печатный ASCII + Latin-1 + типографская пунктуация и € + все иероглифы/кана из исходников
// (lib/*, components/*). next/font/google отдавал Zen Kaku Gothic New 238 срезами по unicode-range и
// предзагружал их все (2,9 МБ) — здесь три файла ~42 КБ через next/font/local. После правки текстов
// с новыми иероглифами — перезапустить.
import fs from "node:fs";
const files = ["lib/dictionaries.ts", "lib/menu.ts", "lib/reviews.ts", "lib/restaurant.ts", "lib/format.ts", "app/global-not-found.tsx", ...fs.readdirSync("components").map((f) => "components/" + f)];
const src = files.map((f) => fs.readFileSync(f, "utf8")).join("");
const set = new Set();
for (let c = 0x20; c < 0x7f; c++) set.add(String.fromCharCode(c));
for (let c = 0xa0; c < 0x100; c++) set.add(String.fromCharCode(c));
for (const c of "–—‘’‚“”„…•·€™−→←★☆№‹›") set.add(c);
for (const ch of src) if (/[　-鿿＀-￯]/.test(ch)) set.add(ch);
const text = [...set].join("");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
const jobs = [
  ["Dela Gothic One", 400, "dela-gothic-one-400"],
  ["Zen Kaku Gothic New", 400, "zen-kaku-gothic-new-400"],
  ["Zen Kaku Gothic New", 700, "zen-kaku-gothic-new-700"],
];
for (const [family, weight, name] of jobs) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}&display=swap`;
  const css = await (await fetch(url, { headers: { "User-Agent": UA } })).text();
  const woff2 = [...css.matchAll(/url\((https:[^)]+)\)\s*format\(.woff2.\)/g)].map((m) => m[1]);
  if (woff2.length !== 1) throw new Error(`${family} ${weight}: ожидался один woff2, пришло ${woff2.length}`);
  const buf = Buffer.from(await (await fetch(woff2[0], { headers: { "User-Agent": UA } })).arrayBuffer());
  fs.writeFileSync(`app/fonts/${name}.woff2`, buf);
  console.log(name, buf.length, "байт");
}
console.log("символов:", set.size);
