/**
 * Готовит снимки для статического экспорта (DESIGN.md §8): оптимизатора
 * next/image при `output: "export"` нет, поэтому всё пережимается заранее.
 *
 *   _photos/*.jpg        → public/photos/<name>-800.webp и -1600.webp
 *
 * Запускается руками (`npm run photos`), результат лежит в репозитории.
 * Побочный результат — _photos/photo-manifest.json с размерами оригиналов:
 * из него берутся width/height в lib/photos.ts против сдвига вёрстки.
 */
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PHOTOS_OUT = path.join("public", "photos");
await mkdir(PHOTOS_OUT, { recursive: true });

const manifest = {};

for (const file of (await readdir("_photos")).filter((f) => /\.jpe?g$/i.test(f)).sort()) {
  const name = file.replace(/\.jpe?g$/i, "");
  const input = sharp(path.join("_photos", file)).rotate();
  const meta = await input.metadata();
  manifest[name] = { width: meta.width, height: meta.height };
  // Исходник ≤ 800 px — один файл -800 (lib/photos.ts srcFor), без байт-в-байт копии -1600.
  for (const w of meta.width <= 800 ? [800] : [800, 1600]) {
    await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: name.startsWith("hero") ? 66 : 78 })
      .toFile(path.join(PHOTOS_OUT, `${name}-${w}.webp`));
  }
  console.log(`${name}  ${meta.width}x${meta.height}`);
}

await writeFile("_photos/photo-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${Object.keys(manifest).length} фото → ${PHOTOS_OUT}`);
