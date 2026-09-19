# python _data/scripts/make-brand.py — логотип Tairyo из обложки их PDF-карты → альфа-маски.
# Обложка (_data/web/carta/pdf/p1.png, рендер 150 dpi): узор сэйгайха бледно-розовый, буквы
# чёрные, кольцо и начинка ролла — насыщенный красный #D32739. Маски:
#   тушь    = тёмное и не красное: clip((215 − L) / 165) при (R − (G+B)/2) < 45
#   красный = clip((R − (G+B)/2 − 45) / 110) при R > 120
# Бледные линии узора (L > 200, «краснота» < 45) не попадают ни в одну маску.
# Затем: вордмарк = строки букв «TAIRYO / KAITEN SUSHI» из маски туши; знак = ролл сверху;
# иконки app/icon.png (96) и app/apple-icon.png (180) — знак на бумаге.
# WebP: node -e "sharp(png).webp({quality:90, alphaQuality:100})" → public/brand/*.webp, PNG удалить.
from PIL import Image
import numpy as np

im = Image.open("_data/web/carta/pdf/p1.png").convert("RGB").crop((1550, 560, 3616, 2230))
a = np.asarray(im).astype(np.float32)
R, G, B = a[..., 0], a[..., 1], a[..., 2]
L = 0.299 * R + 0.587 * G + 0.114 * B
red = R - (G + B) / 2
ink = np.clip((215 - L) / 165, 0, 1) * (red < 45)
redA = np.clip((red - 45) / 110, 0, 1) * (R > 120)

full = np.maximum(ink, redA)
ys, xs = np.where(full > 0.2)
x0, y0, x1, y1 = max(0, xs.min() - 12), max(0, ys.min() - 12), xs.max() + 12, ys.max() + 12


def alpha(m, w):
    img = Image.fromarray((m[y0:y1, x0:x1] * 255).astype(np.uint8), "L")
    return img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)


def rgba(mask_l):
    out = Image.new("RGBA", mask_l.size, (0, 0, 0, 0))
    out.putalpha(mask_l)
    return out


ink_l, red_l = alpha(ink, 900), alpha(redA, 900)
# На сайте круглый логотип не больше 180 CSS px (404) → 3× = 540 px; маски 900 px — только для вырезок ниже.
for m, name in ((ink_l, "logo-ink"), (red_l, "logo-red")):
    rgba(m.resize((540, round(m.height * 540 / m.width)), Image.LANCZOS)).save(f"public/brand/{name}.png")

# Полосы строк по маске туши (900 px): ролл 6–203, TAIRYO 255–434, KAITEN SUSHI 455–551, иероглифы 584–647.
arr = np.asarray(ink_l)


def cols(r0, r1):
    c = (arr[r0:r1] > 128).sum(0)
    xs = np.where(c > 0)[0]
    return xs.min(), xs.max()


wx0, wx1 = cols(255, 551)
wm = ink_l.crop((wx0 - 6, 249, wx1 + 6, 557))
# Вордмарк в шапке — 88×30 CSS px → 3× ≈ 270 px.
rgba(wm.resize((270, round(wm.height * 270 / wm.width)), Image.LANCZOS)).save("public/brand/wordmark.png")

sx0, sx1 = cols(6, 203)
box = (sx0 - 4, 2, sx1 + 4, 207)
m_ink, m_red = ink_l.crop(box), red_l.crop(box)
rgba(m_ink).save("public/brand/mark-ink.png")
rgba(m_red).save("public/brand/mark-red.png")


def icon(size, path, pad=0.14):
    inner = int(size * (1 - 2 * pad))
    sc = inner / max(m_ink.size)
    sz = (round(m_ink.width * sc), round(m_ink.height * sc))
    i, r = m_ink.resize(sz, Image.LANCZOS), m_red.resize(sz, Image.LANCZOS)
    c = Image.new("RGB", (size, size), (250, 247, 242))
    ox, oy = (size - sz[0]) // 2, (size - sz[1]) // 2
    c.paste(Image.new("RGB", sz, (27, 23, 24)), (ox, oy), i)
    c.paste(Image.new("RGB", sz, (211, 39, 57)), (ox, oy), r)
    c.save(path)


icon(512, "app/icon.png")
# Фавикон — 96×96 и 48 цветов (~2 КБ вместо 47): кратно 48 для Google, резкий во вкладке при DPR 2–3.
Image.open("app/icon.png").convert("RGB").resize((96, 96), Image.LANCZOS).quantize(colors=48).save("app/icon.png", optimize=True)
icon(180, "app/apple-icon.png")
