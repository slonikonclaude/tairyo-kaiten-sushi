import type { NextConfig } from "next";

/**
 * Базовый путь, когда сайт отдаётся не из корня домена.
 *
 *   Project Pages   →  NEXT_PUBLIC_BASE_PATH=/tairyo-kaiten-sushi
 *   USER.github.io  →  "/" (Next не принимает путь со слэшем на конце — нормализуем)
 *   свой домен      →  переменную не задавать
 *
 * В CI значение подставляет `actions/configure-pages`.
 */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/+$/, "");

/**
 * Статический экспорт: лендингу не нужен сервер, а `out/` кладётся на любой
 * хостинг. trailingSlash — чтобы /en отдавался как /en/index.html.
 *
 * `images.unoptimized` обязателен: при экспорте оптимизатора нет, а гарда на
 * его отсутствие в App Router не срабатывает — сборка молча выдала бы
 * /_next/image и 404 на статике. Все снимки всё равно пережаты заранее в WebP
 * и отдаются обычным <img srcSet>, а не next/image.
 */
const nextConfig: NextConfig = {
  basePath,

  // Обратно в бандл: сам basePath Next коду не показывает, а обычному
  // <img src="/photos/…"> префикс нужен руками — см. lib/basePath.ts.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  output: "export",
  // Два корневых layout-а → обычный not-found не собрать; 404.html даёт app/global-not-found.tsx.
  experimental: { globalNotFound: true },
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
