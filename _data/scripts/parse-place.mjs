// node parse-place.mjs <place-xx.txt> — dump the useful parts of the /maps/preview/place payload.
import fs from "node:fs";
const raw = fs.readFileSync(process.argv[2], "utf8").replace(/^\)\]\}'\n?/, "");
const j = JSON.parse(raw);
const p = j[6];
const out = {};
const g = (o, ...path) => path.reduce((a, k) => (a == null ? a : a[k]), o);
out.name = p[11];
out.address = p[39];
out.addressParts = p[2];
out.coords = g(p, 9);
out.phone = g(p, 178, 0, 0);
out.categories = p[13];
out.rating = g(p, 4, 7);
out.reviews = g(p, 4, 8);
out.price = g(p, 4, 2);
out.priceBuckets = g(p, 4);
out.website = g(p, 7, 0);
out.description = g(p, 32);
out.plus = g(p, 183);
out.hist = g(p, 175, 3);
out.hours = g(p, 203);
out.hours34 = g(p, 34);
out.attributes = g(p, 100);
out.topics = g(p, 153);
out.menuLinks = g(p, 38);
out.reserve = g(p, 46);
out.order = g(p, 75);
fs.writeFileSync(process.argv[3] || "place-parsed.json", JSON.stringify(out, null, 1));

// photos: any array node where n[6][0] is an lh3 URL
const photos = [];
const seen = new Set();
(function walk(n, path) {
  if (!Array.isArray(n)) return;
  if (Array.isArray(n[6]) && typeof n[6][0] === "string" && /googleusercontent/.test(n[6][0])) {
    const u = n[6][0].split("=")[0];
    if (!seen.has(u)) {
      seen.add(u);
      let date = null;
      (function findDate(x, d) {
        if (date || !Array.isArray(x) || d > 6) return;
        if (x.length >= 3 && x.length <= 5 && x.every((v) => Number.isInteger(v)) && x[0] > 2005 && x[0] < 2030 && x[1] >= 1 && x[1] <= 12) { date = x; return; }
        x.forEach((y) => findDate(y, d + 1));
      })(n, 0);
      photos.push({ url: u, title: n[6][1] ?? null, size: n[6][2] ?? null, date, path: path.join(".") });
    }
  }
  n.forEach((c, i) => walk(c, [...path, i]));
})(p, []);
fs.writeFileSync((process.argv[3] || "place-parsed.json").replace(".json", "-photos.json"), JSON.stringify(photos, null, 1));
console.log(JSON.stringify(out, null, 1).slice(0, 6000));
console.log("photos", photos.length);
