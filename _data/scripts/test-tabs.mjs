// node test-tabs.mjs <url> [width] — CDP check of the menu tabs: switch from deep inside a long panel,
// the new panel must start on screen (below the sticky strip); the selected tab must be inside the strip.
import { launch, attach, sleep } from "./cdp.mjs";
const [url = "http://localhost:3392/", width = "375"] = process.argv.slice(2);
const PORT = 9594;
await launch({ port: PORT, profile: `shoot-profile-${PORT}`, headless: true });
const c = await attach(PORT, { newTab: true });
await c.send("Page.enable");
await c.send("Emulation.setDeviceMetricsOverride", { width: Number(width), height: 812, deviceScaleFactor: 1, mobile: Number(width) < 800 });
await c.navigate(url, 4000);
const r = await c.evaluate(`(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const tabs = [...document.querySelectorAll('[role=tab]')].filter(t => t.closest('#carta'));
  const panels = [...document.querySelectorAll('#carta [role=tabpanel]')];
  const out = { tabs: tabs.length, panels: panels.length, hiddenPanels: panels.filter(p => p.hidden).length };
  const first = panels[0];
  const lastItem = first.querySelector('li:last-child');
  lastItem.scrollIntoView({ block: 'center' });
  await sleep(600);
  out.beforeScrollY = Math.round(scrollY);
  tabs[tabs.length - 1].click();
  await sleep(1500);
  const strip = tabs[0].closest('[role=tablist]').parentElement;
  const active = panels.find(p => !p.hidden);
  out.afterScrollY = Math.round(scrollY);
  out.stripBottom = Math.round(strip.getBoundingClientRect().bottom);
  out.panelTop = Math.round(active.getBoundingClientRect().top);
  out.panelVisible = active.getBoundingClientRect().top >= strip.getBoundingClientRect().bottom - 2 && active.getBoundingClientRect().top < innerHeight;
  const list = tabs[0].closest('[role=tablist]').getBoundingClientRect();
  const sel = tabs[tabs.length - 1].getBoundingClientRect();
  out.selectedTabInside = sel.left >= list.left - 1 && sel.right <= list.right + 1;
  out.activeTitle = active.dataset.title;
  return out;
})()`);
console.log(JSON.stringify(r));
c.close();
process.exit(0);
