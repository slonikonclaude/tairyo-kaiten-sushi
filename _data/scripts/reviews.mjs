// node reviews.mjs <hl> <sort: relevant|newest> <max>
import fs from "node:fs";
import { launch, attach, sleep, SCRATCH } from "./cdp.mjs";
const [hl = "es", sort = "newest", max = "400"] = process.argv.slice(2);
const PORT = Number(process.env.PORT || 9802);
const URL_R = `https://www.google.com/maps/place/Tairyo+Kaiten+Sushi/@39.4675013,-0.3696433,17z/data=!3m1!4b1!4m6!3m5!1s0xd6049ee1638ec79:0xe1c35dee9909f208!8m2!3d39.4675013!4d-0.3696433!16s%2Fg%2F11wh8qy8n3?hl=${hl}`;

await launch({ port: PORT, profile: process.env.PROFILE || "chrome-profile2" });
const c = await attach(PORT);
await c.send("Page.enable");
await c.send("Page.bringToFront");
await c.send("Emulation.setFocusEmulationEnabled", { enabled: true });
await c.navigate(URL_R, 6000);
if ((await c.evaluate("location.href")).includes("consent.google")) {
  await c.evaluate(`[...document.querySelectorAll('button')].find(b=>/Rechazar todo|Reject all/.test(b.innerText))?.click()`);
  await sleep(4000);
  await c.navigate(URL_R, 7000);
}
const name = await c.evaluate("document.title + ' ' + ([...document.querySelectorAll('[role=main]')].map(m=>m.getAttribute('aria-label')).join(' '))");
console.log("place:", name);
if (!/Tairyo/i.test(name)) { console.log("WRONG PLACE"); process.exit(1); }
// Вкладка «Reseñas» места надёжнее URL с !9m1!1b1.
console.log("tab", await c.evaluate(`(() => { const t=[...document.querySelectorAll('button[role=tab]')].find(b=>/^(Reseñas|Reviews)/.test((b.getAttribute('aria-label')||b.innerText).trim())); if(!t) return [...document.querySelectorAll('button[role=tab]')].map(b=>b.innerText); t.click(); return true })()`));
await sleep(4000);

if (sort === "newest") {
  await c.evaluate(`[...document.querySelectorAll('button')].find(b=>/Ordenar|Sort/.test(b.getAttribute('aria-label')||b.innerText))?.click()`);
  await sleep(1500);
  const ok = await c.evaluate(`(() => { const m=[...document.querySelectorAll('[role=menuitemradio]')]; const it=m.find(x=>/recientes|Newest/.test(x.innerText)); it?.click(); return m.map(x=>x.innerText) })()`);
  console.log("sort menu", ok);
  await sleep(3500);
}

// Выгрузка текущего списка в файл: атомарно (tmp → rename), чтобы обрыв сессии не оставил битый JSON.
const OUT = `${process.env.OUTDIR || SCRATCH}/reviews-${hl}-${sort}.json`;
async function dump(expand) {
  if (expand) {
    await c.evaluate(`document.querySelectorAll('button.w8nwRe, button[aria-label="Ver más"], button[aria-label="See more"]').forEach(b=>b.click())`);
    await sleep(2500);
  }
  const reviews = await c.evaluate(`(() => [...document.querySelectorAll('div[data-review-id].jftiEf')].map(r => {
    const q=(s)=>r.querySelector(s);
    const stars=q('.kvMYJc')?.getAttribute('aria-label')||q('.fzvQIb')?.innerText||'';
    const photos=[...r.querySelectorAll('button.Tya61d')].map(b=>(b.style.backgroundImage.match(/url\\("?([^")]+)/)||[])[1]).filter(Boolean);
    const response=q('.CDe7pd')?.innerText || '';
    const own=r.innerText.replace(response,'');
    return {
      id: r.getAttribute('data-review-id'),
      author: q('.d4r55')?.innerText,
      authorInfo: q('.RfnDt')?.innerText,
      stars, time: q('.rsqaWe')?.innerText || q('.xRkPPb')?.innerText,
      text: q('.MyEned .wiI7pd')?.innerText || '',
      translated: /Ver original|See original|Traducido por Google|Translated by Google/.test(own),
      details: [...r.querySelectorAll('.PBK6be')].map(d=>d.innerText),
      response,
      photos,
    };
  }))()`);
  fs.writeFileSync(OUT + ".tmp", JSON.stringify(reviews, null, 1));
  fs.renameSync(OUT + ".tmp", OUT);
  return reviews;
}

let last = 0, stable = 0;
for (let i = 0; i < 1500 && stable < 12; i++) {
  const n = await c.evaluate(`(() => {
    const els=document.querySelectorAll('div[data-review-id].jftiEf');
    const scs=[...document.querySelectorAll('div')].filter(d=>d.scrollHeight>d.clientHeight+100 && /auto|scroll/.test(getComputedStyle(d).overflowY) && d.querySelector('div[data-review-id]'));
    scs.forEach(sc=>sc.scrollTop=sc.scrollHeight);
    return els.length;
  })()`);
  if (n === last) stable++; else stable = 0;
  last = n;
  if (i % 20 === 0) console.log("reviews loaded", n);
  if (i % 60 === 59) await dump(false);
  if (n >= Number(max)) break;
  await sleep(stable ? 2000 : 1400);
}
const reviews = await dump(true);
console.log("saved", reviews.length, "with text", reviews.filter((r) => r.text).length);
c.close();
process.exit(0);
