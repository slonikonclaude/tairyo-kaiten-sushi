// node fetch-photos.mjs <list.json> <outDir> [size=w1600] — download lh3 photos (list items need .url), skip existing.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const [list, outDir, size = "w1600"] = process.argv.slice(2);
const items = JSON.parse(fs.readFileSync(list, "utf8"));
fs.mkdirSync(outDir, { recursive: true });
const id = (u) => crypto.createHash("md5").update(u).digest("hex").slice(0, 10);
const index = [];
let ok = 0, fail = 0;
const queue = [...items];
async function worker() {
  while (queue.length) {
    const it = queue.shift();
    const f = path.join(outDir, id(it.url) + ".jpg");
    index.push({ file: path.basename(f), ...it });
    if (fs.existsSync(f)) { ok++; continue; }
    try {
      const r = await fetch(it.url + "=" + size);
      if (!r.ok) throw new Error(r.status);
      fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
      ok++;
    } catch (e) { fail++; console.log("fail", it.url.slice(0, 80), e.message); }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
fs.writeFileSync(path.join(outDir, "index.json"), JSON.stringify(index, null, 1));
console.log("ok", ok, "fail", fail);
