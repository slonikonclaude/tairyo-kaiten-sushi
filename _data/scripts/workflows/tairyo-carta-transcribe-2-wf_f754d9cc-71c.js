export const meta = {
  name: 'tairyo-carta-transcribe-2',
  description: 'Finish Tairyo carta transcription: missing B reads (p3, p4) and image-checked reconciliation of all 7 pages',
  phases: [
    { title: 'Read B', detail: 'second independent transcription for pages 3 and 4' },
    { title: 'Reconcile', detail: 'resolve every A/B disagreement against the image' },
  ],
}

const ROOT = 'C:/Users/dopelganger/Documents/Ресттораны/tairyo-kaiten-sushi/_data'
const SCR = 'C:/Users/DOPELG~1/AppData/Local/Temp/claude/C--Users-dopelganger-Documents-----------/0072b904-b6ec-4ff6-ba82-2b571ac69333/scratchpad'
const ALLERGENS = ['gluten','crustaceos','huevos','pescado','cacahuetes','soja','lacteos','frutos_cascara','apio','mostaza','sesamo','sulfitos','altramuces','moluscos']

const ITEM = {
  type: 'object',
  properties: {
    section: { type: 'string' },
    num: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    pieces: { type: 'string' },
    spicy: { type: 'integer' },
    allergens: { type: 'array', items: { type: 'string', enum: ALLERGENS } },
    price: { type: ['number', 'null'] },
    priceText: { type: 'string' },
    notes: { type: 'string' },
  },
  required: ['section','num','name','description','pieces','spicy','allergens','price','priceText','notes'],
}
const PAGE = {
  type: 'object',
  properties: {
    page: { type: 'integer' },
    sections: { type: 'array', items: { type: 'string' } },
    items: { type: 'array', items: ITEM },
    otherText: { type: 'array', items: { type: 'string' } },
  },
  required: ['page','sections','items','otherText'],
}
const RECON = {
  type: 'object',
  properties: { ...PAGE.properties, disputes: { type: 'array', items: { type: 'string' } } },
  required: [...PAGE.required, 'disputes'],
}

const LEGEND = `Allergen legend (page 2 of the same carta, coloured round icons, EU 14 allergens). The exact legend as transcribed is in ${ROOT}/menu-text/raw/page-2-prices.json ("legend" array) — read it first. Summary:
- gluten: ORANGE circle, white wheat ear
- crustaceos: SKY BLUE circle, white crab
- huevos: ORANGE circle, white eggs — do not confuse with gluten (wheat ear)
- pescado: DARK NAVY/INDIGO circle, white fish
- cacahuetes: LIGHT BROWN/TAN circle, peanut
- soja: GREEN circle, soy pods/leaves
- lacteos: DARK BROWN circle, white milk jug
- frutos_cascara: REDDISH-BROWN/maroon circle, walnut
- apio: LIGHT GREEN circle, celery
- mostaza: OLIVE/mustard circle
- sesamo: GREY-OLIVE/khaki circle, white seeds
- sulfitos: PURPLE circle with "E-X" and molecule rings
- altramuces: YELLOW circle, round beans
- moluscos: LIGHT CYAN/turquoise circle, scallop shell`

const FIELDS = `Fields per item: section (heading in normal capitalisation, prefixed "Fuera de buffet — " under that red banner), num (exactly as printed), name (exact spelling, typos kept), description (italic line(s) joined, "" if none), pieces ("2 pzs", "8pzs", "4ud." … as printed, "" if none), spicy (0, 1 = "Picante +", 2 = "Picante ++"), allergens (keys from the list, in printed order), price (number in euros, "+1€" → 1, null if none = included in buffet), priceText (exact), notes (uncertainty or other printed text, else "").`

const readB = (n) => `You are transcribing page ${n} of the printed carta of Tairyo Kaiten Sushi Valencia (conveyor-belt sushi buffet, Spanish, January 2026).

Image: ${ROOT}/web/carta2026/${n - 1}.jpg (1810×2560). Method: with Python + PIL crop the page into full-width horizontal strips (~8, with overlap), upscale each 2× (LANCZOS), save under ${SCR}/carta-B/p${n}/ and Read each strip. For every allergen icon make an extra tight crop (~3× upscale) so the glyph is clear before classifying.

Transcribe EVERY item in reading order (left column top→bottom, then right column). Keep the restaurant's spelling exactly.
${FIELDS}

${LEGEND}

FINALLY: save your result as JSON with the Write tool to ${ROOT}/menu-text/raw/B-p${n}.json (same shape as the structured output), then return the structured object. page = ${n}.`

const reconcile = (n) => `Two independent transcriptions of page ${n} of the Tairyo Kaiten Sushi Valencia carta exist:
- A: ${ROOT}/menu-text/raw/A-p${n}.json
- B: ${ROOT}/menu-text/raw/B-p${n}.json
Read both files. Images of the page: ${ROOT}/web/carta/pdf/p${n}.png (5167×7307) and ${ROOT}/web/carta2026/${n - 1}.jpg (1810×2560).

Produce the single correct transcription:
1. Diff A and B item by item (missing/extra items) and field by field.
2. For EVERY disagreement, crop that exact region from the PNG with Python + PIL (tight, upscale if small, save under ${SCR}/carta-R/p${n}/) and Read it. Decide from the image, never by majority.
3. Even where A and B agree, spot-check at least 6 allergen icons and every price by cropping.
${FIELDS}

${LEGEND}

In each item's notes record what was disputed and how it was resolved (or ""). List every dispute in "disputes" as "num field: A=… B=… → final … (why)".

FINALLY: save the final JSON with the Write tool to ${ROOT}/menu-text/raw/final-p${n}.json, then return the structured object. page = ${n}.`

// Pages whose B read is missing get it first; the others go straight to reconciliation.
const results = await pipeline(
  [3, 4, 5, 6, 7, 8, 9],
  (n) => (n === 3 || n === 4)
    ? agent(readB(n), { label: `B p${n}`, phase: 'Read B', schema: PAGE })
    : Promise.resolve('have-B'),
  (_prev, n) => agent(reconcile(n), { label: `reconcile p${n}`, phase: 'Reconcile', schema: RECON }),
)
return results
