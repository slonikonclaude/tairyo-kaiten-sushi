// Debug: open the place, click a photo category, report what the grid looks like.
import { launch, attach, sleep } from "./cdp.mjs";
const URL_PLACE = "https://www.google.com/maps/place/Tairyo+Kaiten+Sushi/@39.4675013,-0.3696433,17z/data=!3m1!4b1!4m6!3m5!1s0xd6049ee1638ec79:0xe1c35dee9909f208!8m2!3d39.4675013!4d-0.3696433!16s%2Fg%2F11wh8qy8n3?hl=es";
const cat = process.argv[2] || "Todas";
await launch({ port: 9801 });
const c = await attach(9801);
await c.send("Page.enable");
await c.send("Page.bringToFront");
await c.send("Emulation.setFocusEmulationEnabled", { enabled: true });
await c.navigate(URL_PLACE, 8000);
console.log("vis", await c.evaluate("document.visibilityState"), "title", await c.evaluate("document.title"));
const btns = await c.evaluate(`[...document.querySelectorAll('button')].map(b=>b.getAttribute('aria-label')).filter(a=>a && /·|Foto|fotos|Carta|Todas/.test(a)).slice(0,40)`);
console.log(JSON.stringify(btns, null, 1));
const ok = await c.evaluate(`(() => { const b=[...document.querySelectorAll('button:not([role=tab])')].find(b=>{const a=b.getAttribute('aria-label')||''; return a.split('·')[0].trim()===${JSON.stringify(cat)}}); if(!b) return false; b.scrollIntoView(); b.click(); return b.getAttribute('aria-label') })()`);
console.log("clicked", ok);
await sleep(6000);
const info = await c.evaluate(`(() => {
  const a=document.querySelectorAll('a[data-photo-index]').length;
  const scs=[...document.querySelectorAll('div')].filter(d=>d.scrollHeight>d.clientHeight+50 && /auto|scroll/.test(getComputedStyle(d).overflowY)).map(d=>({cls:d.className.slice(0,40), sh:d.scrollHeight, ch:d.clientHeight, cw:d.clientWidth, hasA: !!d.querySelector('a[data-photo-index]'), imgs: d.querySelectorAll('img').length}));
  return {a, scs, text: document.body.innerText.slice(0,1500), url: location.href.slice(0,200)};
})()`);
console.log(JSON.stringify(info, null, 1));
c.close();
process.exit(0);
