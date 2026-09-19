# python sheet.py <dir> <out-prefix> [cols=6] [per=36] — labelled contact sheets of all jpgs in dir (order of index.json if present)
import sys, os, json
from PIL import Image, ImageDraw

d, out = sys.argv[1], sys.argv[2]
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 6
per = int(sys.argv[4]) if len(sys.argv) > 4 else 36
idx = os.path.join(d, "index.json")
if os.path.exists(idx):
    files = [x["file"] for x in json.load(open(idx, encoding="utf-8"))]
else:
    files = sorted(f for f in os.listdir(d) if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")))
T = 260
for s in range(0, len(files), per):
    chunk = files[s : s + per]
    rows = (len(chunk) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * T, rows * (T + 18)), "white")
    dr = ImageDraw.Draw(sheet)
    for i, f in enumerate(chunk):
        try:
            im = Image.open(os.path.join(d, f)).convert("RGB")
        except Exception:
            continue
        w, h = im.size
        im.thumbnail((T - 6, T - 6))
        x, y = (i % cols) * T, (i // cols) * (T + 18)
        sheet.paste(im, (x + (T - im.width) // 2, y + (T - im.height) // 2))
        dr.text((x + 4, y + T), f"{s + i}:{f[:10]} {w}x{h}", fill="black")
    p = f"{out}-{s // per + 1}.jpg"
    sheet.save(p, quality=78)
    print(p, len(chunk))
