// node shoot.mjs <url> <width> <outPrefix> [chunk=1800] [scale=1] — headless CDP: exact width, scroll through (fires whileInView),
// eager images, then capture in chunks with clip. Also reports overflow and hidden [data-reveal] blocks.
import fs from "node:fs";
import { launch, attach, sleep } from "./cdp.mjs";

const [url, width = "1440", out = "shot", chunk = "1800", scale = "1"] = process.argv.slice(2);
const W = Number(width);
const PORT = Number(process.env.PORT || 9597);
await launch({ port: PORT, profile: `shoot-profile-${PORT}`, headless: true, width: 1400, height: 1000 });
const c = await attach(PORT, { newTab: true });
await c.send("Page.enable");
await c.send("Emulation.setDeviceMetricsOverride", { width: W, height: W < 800 ? 812 : 900, deviceScaleFactor: 1, mobile: W < 800 });
if (process.env.REDUCED) await c.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await c.navigate(url, 4000);
const title = await c.evaluate("document.title");
console.log("title:", title);
await c.evaluate(`document.querySelectorAll('img').forEach(i=>{i.loading='eager';i.decoding='sync'})`);
// scroll through to trigger reveals and lazy images
const H = await c.evaluate("document.documentElement.scrollHeight");
for (let y = 0; y < H; y += 400) {
  await c.evaluate(`window.scrollTo(0,${y})`);
  await sleep(120);
}
await c.evaluate(`Promise.all([...document.images].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r})))`);
await sleep(1200);
await c.evaluate("window.scrollTo(0,0)");
await sleep(600);
const info = await c.evaluate(`(() => {
  const d=document.documentElement;
  const over=[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect(); return r.right>d.clientWidth+1 && getComputedStyle(e).position!=='fixed'}).slice(0,8).map(e=>e.tagName+'.'+String(e.className).slice(0,60));
  const hidden=[...document.querySelectorAll('[data-reveal]')].filter(e=>getComputedStyle(e).opacity<0.5).length;
  const broken=[...document.images].filter(i=>i.naturalWidth===0).map(i=>i.src.split('/').pop());
  return {sw:d.scrollWidth, cw:d.clientWidth, h:d.scrollHeight, reveals:document.querySelectorAll('[data-reveal]').length, hidden, over, broken};
})()`);
console.log(JSON.stringify(info));
const total = info.h;
let i = 0;
for (let y = 0; y < total; y += Number(chunk)) {
  const h = Math.min(Number(chunk), total - y);
  await c.evaluate(`window.scrollTo(0,${y})`);
  await sleep(350);
  const shot = await c.send("Page.captureScreenshot", { format: "jpeg", quality: 72, captureBeyondViewport: true, clip: { x: 0, y, width: W, height: h, scale: Number(scale) } });
  fs.writeFileSync(`${out}-${String(++i).padStart(2, "0")}.jpg`, Buffer.from(shot.data, "base64"));
}
console.log("chunks", i);
c.close();
process.exit(0);
