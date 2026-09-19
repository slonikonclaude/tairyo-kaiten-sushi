// Minimal CDP helper: launch Chrome, attach to a page target, send commands, wait for events.
import { spawn } from "node:child_process";
import fs from "node:fs";

export const SCRATCH = "C:/Users/DOPELG~1/AppData/Local/Temp/claude/C--Users-dopelganger-Documents-----------/0072b904-b6ec-4ff6-ba82-2b571ac69333/scratchpad";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(port, path, method = "GET") {
  for (const host of ["127.0.0.1", "[::1]"]) {
    try {
      const r = await fetch(`http://${host}:${port}${path}`, { method });
      return await r.json();
    } catch {}
  }
  throw new Error("no devtools on " + port);
}

export async function launch({ port = 9800, profile = "chrome-profile", headless = false, offscreen = true, width = 1400, height = 1000 } = {}) {
  let alive = false;
  try { await getJson(port, "/json/version"); alive = true; } catch {}
  if (!alive) {
    const args = [
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${SCRATCH}/${profile}`,
      "--no-first-run", "--no-default-browser-check",
      `--window-size=${width},${height}`,
      "--lang=es-ES",
      "--enable-unsafe-swiftshader", "--use-angle=swiftshader",
    ];
    if (headless) args.push("--headless=new");
    else if (offscreen) args.push("--window-position=-2400,0");
    args.push("about:blank");
    const p = spawn(CHROME, args, { detached: true, stdio: "ignore" });
    p.unref();
    for (let i = 0; i < 50; i++) {
      await sleep(300);
      try { await getJson(port, "/json/version"); break; } catch {}
    }
  }
  return port;
}

export async function attach(port, { newTab = false } = {}) {
  let targets = await getJson(port, "/json/list");
  let t = targets.find((x) => x.type === "page");
  if (newTab || !t) t = await getJson(port, "/json/new?about:blank", "PUT");
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
    } else if (msg.method) {
      for (const l of listeners) l(msg);
    }
  };
  const send = (method, params = {}) => new Promise((res, rej) => {
    const i = ++id;
    pending.set(i, { res, rej });
    ws.send(JSON.stringify({ id: i, method, params }));
  });
  const on = (fn) => { listeners.push(fn); return () => listeners.splice(listeners.indexOf(fn), 1); };
  const evaluate = async (expr, { awaitPromise = true } = {}) => {
    const r = await send("Runtime.evaluate", { expression: expr, awaitPromise, returnByValue: true });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 500));
    return r.result.value;
  };
  const navigate = async (url, wait = 4000) => {
    await send("Page.navigate", { url });
    await sleep(wait);
  };
  return { ws, send, on, evaluate, navigate, target: t, close: () => ws.close() };
}

export function save(file, data) {
  fs.writeFileSync(file, typeof data === "string" ? data : JSON.stringify(data, null, 1));
}
