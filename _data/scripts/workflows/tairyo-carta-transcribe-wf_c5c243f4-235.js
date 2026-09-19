export const meta = {
  name: 'tairyo-carta-transcribe',
  description: 'Transcribe Tairyo Valencia carta PDF pages: two independent reads per page + image-checked reconciliation',
  phases: [
    { title: 'Read A', detail: 'first independent transcription per page' },
    { title: 'Read B', detail: 'second independent transcription per page' },
    { title: 'Reconcile', detail: 'resolve every A/B disagreement against the image' },
    { title: 'Prices page', detail: 'buffet prices, rules, hours, legend (page 2)' },
  ],
}

const ROOT = 'C:/Users/dopelganger/Documents/Ресттораны/tairyo-kaiten-sushi/_data/web'
const ALLERGENS = ['gluten','crustaceos','huevos','pescado','cacahuetes','soja','lacteos','frutos_cascara','apio','mostaza','sesamo','sulfitos','altramuces','moluscos']

const ITEM = {
  type: 'object',
  properties: {
    section: { type: 'string', description: 'Section heading exactly as printed, e.g. "Nigiris", "Uramakis", "Fuera de buffet — Sashimi"' },
    num: { type: 'string', description: 'Item number exactly as printed, e.g. "101" or "8003"' },
    name: { type: 'string', description: 'Dish name exactly as printed (keep their spelling/typos)' },
    description: { type: 'string', description: 'Italic description line(s) exactly as printed, joined with a space; "" if none' },
    pieces: { type: 'string', description: 'Piece count as printed ("2 pzs", "8pzs", "4ud.", "1 pzs. Max.2 pzs/persona"); "" if none' },
    spicy: { type: 'integer', description: '0 none, 1 = "Picante +", 2 = "Picante ++"' },
    allergens: { type: 'array', items: { type: 'string', enum: ALLERGENS }, description: 'Allergen icons printed next to THIS item, in printed order' },
    price: { type: ['number', 'null'], description: 'Price in euros if printed (e.g. 12.95), supplement "+1€" → 1; null if no price (included in buffet)' },
    priceText: { type: 'string', description: 'Price exactly as printed ("+1€", "12,95€", "3,50€ / copa 10,90€ / botella"); "" if none' },
    notes: { type: 'string', description: 'Any uncertainty, other printed text for this item, or "" ' },
  },
  required: ['section','num','name','description','pieces','spicy','allergens','price','priceText','notes'],
}
const PAGE = {
  type: 'object',
  properties: {
    page: { type: 'integer' },
    sections: { type: 'array', items: { type: 'string' }, description: 'Section headings in reading order' },
    items: { type: 'array', items: ITEM },
    otherText: { type: 'array', items: { type: 'string' }, description: 'Any other printed text on the page not captured in items (banners, footnotes)' },
  },
  required: ['page','sections','items','otherText'],
}

const LEGEND = `Allergen legend (from page 2 of the same carta, colored round icons, EU 14 allergens):
- gluten: ORANGE circle with a white wheat ear ("CONTIENE GLUTEN")
- crustaceos: LIGHT/SKY BLUE circle with a white crab
- huevos: ORANGE circle with white eggs (two/three egg shapes) — do not confuse with gluten (wheat ear)
- pescado: DARK NAVY/INDIGO circle with a white fish
- cacahuetes: LIGHT BROWN/TAN circle with a peanut
- soja: GREEN circle with white soy pods/leaves
- lacteos: DARK BROWN circle with a white milk jug
- frutos_cascara: REDDISH-BROWN / maroon circle with a walnut
- apio: LIGHT GREEN circle with celery
- mostaza: OLIVE / mustard-brown circle with a mustard bottle/sauce shape
- sesamo: GREY-OLIVE / khaki circle with white seeds (granos de sésamo)
- sulfitos: PURPLE circle with "E-X" text and molecule rings (dióxido de azufre y sulfitos)
- altramuces: YELLOW circle with round lupin beans
- moluscos: LIGHT CYAN / turquoise circle with a white scallop shell`

const pages = [3, 4, 5, 6, 7, 8, 9]

