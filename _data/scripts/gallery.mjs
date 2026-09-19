// Harvest Maps gallery photo URLs per category, scrolling the virtualized grid step by step.
// node gallery.mjs "Cat1,Cat2"  → gallery/<cat>.json after each category
import fs from "node:fs";
import { launch, attach, sleep, save, SCRATCH } from "./cdp.mjs";
const OUTDIR = process.env.OUTDIR || `${SCRATCH}/gallery`;
const URL_PLACE = "https://www.google.com/maps/place/Tairyo+Kaiten+Sushi/@39.4675013,-0.3696433,17z/data=!3m1!4b1!4m6!3m5!1s0xd6049ee1638ec79:0xe1c35dee9909f208!8m2!3d39.4675013!4d-0.3696433!16s%2Fg%2F11wh8qy8n3?hl=es";
const cats = (process.argv[2] || "Carta,Comida y bebida,Ambiente,Paella,Del propietario,Más recientes,Todas").split(",");
fs.mkdirSync(OUTDIR, { recursive: true });
await launch({ port: 9801 });
const c = await attach(9801);
await c.send("Page.enable");
await c.send("Page.bringToFront");
await c.send("Emulation.setFocusEmulationEnabled", { enabled: true });
for (const cat of cats) {
  await c.navigate(URL_PLACE, 7000);
  if ((await c.evaluate("location.href")).includes("consent.google")) {
    await c.evaluate(`[...document.querySelectorAll('button')].find(b=>/Rechazar todo/.test(b.innerText))?.click()`);
    await sleep(4000);
    await c.navigate(URL_PLACE, 7000);
  }
  await c.send("Page.bringToFront");
  const ok = await c.evaluate(`(() => { const b=[...document.querySelectorAll('button:not([role=tab])')].find(b=>{const a=b.getAttribute('aria-label')||''; return a.split('·')[0]===${JSON.stringify(cat)} && !/Foto \\d/.test(a)}); if(!b) return [...document.querySelectorAll('button')].map(b=>b.getAttribute('aria-label')).filter(Boolean).slice(0,60); b.scrollIntoView(); b.click(); return true })()`);
  if (ok !== true) { console.log("no button", cat, JSON.stringify(ok).slice(0, 800)); continue; }
  await sleep(4500);
  const tiles = new Map(); // index -> url
  let stable = 0, lastTop = -1;
  for (let i = 0; i < Number(process.env.MAXSTEPS || 1200) && stable < 8; i++) {
    const got = await c.evaluate(`(() => {
      const out=[];
      document.querySelectorAll('a[data-photo-index]').forEach(a=>{
        const e=a.querySelector('[style*="background-image"]');
        const m=e && e.style.backgroundImage.match(/url\\("?([^")]+)"?\\)/);
        out.push([+a.getAttribute('data-photo-index'), m ? m[1] : null, a.getAttribute('aria-label')]);
      });
      const sc=[...document.querySelectorAll('div')].filter(d=>d.scrollHeight>d.clientHeight+50 && /auto|scroll/.test(getComputedStyle(d).overflowY) && d.querySelector('a[data-photo-index]')).pop();
      let top=-1, h=0;
      if(sc){ sc.scrollTop = sc.scrollTop + Math.round(sc.clientHeight*0.6); top=sc.scrollTop; h=sc.scrollHeight; }
      return {out, top, h, n: document.querySelectorAll('a[data-photo-index]').length};
    })()`);
    for (const [idx, url, label] of got.out) if (url && /googleusercontent/.test(url)) tiles.set(idx, { url: url.split("=")[0], label });
    if (got.top === lastTop) stable++; else stable = 0;
    lastTop = got.top;
    if (i % 25 === 0) {
      console.log(cat, "step", i, "tiles", tiles.size, "top", got.top, "/", got.h);
      const part = [...tiles.entries()].sort((a, b) => a[0] - b[0]).map(([i, v]) => ({ i, ...v }));
      const f = `${OUTDIR}/${cat.replace(/[^\wáéíóúñ]+/gi, "_")}.json`;
      fs.writeFileSync(f + ".tmp", JSON.stringify(part, null, 1)); fs.renameSync(f + ".tmp", f);
    }
    await sleep(stable ? 1200 : 700);
  }
  const arr = [...tiles.entries()].sort((a, b) => a[0] - b[0]).map(([i, v]) => ({ i, ...v }));
  const maxIdx = arr.length ? arr[arr.length - 1].i : -1;
  save(`${OUTDIR}/${cat.replace(/[^\wáéíóúñ]+/gi, "_")}.json`, arr);
  console.log("DONE", cat, "urls", arr.length, "max index", maxIdx);
}
c.close();
process.exit(0);
