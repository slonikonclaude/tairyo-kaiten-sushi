export const meta = {
  name: 'panpan-prepublish-review',
  description: 'Pre-publish review of the PanPan Atelier site: 4 independent reviewers (code/a11y/responsive, ES facts vs sources, EN + copy, export/SEO/deploy), every finding checked by 2 skeptics',
  phases: [
    { title: 'Review', detail: '4 reviewers, one dimension each' },
    { title: 'Verify', detail: '2 independent skeptics per finding' },
  ],
}

const ROOT = 'C:/Users/dopelganger/Documents/Ресттораны/panpan-atelier'
const COMMON = `Project: ${ROOT} — Next.js 16 static-export bilingual landing (ES at /, EN at /en/) for PanPan Atelier, a bakery-café in Valencia, built from its Google Maps listing. Read ${ROOT}/DESIGN.md first (sources, decisions, price policy, tokens). Data lives in lib/ (restaurant.ts, menu.ts, reviews.ts, photos.ts, dictionaries.ts); components in components/; styles app/globals.css. Raw sources in ${ROOT}/_data (maps/place-parsed.json, maps/reviews-all.json, maps/photo-catalog.json, menu-text/menu-final.json + reads.json, ig/*.json, web/eatbu-es.html, maps/search-panel.txt).
The production build is served statically at http://localhost:3391/ (ES) and http://localhost:3391/en/ (EN) (a copy of out/; rebuilds do not change it). For screenshots use: cd ${ROOT}/_data/scripts && PORT=<your port> node shoot.mjs <url> <width> <outPrefix> [chunk] [scale] — it prints overflow info; writes JPEG chunks; save outputs under ${ROOT}/_data/crops/review-<you>-*. Do NOT edit any project file — report only.
Report concrete, verifiable defects (file + line, what is wrong, why it matters, the fix). Do not report style preferences or things DESIGN.md already decided deliberately. Past houses in this folder had these real bugs — check them here too: whileInView reveals staying invisible on short screens; sr-only on <table> widening the page; header controls overflowing at 320–364 px; focus ring invisible on same-colour backgrounds; scroll-padding-top + scroll-mt doubling; sticky tab strip needing overflow-x-clip; hero rendered with SSR opacity:0; aria-label not starting with the visible label; mobile menu staying inert after resize to xl; JSON-LD aggregateRating (self-serving); OG image as WebP; 404 missing on Pages with two root layouts.`

