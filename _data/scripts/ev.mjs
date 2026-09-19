// node ev.mjs <file.js | -e "expr"> — evaluate JS in the attached Maps tab (port 9801) and print result.
import fs from "node:fs";
import { attach } from "./cdp.mjs";
const port = Number(process.env.PORT || 9801);
const arg = process.argv[2];
const expr = arg === "-e" ? process.argv[3] : fs.readFileSync(arg, "utf8");
const c = await attach(port);
await c.send("Page.bringToFront");
await c.send("Emulation.setFocusEmulationEnabled", { enabled: true });
const v = await c.evaluate(expr);
console.log(typeof v === "string" ? v : JSON.stringify(v, null, 1));
c.close();
process.exit(0);
