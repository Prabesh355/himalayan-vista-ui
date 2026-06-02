Nomads Navigate Nepal — Redesign Notes

Date: 2026-05-31

Overview

- Goal: Shift the site to a premium, adventurous, Himalayan-inspired travel brand. Use the provided logo as primary branding and center the design around deep mountain brown and sunrise orange.

Brand tokens

- Primary: #4A0B05 (Deep Mountain Brown)
- Secondary: #F4AA42 (Sunrise Orange)
- Background: #F7F5F2 (Warm White)
- Accent: #D97706
- Text: #1D1D1D

Typography

- Headings: Cinzel (display) — used via .font-display utility
- Body: Poppins — imported and set as default body font

What I changed (initial implementation)

1. `src/styles.css`
   - Imported Google Fonts (Cinzel + Poppins)
   - Rebased design tokens (colors, gradients, glass, shadows) to match brand palette
   - Added `.font-display` utility and set body font to Poppins
2. `src/routes/index.tsx`
   - Updated Hero section copy to:
     - Headline: "Explore Nepal Beyond The Map"
     - Subheadline: "Discover authentic Himalayan adventures, hidden trails, and unforgettable journeys."
     - CTAs: "Explore Treks" (-> /packages), "Plan Your Trip" (-> /contact)
3. `src/components/layout/Navbar.tsx` & `Footer.tsx`
   - Fixed missing logo imports to use existing `src/assets/Nomadslogo.jpeg` to ensure builds succeed

Build & deploy

- Verified `npm run build` completes successfully locally and generates `.vercel/output` and nitro artifacts.

Next steps — recommended

- Add a dedicated `Hero` component with parallax video option and LQIP image fallback.
- Design and implement `Featured Destinations` grid with masonry and hover micro-interactions.
- Create `TrekCard` component with badges for difficulty, duration, and price tag.
- Implement Gallery with Masonry layout and Lightbox (use `photoswipe` or `fslightbox-react`).
- Replace some large images with optimized versions / WebP to improve LCP (notably `everest-base-camp` is large).
- Add accessible focus states and ensure color contrast across components.
- Create a Tailwind config mapping semantic tokens for faster utility use.
- Add A11y checks and Lighthouse audit; improve image sizes and lazy-loading.

Files changed

- `src/styles.css` — brand tokens, fonts, utilities
- `src/routes/index.tsx` — hero copy + CTAs
- `src/components/layout/Navbar.tsx` — logo import fix
- `src/components/layout/Footer.tsx` — logo import fix

How to preview locally

1. Install deps (if not already):
   npm install
2. Start dev server:
   npm run dev
3. Build for production preview:
   npm run build
   npx vite preview

If you'd like, I can continue implementing the remaining sections (Featured Destinations, Popular Treks, Gallery, Testimonials, Blog) with components and reusable primitives, or craft a full Tailwind theme and component library aligned to the new visual language.

Design rationale

- Deep Mountain Brown grounds the brand in Himalayan earth and high-altitude lodges.
- Sunrise Orange and D97706 accent the CTAs, creating premium warmth and call-to-action emphasis.
- Poppins body keeps readability high and pairs well with the classic, stately Cinzel display headings.
- Glassmorphism and soft shadows provide premium depth while maintaining focus on photography (the main content).

Contact

- Ask me to continue and I will implement the Featured Destinations grid, Trek cards, Gallery, and responsive adjustments next.
