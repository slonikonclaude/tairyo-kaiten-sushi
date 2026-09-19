import fs from "node:fs";
const list = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const out = process.argv[3];
const q = [...list];
async function w() { while (q.length) { const it = q.shift(); const f = `${out}/${it.name}.jpg`; if (fs.existsSync(f)) continue; const r = await fetch(it.url + "=s0"); fs.writeFileSync(f, Buffer.from(await r.arrayBuffer())); } }
await Promise.all([w(), w(), w(), w(), w(), w()]);
console.log("done");
