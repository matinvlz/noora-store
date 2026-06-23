# نورا (Noora) — Mobile Store

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + Sanity
rebuild of the Noora mobile-phone storefront Framer design.

## 1. Setup

```bash
npm install
cp .env.local.example .env.local   # fill in your Sanity project id once ready
npm run dev
```

The site runs and looks fully populated **without** any Sanity project
configured — every section reads from `lib/sanity/fallback-data.ts` until
`NEXT_PUBLIC_SANITY_PROJECT_ID` is set in `.env.local`. This means you (or
a teammate) can start wiring up real CMS content at any time without
breaking the live site in the meantime.

## 2. Connecting Sanity

1. Create a Sanity project (`npm create sanity@latest` in a separate
   folder, or reuse an existing Studio).
2. Copy the schema files from `sanity/schemaTypes/*` into your Studio's
   schema folder and register them in your Studio's `schema.types`.
3. Add a `siteSettings` singleton document, plus `brand`, `product`,
   `feature`, `testimonial`, and `blogPost` entries matching the content
   shown in the design (the fallback data file is a 1:1 content map you
   can copy text from).
4. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
   in `.env.local`. The site will automatically start pulling live data
   — no code changes needed, since `lib/sanity/data.ts` swaps sources
   transparently.

## 3. Design-fidelity notes (please read)

I rebuilt this from your 4 screenshots (mobile, tablet, and two desktop
captures) plus the exact hex palette you supplied. A few things I want
to flag rather than quietly guess past:

- **Font**: your screenshots use a rounded Persian geometric sans I
  can't fingerprint exactly from a screenshot. I used **Vazirmatn**
  (open-source, very close visual match, common in Iranian
  Framer/Figma templates). If your real design uses a licensed font
  (e.g. Yekan Bakh, IRANYekanX, Dana), swap the `next/font` import in
  `app/layout.tsx` — everything else (sizes, weights, line-heights) is
  already tuned to match the screenshots.
- **Exact spacing/px values**: built by eye from your screenshots at
  the breakpoints shown (mobile ~390px, tablet ~810px, desktop
  ~1440px). I can't extract sub-pixel values (exact padding-left:
  23px vs 24px) from a flattened screenshot — if you can export
  **Copy as Code** from Framer's dev handoff panel for any section
  that looks off, send it and I'll true it up exactly.
- **Product/blog/avatar images**: the screenshots show real photography
  I don't have source files for, so I generated flat placeholder JPGs
  in `public/images/` so the build doesn't 404. Replace these with your
  real assets (or upload to Sanity and they'll resolve automatically
  once Sanity is connected).
- **Colors**: used exactly as you specified — no guessing here.

## 4. Project structure

```
app/                  Next.js App Router pages, layout, global styles
components/            All UI sections (Header, Hero, ProductCard, etc.)
lib/sanity/            Sanity client, GROQ queries, data fetcher, fallback data
sanity/schemaTypes/    Sanity Studio schema definitions
types/                 Shared TypeScript interfaces
```

## 5. Animation notes

- Hero image: spring scale-in on load.
- Scroll sections (brands, product grids, features, testimonials, blog):
  fade + slide-up on first viewport entry, staggered per-item.
- Product cards: lift + image zoom on hover, tap-scale on buttons.
- Filter tabs: crossfade grid on category change.
- All motion respects `prefers-reduced-motion` (see `globals.css`).
