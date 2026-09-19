/**
 * Префикс для путей от корня сайта, когда сайт живёт в подкаталоге
 * (GitHub Pages проекта: /tairyo-kaiten-sushi/).
 *
 * Next подставляет basePath сам только в next/link, next/font и файлы
 * метаданных. Обычный <img src="/photos/…"> он не трогает — под подкаталогом
 * такой путь дал бы 404, поэтому префикс добавляется здесь.
 *
 * Отдельный модуль, а не часть lib/site.ts: этим пользуются клиентские
 * компоненты, а сборка метаданных им не нужна.
 */

/** Нормализация повторяет next.config.ts: "/" и "" — оба означают корень. */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/+$/, "");

/** `/photos/x.webp` → `/tairyo-kaiten-sushi/photos/x.webp`. В корне возвращает как есть. */
export const withBase = (path: string) => `${basePath}${path}`;
