// node search-photos.mjs — in the open Search panel tab (port 9803): open «Ver fotos», scroll the viewer column, collect gps-cs-s URLs.
import { attach, sleep, save, SCRATCH } from "./cdp.mjs";
const c = await attach(9803);
await c.send("Page.enable");
await c.send("Network.enable");
await c.send("Page.bringToFront");
await c.send("Emulation.setFocusEmulationEnabled", { enabled: true });
const seen = new Set();
c.on((m) => {
  if (m.method === "Network.requestWillBeSent") {
    const u = m.params.request.url;
    if (/googleusercontent\.com\/(gps-cs-s|p|grass-cs|geougc)/.test(u)) seen.add(u.split("=")[0]);
  }
});
const opened = await c.evaluate(`(() => { const b=[...document.querySelectorAll('a,div[role=button],button,span')].find(x=>/^Ver fotos$/.test((x.innerText||'').trim())); if(!b) return false; b.click(); return true })()`);
console.log("opened", opened);
await sleep(5000);
let lastN = 0, stable = 0;
for (let i = 0; i < 400 && stable < 15; i++) {
  const r = await c.evaluate(`(() => {
    const out=[...document.querySelectorAll('img')].map(i=>i.currentSrc||i.src).filter(u=>/googleusercontent/.test(u));
    const scs=[...document.querySelectorAll('div')].filter(d=>d.scrollHeight>d.clientHeight+100 && /auto|scroll/.test(getComputedStyle(d).overflowY) && d.clientWidth<900 && d.querySelector('img'));
    scs.forEach(sc=>sc.scrollTop=sc.scrollTop+Math.round(sc.clientHeight*0.8));
    return {out, n: scs.length, h: scs.map(s=>s.scrollTop+'/'+s.scrollHeight).join(',')};
  })()`);
  r.out.forEach((u) => seen.add(u.split("=")[0]));
  if (seen.size === lastN) stable++; else stable = 0;
  lastN = seen.size;
  if (i % 10 === 0) console.log("step", i, "urls", seen.size, "scrollers", r.n, r.h);
  await sleep(stable ? 1200 : 700);
}
const arr = [...seen].filter((u) => !/=|\/a\/|\/a-\//.test(u));
save(`${SCRATCH}/search-photos.json`, arr);
console.log("saved", arr.length, "gps", arr.filter((u) => /gps-cs-s/.test(u)).length);
c.close();
process.exit(0);
