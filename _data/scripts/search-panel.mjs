// node search-panel.mjs — open the Google Search place panel (via local/reviews redirect), dump panel text + links.
import { launch, attach, sleep, save, SCRATCH } from "./cdp.mjs";
const PORT = 9803;
const URL_S = "https://search.google.com/local/reviews?placeid=ChIJeew4Fu5JYA0RCPIJme5dw-E&hl=es&gl=ES";

await launch({ port: PORT, profile: "chrome-profile3" });
const c = await attach(PORT);
await c.send("Page.enable");
await c.send("Page.bringToFront");
await c.send("Emulation.setFocusEmulationEnabled", { enabled: true });
await c.navigate(URL_S, 6000);
let href = await c.evaluate("location.href");
if (href.includes("consent.google")) {
  await c.evaluate(`[...document.querySelectorAll('button')].find(b=>/Rechazar todo|Reject all/.test(b.innerText))?.click()`);
  await sleep(4000);
  await c.navigate(URL_S, 7000);
  href = await c.evaluate("location.href");
}
console.log("at", href.slice(0, 160));
if (/Antes de ir a Google/.test(await c.evaluate("document.body.innerText"))) {
  console.log("dialog consent", await c.evaluate(`(() => { const b=[...document.querySelectorAll('button,div[role=button]')].find(b=>/^Rechazar todo$/.test(b.innerText.trim())); if(b){b.click(); return true} return false })()`));
  await sleep(4000);
  await c.navigate(href, 7000);
}
const text = await c.evaluate("document.body.innerText");
save(`${SCRATCH}/search-panel.txt`, text);
const links = await c.evaluate(`[...document.querySelectorAll('a[href]')].map(a=>[a.innerText.trim().slice(0,60), a.href]).filter(x=>!/google\\.com\\/(search|preferences|advanced)|accounts\\.google|support\\.google|policies/.test(x[1]))`);
save(`${SCRATCH}/search-panel-links.json`, links);
console.log(text.slice(0, 3000));
console.log(links.length, "links");
c.close();
process.exit(0);
