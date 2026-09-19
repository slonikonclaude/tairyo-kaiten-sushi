// node check-layout.mjs <url> — at 320/375/1024: page overflow, tallest carta row per tab, group-card overflow, hero opacity before hydration.
import { launch, attach, sleep } from "./cdp.mjs";
const url = process.argv[2] || "http://localhost:3330/";
const PORT = 9527;
await launch({ port: PORT, profile: "shoot-profile", headless: true });
const c = await attach(PORT, { newTab: true });
await c.send("Page.enable");
for (const W of [320, 375, 1024]) {
  await c.send("Emulation.setDeviceMetricsOverride", { width: W, height: 800, deviceScaleFactor: 1, mobile: W < 800 });
  await c.navigate(url, 3500);
  const r = await c.evaluate(`(async () => {
    const d = document.documentElement;
    const out = { W: ${W}, sw: d.scrollWidth, cw: d.clientWidth, rows: {} };
    const tabs = [...document.querySelectorAll('[role=tab]')];
    for (const t of tabs) {
      t.click(); await new Promise(r => setTimeout(r, 350));
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      const lis = [...panel.querySelectorAll('li')];
      const max = Math.max(...lis.map(li => li.getBoundingClientRect().height));
      const clipped = lis.filter(li => li.scrollWidth > li.clientWidth + 1).length;
      out.rows[t.textContent.trim()] = Math.round(max) + (clipped ? ' clipped:' + clipped : '');
    }
    out.groupOverflow = [...document.querySelectorAll('#grupos article')].filter(a => a.scrollWidth > a.clientWidth + 1).map(a => a.querySelector('h3')?.textContent);
    out.sw2 = d.scrollWidth;
    return out;
  })()`);
  console.log(JSON.stringify(r));
}
c.close();
process.exit(0);
