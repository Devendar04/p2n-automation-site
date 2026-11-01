# P2N Automation — Kinetic / Paper Hybrid Site

React + Tailwind + Supabase site for a B2B tech company that also runs a
student academy. Two visual languages, used deliberately per audience:

## Design system

Colours come from the P2N logo: black `#0F0F0F`, electric blue `#017AFB`
(gradient to cyan `#10A0F6`) on white. Tokens live in `tailwind.config.js`
and keep the same semantic names as before, so a re-skin is a one-file change:

- `void` = page background (white) · `offwhite` = ink / body text (black)
- `zincline` = hairline borders · `acid` = primary accent (logo blue,
  `#0868E6` so white text on it passes AA) · `azure` / `cyanline` = exact logo blues
- `mist` = alternate section surface · `paper` / `postit` / `graphite` /
  `ballpoint` = the hand-drawn "paper" layer for Academy elements

- **Kinetic layer** (B2B): flat 2px borders, zero radius, uppercase Space
  Grotesk, `tracking-tighter`, blue fill with colour-inversion on hover.
- **Paper layer** (Academy / annotations): pale-blue post-its, Kalam / Patrick
  Hand, wobbly borders, hard offset shadows, tape strips, slight rotation.
- The two layers never blend inside one element.

Logo files: `public/logo.png` (full lockup, transparent), `public/logo-mark.png`
(P2N mark only, used in navbar/footer), favicons in `public/`; the untouched
original is `public/images/brand/p2n-logo-original.png`.

## Light / dark theme

The five core colour tokens are CSS variables (`src/index.css`: `:root` = light,
`.dark` = dark). `<ThemeToggle />` (navbar, mobile bar, admin header) flips the
`dark` class on `<html>` and remembers the choice in `localStorage`; first-time
visitors get their system preference. A tiny script in `index.html` applies the
theme before first paint so there is no flash. The logo has a dark variant
(`public/logo-mark-dark.png`) swapped in with Tailwind's `dark:` classes.

## Blog + the four service pages (AI starter content)

- `/services/software`, `/services/cloud`, `/services/hardware`,
  `/services/network` — one page each, rendered by `pages/ServiceDetail.jsx`.
- `/blog/:slug` — full blog posts (`pages/BlogPost.jsx`).
- The starter text is AI-generated and lives in `src/data/aiContent.js`. It is
  only a **fallback**: the site shows the database when it has content.

### Replacing the AI content (Admin Console → `/admin`)

1. In the Supabase SQL Editor run `supabase/schema.sql` (fresh installs), then
   **`supabase/002_cms_content.sql`** (adds the `service_pages` table and an
   `is_placeholder` flag on `blogs`; safe to re-run).
2. Create an admin user (Supabase → Authentication → Users → Invite user) and
   sign in at `/admin`.
3. **Blogs** / **Service Pages** tabs → *Import starter posts/pages* copies the
   AI drafts into the database. Edit any item and save: it goes live
   immediately and loses its "AI placeholder" badge. Delete posts you don't
   want; on a service page, the bin icon reverts it to the starter copy.
4. Text format in the editors: blank line = paragraph, `## Heading`,
   `- bullet`, `**bold**`. On service pages, list fields use one line per item
   (`Title | Description`).

## Setup

```bash
npm install
cp .env.example .env   # fill in your Supabase project values
npm run dev
```

## Supabase

1. Create a project at supabase.com.
2. Run `supabase/schema.sql` in the SQL Editor.
3. Copy your Project URL and anon public key into `.env`.
4. (Optional) Seed `blogs` and `projects` — both pages render a clean empty
   state if you skip this.

## Content

Real company content (press, projects, certifications, team, contact, socials)
lives in **`src/data/siteContent.js`** — edit text there and pages update.
Photos and logos are in `public/images/{press,projects,certifications}/`.
`components/ImageSlider.jsx` is the shared swipe/arrow/keyboard slider used on
`/press` and `/projects`. All text is rendered as HTML (never baked into
images) for SEO; organisation details are also in `index.html` as JSON-LD.

## Structure

```
src/
  components/
    Navbar.jsx            Fixed kinetic nav, dropdowns, mobile drawer
    Footer.jsx              4-column kinetic footer
    FloatingActions.jsx      WhatsApp + Quick Contact FABs
    QuickContactModal.jsx    Paper-styled scheduler, writes to `meetings`
  pages/
    Home.jsx                 Kinetic hero + marquee + paper academy section
    AboutUs.jsx               Leadership, certs, patents, press
    BlogAndFAQ.jsx            Blog feed (likes/comments) + FAQ accordion
    Works.jsx                 Enterprise (kinetic) vs student (paper) toggle
  lib/
    supabaseClient.js
supabase/
  schema.sql                meetings, blogs, blog_comments, projects
```

`/services` and `/contact` are routed to `Home.jsx` as placeholders in
`App.jsx` — build `ServicesPage.jsx` and `ContactPage.jsx` following the
same layer-per-audience pattern and swap them into the router.
