// node serve.mjs <dir> <port> [prefix] — tiny static server (no deps). prefix e.g. /panpan-atelier
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const [dir, port = "4391", prefix = ""] = process.argv.slice(2);
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ico": "image/x-icon", ".txt": "text/plain" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (prefix && p.startsWith(prefix)) p = p.slice(prefix.length) || "/";
  let f = path.join(dir, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404, { "content-type": TYPES[".html"] }); return res.end(fs.existsSync(path.join(dir, "404.html")) ? fs.readFileSync(path.join(dir, "404.html")) : "404"); }
  res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(Number(port), () => console.log("serving", dir, "on", port, prefix));
