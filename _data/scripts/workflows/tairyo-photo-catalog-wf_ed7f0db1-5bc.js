export const meta = {
  name: 'tairyo-photo-catalog',
  description: 'Classify ~500 Google Maps photos of Tairyo Kaiten Sushi from contact sheets (category, dish, quality, faces)',
  phases: [
    { title: 'Catalog', detail: 'one agent per pair of contact sheets' },
  ],
}

const D = 'C:/Users/dopelganger/Documents/Ресттораны/tairyo-kaiten-sushi/_data'
const SHEETS = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14]]

const PHOTO = {
  type: 'object',
  properties: {
    n: { type: 'integer', description: 'the number before the colon in the tile label, e.g. 17 for "17:d2de8a27f7 1000x1333"' },
    file: { type: 'string', description: 'file name = the 10 hex chars after the colon + ".jpg"' },
    cat: { type: 'string', enum: ['conveyor', 'train', 'interior', 'facade', 'dish', 'dessert', 'drink', 'menu-print', 'price-board', 'people', 'other'] },
    dish: { type: 'string', description: 'what food is visible, as specific as you can (e.g. "uramaki salmón flambeado with mayo", "gyozas", "tempura langostino"), "" if none' },
    q: { type: 'integer', description: 'photographic quality 1–5 for use on a premium website (sharpness, light, composition); 5 = hero-worthy' },
    faces: { type: 'string', enum: ['none', 'background-small', 'identifiable'], description: 'identifiable = a person whose face could be recognised' },
    orient: { type: 'string', enum: ['landscape', 'portrait', 'square'] },
    video: { type: 'boolean', description: 'tile looks like a video frame/thumbnail (play icon, blurry motion) — guess from appearance' },
    note: { type: 'string', description: 'anything notable: text/logos readable, trains visible, the neon sign, kokeshi doll, lanterns, a price visible, a different restaurant, AI-looking render…' },
  },
  required: ['n', 'file', 'cat', 'dish', 'q', 'faces', 'orient', 'video', 'note'],
}
const OUT = {
  type: 'object',
  properties: { photos: { type: 'array', items: PHOTO } },
  required: ['photos'],
}

const prompt = (a, b) => `You are cataloguing guest and owner photos of Tairyo Kaiten Sushi Valencia (a conveyor-belt "running sushi" buffet: coloured plates with clear domes on belts; miniature bullet trains on elevated rails deliver à-la-carte orders; the dining room is styled like a Japanese street with lanterns, flags, yellow shoji light panels).

Contact sheets (6 columns × 6 rows, each tile labelled "N:<10-hex-id> WxH" UNDER the image):
- ${D}/photo-sheets/sheet-${a}.jpg
- ${D}/photo-sheets/sheet-${b}.jpg
The full-size previews are ${D}/photos/all/<10-hex-id>.jpg (1000 px). Read each sheet; for any tile you are unsure about (food identity, faces, quality), Read the individual file.

For EVERY tile on both sheets return one entry (do not skip tiles). Be strict about faces: any person looking at the camera or clearly recognisable = "identifiable". Be precise about dishes — do not guess a name you cannot see; describe instead. Rice dishes vs noodle dishes, salmon vs tuna: only say it if visible.

FINALLY: save the result as JSON with the Write tool to ${D}/photo-sheets/catalog-${a}-${b}.json ({"photos":[…]}), then return the structured object.`

const results = await parallel(SHEETS.map(([a, b]) => () => agent(prompt(a, b), { label: `sheets ${a}-${b}`, phase: 'Catalog', schema: OUT })))
const photos = results.filter(Boolean).flatMap((r) => r.photos)
log(`catalogued ${photos.length} photos`)
return { count: photos.length, photos }
