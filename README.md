# Tairyo Kaiten Sushi Valencia — сайт кайтэн-буфета

Двуязычный лендинг Tairyo Kaiten Sushi (C/ d'Isabel la Catòlica, 22 — L'Eixample,
València): испанский в корне, английский в `/en/`. Next.js со статическим экспортом,
публикация на GitHub Pages через `.github/workflows/deploy.yml`.

Адрес: https://slonikonclaude.github.io/tairyo-kaiten-sushi/

## Команды

```
npm run dev          # локально (в папке «Рестораны» — порт 3450, .claude/launch.json)
npm run build        # статический экспорт в out/
npm run menu         # _data/menu-text/*.json → lib/menu.ts (карта, 143 позиции)
npm run check:menu   # сверка цен, аллергенов и тарифов буфета с картой 01.2026 и Instagram
npm run photos       # _photos/ → WebP 800/1600 в public/photos
```

## Где что лежит

- `DESIGN.md` — источники, расхождения (телефоны, часы 23:30 против 00:00, старая доска с 23,95 €), дизайн-решения
- `lib/restaurant.ts` — адрес, телефон, часы (две смены), рейтинг, гистограмма, темы отзывов, «horas punta», атрибуты
- `lib/menu.ts` — **сгенерирован** `scripts/build-menu.mjs`: 143 позиции карты по вкладкам, тарифы буфета
- `lib/reviews.ts` — 6 испанских и 5 английских отзывов Google в оригинале
- `lib/photos.ts` — 21 снимок из карточки Google (без лиц) и alt на двух языках
- `lib/dictionaries.ts` — все тексты интерфейса на двух языках
- `public/brand/` — логотип: альфа-маски туши и красного, вырезанные из обложки их PDF (`_data/scripts/make-brand.py`)
- `_data/menu-text/` — расшифровка карты (два прочтения + сверка по картинке → `menu-final.json`) и перевод (`translate-en-final.json`)
- `_data/maps/` — разобранная карточка Google, список всех 501 фото, Instagram
- `_data/scripts/` — сбор (Chrome по CDP), генераторы, съёмка страниц, скрипты workflow агентов
