// node sanitize-reviews.mjs — публичная копия корпуса отзывов: автор «Имя И.», без аватаров и id профилей.
// Сырые выгрузки с полными именами (search-reviews-es.json, reviews-*.json, panel/place .txt) в репозиторий
// не идут (.gitignore) — они нужны только локально; для сверки фактов хватает этой копии.
import fs from "node:fs";
const src = JSON.parse(fs.readFileSync("../maps/reviews-all.json", "utf8"));
const short = (name) => {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return parts[0] || "";
  return `${parts[0]} ${parts[1][0].toUpperCase()}.`;
};
const out = src.map((r) => ({ author: short(r.author), stars: r.stars, when: r.when, text: r.text, truncated: r.truncated }));
fs.writeFileSync("../maps/reviews-public.json", JSON.stringify(out, null, 1));
console.log("reviews", out.length, "example", out[0].author, "|", out[1].author);
