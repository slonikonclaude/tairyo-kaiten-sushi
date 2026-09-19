export const meta = {
  name: 'tairyo-carta-translate',
  description: 'Translate the Tairyo carta (143 items) to British English, then two independent reviewers (culinary accuracy, faithfulness) and an arbiter',
  phases: [
    { title: 'Translate', detail: 'one translator for consistency' },
    { title: 'Review', detail: 'culinary lens + faithfulness lens, independent' },
    { title: 'Arbitrate', detail: 'apply only justified corrections' },
  ],
}

const D = 'C:/Users/dopelganger/Documents/Ресттораны/tairyo-kaiten-sushi/_data/menu-text'

const TR = {
  type: 'object',
  properties: {
    sections: { type: 'array', items: { type: 'object', properties: { es: { type: 'string' }, en: { type: 'string' } }, required: ['es', 'en'] } },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          key: { type: 'integer' },
          nameEn: { type: 'string' },
          descEn: { type: 'string', description: '"" if the Spanish description is empty' },
          piecesEn: { type: 'string', description: 'e.g. "2 pcs", "8 pcs", "1 pc · max. 2 per person"; "" if none' },
          note: { type: 'string', description: 'translator note on any judgement call, else ""' },
        },
        required: ['key', 'nameEn', 'descEn', 'piecesEn', 'note'],
      },
    },
  },
  required: ['sections', 'items'],
}

const translate = `Translate the menu ("carta") of Tairyo Kaiten Sushi Valencia — a conveyor-belt sushi buffet with pan-Asian hot dishes — from Spanish into natural British English for the English version of their website.

Input: ${D}/translate-input.json (143 items: key, num, section, name, description, pieces, priceText). Read it fully.

Rules:
- Faithful: translate only what is printed. Never add ingredients, cooking methods or claims that are not in the Spanish. If a name is ambiguous (e.g. "Costillas" — ribs of which animal is not stated), keep it neutral ("Ribs").
- British English (prawn not shrimp, starters, aubergine…). Japanese/Chinese dish names stay as the recognised English form: nigiri, hosomaki, uramaki, temaki, gunkan, futomaki, gyoza, xiaolongbao, siu mai (the carta writes "Siumai"), har gow (the carta writes "jakao"), bao, udon (the carta writes "Wudong"), soba = buckwheat noodles, tobiko, wakame, edamame, miso, tom yum, takoyaki, mochi, dorayaki, sake, soju, Ramune, Mogu Mogu.
- Section-level context matters: under "Nigiris" the item "Salmón" = "Salmon"; under "Brochetas" "De gamba" = "Prawn" (the section heading will say "Skewers"); under "Sashimi" "Atún" = "Tuna".
- "Pez mantequilla" = butterfish. "Carpaccio shake" — "shake" is Japanese for salmon: "Salmon carpaccio (shake)". "Nabo coreano" = Korean radish. "Hilo de carne" is an unclear phrase on a dragon roll (likely a garnish) — translate literally-but-natural and flag it in note. "Doufu" = tofu. "Hierba de limón" = lemongrass. "Judía roja" = red bean (adzuki). "Té japonés — té verde con arroz tostado" = genmaicha (green tea with toasted rice).
- Brand/wine names stay as they are (Mahou, Estrella Galicia, Sapporo, Protos, Marqués de Cáceres…); fix only obvious misspellings of brands in English (e.g. "sapooro" → Sapporo) and say so in note.
- pieces: "2 pzs"/"2pzs"/"2ud." → "2 pcs"; "1 pzs. Max.2 pzs/persona" → "1 pc · max. 2 per person". "Para 1-2 personas" in a description → "Serves 1–2".
- Spice markers "Picante +" / "Picante ++" in descriptions → drop them from descEn (the site shows spice separately) but keep the rest of the sentence.
- Section names: give an English name for every distinct Spanish section (drop the "Fuera de buffet — " prefix in the English section name, e.g. "Sashimi", "Desserts").

FINALLY: save the full result with the Write tool to ${D}/translate-en.json, then return the structured object.`

const REV = {
  type: 'object',
  properties: {
    issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          key: { type: 'integer', description: 'item key, or -1 for a section name' },
          field: { type: 'string', enum: ['nameEn', 'descEn', 'piecesEn', 'section'] },
          current: { type: 'string' },
          proposed: { type: 'string' },
          why: { type: 'string' },
          severity: { type: 'string', enum: ['error', 'improvement'] },
        },
        required: ['key', 'field', 'current', 'proposed', 'why', 'severity'],
      },
    },
  },
  required: ['issues'],
}

const review = (lens) => `Review an English translation of the menu of Tairyo Kaiten Sushi Valencia (conveyor-belt sushi buffet).
Spanish source: ${D}/translate-input.json. English translation: ${D}/translate-en.json (items matched by "key"). Read both fully.

Your lens: ${lens === 'culinary'
  ? 'CULINARY ACCURACY — is every dish/ingredient named correctly and idiomatically for a British diner (correct English names of Japanese/Chinese/Thai dishes and ingredients, prawn vs shrimp, sesame, tempura, flambéed, etc.)? Are any translations misleading about what is on the plate?'
  : 'FAITHFULNESS — does the English say exactly what the Spanish says, no more and no less? Flag any added ingredient, cooking method, adjective or claim not in the Spanish, any dropped ingredient, wrong piece count, wrong serving size, and any section/context error (e.g. item translated without its section context).'}

Report only real problems (severity "error") or clear improvements (severity "improvement"). Do not restyle for taste. For each, give the exact current text, your proposed text and why.

FINALLY: save your result with the Write tool to ${D}/translate-review-${lens}.json, then return the structured object.`

const ARB = {
  type: 'object',
  properties: {
    sections: TR.properties.sections,
    items: TR.properties.items,
    applied: { type: 'array', items: { type: 'string' } },
    rejected: { type: 'array', items: { type: 'string' } },
  },
  required: ['sections', 'items', 'applied', 'rejected'],
}

phase('Translate')
const tr = await agent(translate, { label: 'translator', phase: 'Translate', schema: TR })

phase('Review')
const reviews = await parallel(['culinary', 'faithfulness'].map((lens) => () => agent(review(lens), { label: `review ${lens}`, phase: 'Review', schema: REV })))

phase('Arbitrate')
const arb = await agent(`You are the final arbiter of the English translation of the Tairyo Kaiten Sushi Valencia menu.
Files: Spanish source ${D}/translate-input.json; current translation ${D}/translate-en.json; reviews ${D}/translate-review-culinary.json and ${D}/translate-review-faithfulness.json. Read all four.

For each review issue decide on the merits against the Spanish source: apply it if it is correct (faithful to the Spanish and idiomatic British English), reject it if it adds information not in the Spanish, is a matter of taste, or is wrong. Where the two reviewers conflict, decide from the Spanish. Keep every item (143) and every section in the output, including unchanged ones.

List what you applied and rejected (one line each: "key field: old → new (why)").
FINALLY: save the final translation with the Write tool to ${D}/translate-en-final.json ({sections, items}), then return the structured object.`, { label: 'arbiter', phase: 'Arbitrate', schema: ARB })

return { translated: tr ? tr.items.length : 0, reviewIssues: reviews.filter(Boolean).map((r) => r.issues.length), applied: arb?.applied, rejected: arb?.rejected }