const DIMENSIONS = [
  {
    key: 'code-a11y',
    port: 9601,
    prompt: `${COMMON}

Your dimension: CODE CORRECTNESS, ACCESSIBILITY and RESPONSIVE LAYOUT. Read every component and lib file. Check: semantics and heading order, tablists (MenuTabs, PopularTimes) keyboard behaviour and ARIA, focus visibility on every tone (light/pine/dark/crust), contrast of every text/background pair actually used (compute it; tokens are in globals.css), touch targets ≥44px, images (alt, width/height, sizes), hydration mismatches (anything that renders differently on server vs client), reduced motion, the wordmark mask (Wordmark in Logo.tsx; public/brand/logo-960.webp), layout at 320, 375, 768, 1024, 1440 px (screenshot with shoot.mjs using PORT=${9601}; check sw vs cw overflow numbers it prints; note the menu tab strip scrolls horizontally by design), and anything that would break in production. Also test the EN page.`,
  },
  {
    key: 'facts-es',
    port: 9602,
    prompt: `${COMMON}

Your dimension: FACTUAL ACCURACY of every claim on the site against the raw sources. Go through lib/restaurant.ts, lib/dictionaries.ts (ES and EN), lib/menu.ts, lib/reviews.ts, lib/photos.ts (alt texts vs what the photos show — Read the images in ${ROOT}/_photos/), components with hard-coded text, JSON-LD (components/JsonLd.tsx) and metadata (lib/site.ts). For each claim find the source in _data (quote it) or flag it as unsupported/overstated/contradicted. Specifically verify: hours, address/postcode, phone, rating/histogram/topics/counts, popular-times arrays vs place payload [84] (in _data/maps/place-es.txt → j[6][84]), services list, every price vs menu-final.json (run: npm run check:menu), review texts/authors/dates vs reviews-all.json and reviews-es-relevant.json, 'más de diez años', 'obrador propio / pastelería de elaboración propia', 'abren a las 7:30 todos los días', the summer-hours note, the 'Saborea la vida… sin prisa' slogan, captions of photos (correct dish names?), and anything else that states a fact.`,
  },
  {
    key: 'copy-en',
    port: 9603,
    prompt: `${COMMON}

Your dimension: LANGUAGE QUALITY of both locales. Spanish: natural Spain-Spanish, correct accents/punctuation (¿¡, «», —), consistent terms (tosta vs tostada, cruasán), no calques. English: natural British English, faithful to the Spanish (no added claims), consistent glosses for Spanish foods, correct € formatting from lib/format.ts, day names, 12/24h consistency. Check every string in lib/dictionaries.ts, lib/menu.ts, lib/photos.ts alts, components' literal strings, metadata titles/descriptions (length ok for SEO?), and the 404 page. Also look at the rendered pages (screenshots with shoot.mjs PORT=9603 at 1440 and 375) for awkward line breaks, orphaned words in headings, overflowing labels, mixed languages on the EN page (e.g. Spanish left untranslated where it should be English, or vice versa).`,
  },
  {
    key: 'export-seo',
    port: 9604,
    prompt: `${COMMON}

Your dimension: STATIC EXPORT, GITHUB PAGES DEPLOY, SEO and PERFORMANCE. Build with basePath exactly as CI will: in ${ROOT} run (Git Bash) MSYS_NO_PATHCONV=1 NEXT_PUBLIC_BASE_PATH=/panpan-atelier NEXT_PUBLIC_SITE_URL=https://slonikonclaude.github.io npm run build — BUT first copy the project to a scratch folder so you do not disturb the running dev server and out/: use  tar -C ${ROOT} --exclude=node_modules --exclude=.next --exclude=out --exclude=_data --exclude=_photos -cf - . | tar -C <scratch>/pp -xf -  then symlink or copy node_modules (cp -r is fine) and build there. Then inspect out/: every asset URL prefixed with /panpan-atelier (html, css url(), srcset, the --wordmark mask url, og:image, icons, JSON-LD urls), 404.html exists, /en/index.html, hreflang/canonical/alternates correct and absolute, og.jpg is JPEG 1200×630, robots, title/description lengths, JSON-LD validity (no aggregateRating), lang attributes, no /_next/image, .nojekyll handled by workflow (.github/workflows/deploy.yml). Serve the scratch out/ with a static server under the /panpan-atelier prefix (e.g. a tiny node http server mapping /panpan-atelier/ → out/) on port 4717 and screenshot it with shoot.mjs PORT=9604 to prove images/fonts/mask load. Weight: total transfer of the page (images ~ lazy?), LCP image priority, font preloads. Report defects only.`,
  },
]

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          file: { type: 'string' },
          line: { type: 'string' },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          evidence: { type: 'string' },
          fix: { type: 'string' },
        },
        required: ['title', 'file', 'line', 'severity', 'evidence', 'fix'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT = {
  type: 'object',
  properties: { real: { type: 'boolean' }, reason: { type: 'string' }, better_fix: { type: 'string' } },
  required: ['real', 'reason', 'better_fix'],
}

const verifyPrompt = (f, dim, n) => `You are skeptic #${n} checking one finding from a pre-publish review (dimension: ${dim}) of the PanPan Atelier website at ${ROOT} (read ${ROOT}/DESIGN.md for deliberate decisions). Try to REFUTE it: open the cited file/line, reproduce with the sources in ${ROOT}/_data or a screenshot (cd ${ROOT}/_data/scripts && PORT=${9610 + n} node shoot.mjs http://localhost:3391/ <width> ${ROOT}/_data/crops/skeptic-<name>), compute contrast yourself, etc. It is real only if the defect actually exists in the current code/output AND matters to users, correctness or the deploy. If DESIGN.md deliberately decided it, it is not real. Do not edit files.

Finding: ${JSON.stringify(f)}

Return real (true/false), the reason with the evidence you checked, and a better fix if the proposed one is wrong or incomplete (empty string otherwise).`

const results = await pipeline(
  DIMENSIONS,
  (d) => agent(d.prompt, { label: `review:${d.key}`, phase: 'Review', schema: FINDINGS }),
  (review, d) => {
    if (!review) return []
    return parallel(review.findings.map((f) => () =>
      parallel([1, 2].map((n) => () => agent(verifyPrompt(f, d.key, n), { label: `verify:${d.key}:${f.title.slice(0, 30)}#${n}`, phase: 'Verify', schema: VERDICT })))
        .then((vs) => ({ dim: d.key, ...f, verdicts: vs.filter(Boolean), votes: vs.filter(Boolean).filter((v) => v.real).length }))
    ))
  },
)
const all = results.filter(Boolean).flat()
const confirmed = all.filter((f) => f.votes >= 1)
log(`${all.length} findings, ${all.filter((f) => f.votes === 2).length} confirmed by both skeptics, ${all.filter((f) => f.votes === 1).length} split`)
return { confirmed, rejected: all.filter((f) => f.votes === 0).map((f) => ({ dim: f.dim, title: f.title, why: f.verdicts.map((v) => v.reason) })) }
