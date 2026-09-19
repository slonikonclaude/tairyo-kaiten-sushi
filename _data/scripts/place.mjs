import { launch, attach, sleep, save, SCRATCH } from "./cdp.mjs";

const URL_PLACE = "https://www.google.com/maps/place/Tairyo+Kaiten+Sushi/@39.4675013,-0.3696433,17z/data=!3m1!4b1!4m6!3m5!1s0xd6049ee1638ec79:0xe1c35dee9909f208!8m2!3d39.4675013!4d-0.3696433!16s%2Fg%2F11wh8qy8n3?hl=es";
const lang = process.argv[2] || "es";

const port = await launch({ port: 9801 });
const c = await attach(port);
await c.send("Page.enable");
await c.send("Network.enable", { maxResourceBufferSize: 50_000_000, maxTotalBufferSize: 200_000_000 });
await c.send("Page.bringToFront");
await c.send("Emulation.setFocusEmulationEnabled", { enabled: true });

const responses = [];
c.on((m) => {
  if (m.method === "Network.responseReceived") {
    const u = m.params.response.url;
    if (/maps\/preview\/place|preview\/photo|listentityphotos|maps\/rpc/.test(u)) responses.push({ id: m.params.requestId, url: u });
  }
});

await c.navigate(URL_PLACE.replace("hl=es", "hl=" + lang), 5000);
let href = await c.evaluate("location.href");
console.log("at", href.slice(0, 120));
if (href.includes("consent.google")) {
  const clicked = await c.evaluate(`(() => { const b=[...document.querySelectorAll('button')].find(b=>/Rechazar todo|Reject all/.test(b.innerText)); if(b){b.click(); return true} return false })()`);
  console.log("consent clicked", clicked);
  await sleep(4000);
  await c.navigate(URL_PLACE.replace("hl=es", "hl=" + lang), 7000);
}
await sleep(3000);
const text = await c.evaluate("document.body.innerText");
save(`${SCRATCH}/panel-${lang}.txt`, text);
console.log(text.slice(0, 1500));
for (const r of responses) {
  try {
    const b = await c.send("Network.getResponseBody", { requestId: r.id });
    if (r.url.includes("preview/place")) {
      save(`${SCRATCH}/place-${lang}.txt`, b.body);
      console.log("saved place payload", b.body.length);
    }
  } catch (e) { console.log("no body", r.url.slice(0, 80)); }
}
console.log(responses.map((r) => r.url.slice(0, 100)));
c.close();
process.exit(0);