const readPrompt = (n, variant) => `You are transcribing page ${n} of the printed restaurant menu ("carta") of Tairyo Kaiten Sushi Valencia (a conveyor-belt sushi buffet), Spanish, January 2026.

Image files (same page, two renders):
- ${ROOT}/carta/pdf/p${n}.png  (5167×7307 px render of the PDF page — highest resolution)
- ${ROOT}/carta2026/${n - 1}.jpg (1810×2560 px web version of the same page)

${variant === 'A'
  ? 'Method: work from the PNG. Use Python + PIL to crop the page into a grid (e.g. left/right columns × 4–6 horizontal bands with overlap), save crops to a temp folder under C:/Users/DOPELG~1/AppData/Local/Temp/claude/C--Users-dopelganger-Documents-----------/0072b904-b6ec-4ff6-ba82-2b571ac69333/scratchpad/carta-A/, downscale each crop to ≤1600 px on the long side, and Read each crop image. Zoom further (tighter crops) on every allergen icon row and every price.'
  : 'Method: work from the JPG. Use Python + PIL to crop the page into horizontal strips (full width, ~8 strips with overlap), upscale each strip 2× with LANCZOS, save them under C:/Users/DOPELG~1/AppData/Local/Temp/claude/C--Users-dopelganger-Documents-----------/0072b904-b6ec-4ff6-ba82-2b571ac69333/scratchpad/carta-B/, and Read each strip. For every allergen icon make an additional tight crop (≈3× upscale) so the icon glyph is clearly visible before you classify it.'}

Transcribe EVERY item on the page in reading order (the page usually has two columns: finish the left column top-to-bottom, then the right column). Keep the restaurant's spelling exactly (typos included, e.g. "Salmon" without accent, "laga" for "alga") — do not correct. Section headings are big black brush-style letters; use normal capitalisation for them (e.g. "NIGIRIS" → "Nigiris"). If a page has a big red banner like "FUERA DE BUFFET", prefix sections with it: "Fuera de buffet — Sashimi".

${LEGEND}

Classify each allergen icon by its COLOUR AND GLYPH together; if you truly cannot tell, pick your best guess and say so in notes. Icons belong to the item on the same line (or directly below the name for centred layouts). Prices are red. Items without a price are included in the buffet → price null.

Return the structured object. page = ${n}.`

const reconcilePrompt = (n, a, b) => `Two independent transcriptions (A and B) were made of page ${n} of the Tairyo Kaiten Sushi Valencia carta. Your job: produce the single correct transcription.

Image files: ${ROOT}/carta/pdf/p${n}.png (5167×7307) and ${ROOT}/carta2026/${n - 1}.jpg (1810×2560).

Transcription A:
${JSON.stringify(a)}

Transcription B:
${JSON.stringify(b)}

Steps:
1. Diff A and B field by field (section, num, name, description, pieces, spicy, allergens, price, priceText) and item by item (missing/extra items).
2. For EVERY disagreement, crop that exact region with Python + PIL from the PNG (tight crop, upscale if small, save under C:/Users/DOPELG~1/AppData/Local/Temp/claude/C--Users-dopelganger-Documents-----------/0072b904-b6ec-4ff6-ba82-2b571ac69333/scratchpad/carta-R/) and Read it. Decide from the image, not from majority.
3. Even where A and B agree, spot-check at least 5 allergen icons and every price by cropping.

${LEGEND}

Keep the restaurant's exact spelling. In "notes" of an item record what was disputed and how you resolved it (or ""). Also list all disputes in the "disputes" array as short strings "num field: A=… B=… → final … (why)". Return the structured object.`

const RECON = {
  type: 'object',
  properties: { ...PAGE.properties, disputes: { type: 'array', items: { type: 'string' } } },
  required: [...PAGE.required, 'disputes'],
}

const PRICES = {
  type: 'object',
  properties: {
    prices: { type: 'array', items: { type: 'object', properties: { label: { type: 'string' }, sublabel: { type: 'string' }, price: { type: ['number','null'] }, priceText: { type: 'string' } }, required: ['label','sublabel','price','priceText'] } },
    rules: { type: 'array', items: { type: 'string' }, description: 'Footnotes / conditions exactly as printed' },
    hours: { type: 'array', items: { type: 'string' } },
    address: { type: 'string' },
    email: { type: 'string' },
    slogan: { type: 'string' },
    fishNote: { type: 'string' },
    legend: { type: 'array', items: { type: 'object', properties: { label: { type: 'string' }, colour: { type: 'string' }, glyph: { type: 'string' } }, required: ['label','colour','glyph'] } },
    otherText: { type: 'array', items: { type: 'string' } },
  },
  required: ['prices','rules','hours','address','email','slogan','fishNote','legend','otherText'],
}

const pricesJob = agent(`Transcribe page 2 ("PRECIO MENÚ") of the Tairyo Kaiten Sushi Valencia carta, January 2026. Image: ${ROOT}/carta/pdf/p2.png (5167×7307) — crop with Python PIL into bands, downscale to ≤1600 px long side, save under C:/Users/DOPELG~1/AppData/Local/Temp/claude/C--Users-dopelganger-Documents-----------/0072b904-b6ec-4ff6-ba82-2b571ac69333/scratchpad/carta-P/ and Read them; zoom into small print (e.g. the tiny italic note under "NOCHE"). Capture every buffet price with its exact label and any small sub-label, every footnote rule verbatim, the opening hours block, address, email, the script slogan, the note about fish, and for the allergen legend at the bottom record each icon's label, its circle colour and its white glyph (be precise: this legend will be used to classify icons elsewhere). Return the structured object.`, { label: 'page 2 prices', phase: 'Prices page', schema: PRICES })

const results = await pipeline(
  pages,
  (n) => agent(readPrompt(n, 'A'), { label: `A p${n}`, phase: 'Read A', schema: PAGE }).then((a) => ({ a })),
  (prev, n) => agent(readPrompt(n, 'B'), { label: `B p${n}`, phase: 'Read B', schema: PAGE }).then((b) => ({ ...prev, b })),
  (prev, n) => agent(reconcilePrompt(n, prev.a, prev.b), { label: `reconcile p${n}`, phase: 'Reconcile', schema: RECON }).then((r) => ({ page: n, a: prev.a, b: prev.b, final: r })),
)
const prices = await pricesJob
return { pages: results, prices }
