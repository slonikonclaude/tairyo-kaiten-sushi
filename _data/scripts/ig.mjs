// node ig.mjs — headless: Instagram profile (12 latest posts) + each post's embed (caption + 1000px image).
import fs from "node:fs";
import { launch, attach, sleep, save, SCRATCH } from "./cdp.mjs";
const PORT = 9804;
const OUT = process.env.OUTDIR || `${SCRATCH}/ig`;
fs.mkdirSync(`${OUT}`, { recursive: true });
await launch({ port: PORT, profile: "chrome-profile-ig", headless: true });
const c = await attach(PORT);
await c.send("Page.enable");
await c.navigate("https://www.instagram.com/tairyokaitensushivalencia/", 10000);
const prof = await c.evaluate(`(() => ({ href: location.href, text: document.body.innerText.slice(0, 2000), links: [...new Set([...document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]')].map(a => a.href))].slice(0, 40), imgs: [...document.querySelectorAll('img')].map(i => [(i.currentSrc||i.src), i.naturalWidth, (i.alt||'').slice(0,400)]).filter(x=>x[1]>100) }))()`);
save(`${OUT}/profile.json`, prof);
console.log(prof.text.slice(0, 800), "\nlinks", prof.links.length);
for (const link of prof.links) {
  const code = link.match(/\/(p|reel)\/([^/]+)/)[2];
  await c.navigate(`https://www.instagram.com/p/${code}/embed/captioned/`, 7000);
  const r = await c.evaluate(`(() => ({
    text: document.body.innerText.slice(0, 3000),
    imgs: [...document.querySelectorAll('img')].map(i => [i.currentSrc || i.src, i.naturalWidth, i.alt]).filter(x => /cdninstagram|fbcdn/.test(x[0]))
  }))()`);
  save(`${OUT}/${code}.json`, { link, ...r });
  console.log("=====", code, r.text.replace(/\s+/g, " ").slice(0, 400));
}
process.exit(0);
