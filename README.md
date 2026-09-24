# Garibook Homepage Clone

A pixel-focused recreation of the [Garibook](https://garibook.com) homepage built with **React 19 + Vite (JavaScript/JSX)**, animated with **GSAP** (`ScrollTrigger`) and **AOS**, and fully responsive from desktop down to mobile.

Built as an assessment project. All layout, copy, imagery and animation timings were matched against the live site.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Features](#features)
- [Quick start](#quick-start)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Component responsibilities](#component-responsibilities)
- [Animation architecture](#animation-architecture)
  - [GSAP animations](#gsap-animations)
  - [AOS reveals](#aos-reveals)
  - [Animations that are *not* GSAP](#animations-that-are-not-gsap)
- [Design decision: one animation owner per element](#design-decision-one-animation-owner-per-element)
- [Accessibility](#accessibility)
- [Responsive behaviour](#responsive-behaviour)
- [Assets and fonts](#assets-and-fonts)
- [Deployment](#deployment)
- [Known limitations](#known-limitations)
- [Notes](#notes)

---

## Tech stack

| Layer | Choice | Version |
| --- | --- | --- |
| UI library | React | `^19.2.8` |
| DOM renderer | React DOM | `^19.2.8` |
| Build tool | Vite | `^8.3.0` |
| React plugin | `@vitejs/plugin-react` | `^6.1.1` |
| Animation | GSAP (+ ScrollTrigger) | `^3.15.0` |
| Scroll reveals | AOS | `^2.3.4` |
| Icons | `lucide-react` | `^1.47.0` |
| Linting | ESLint (+ react-hooks, react-refresh) | `^10.10.0` |

**Runtime**: Node.js 20+ and npm (the GitHub Actions workflow pins Node 20).

**No UI framework** is used — no Bootstrap, Tailwind, or component library. All styling is hand-written CSS; only the *class names* mirror the original site's Bootstrap-derived markup.

---

## Features

- **14 sections**, one React component each: Navbar, Hero, BookingForm, Stats, Services, Freedom, More Than Miles, Booking-to-Arrival, Smart Driver, Featured By, Testimonials, Blog, Download App, Footer.
- **Animated hero** — a self-typing headline that loops through 3 phrases with a blinking CSS caret.
- **Booking form** — Car Rental / Airport Rental tabs, two custom dropdowns, and radio groups.
- **Animated statistics** — 4 counters that roll up on scroll using `requestAnimationFrame` with an `easeOutExpo` curve.
- **Services tabs** — Rides / Garibook Business / Garibook Club / VMS with a GSAP cross-fade.
- **Testimonials slider** — arrow-driven smooth scrolling, 4 testimonials.
- **Animation policy** — CSS for simple effects, AOS for one-shot scroll reveals, GSAP only where sequencing, staggering, or simultaneous transitions genuinely require it.
- **Accessibility** — `alt` on 100% of images, ARIA roles on tabs/dropdowns, labelled icon buttons, and a global `:focus-visible` ring.
- **Responsive** — 19 media queries across 5 breakpoints (1200 / 1024 / 992 / 768 / 576 px).
- **Auto-deployed** — GitHub Actions builds and publishes `dist/` to GitHub Pages on every push to `main`.

---

## Quick start

```bash
# 1. Clone
git clone https://github.com/wazehfarhan/garibook-clone.git
cd garibook-clone

# 2. Install (Node 20+)
npm install

# 3. Start the dev server
npm run dev
# → http://localhost:5173
```

Production build and preview:

```bash
npm run build     # outputs to dist/
npm run preview   # serves dist/ locally
```

---

## Available scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `vite` | Dev server with HMR at `http://localhost:5173` |
| `npm run build` | `vite build` | Production build into `dist/` |
| `npm run preview` | `vite preview` | Serve the built `dist/` locally |
| `npm run lint` | `eslint .` | Run ESLint over the project |

Current build output: **8.22 kB gzip CSS + 129.95 kB gzip JS** (1,908 modules).

---

## Project structure

```
garibook-clone/
├── index.html                          # Vite entry HTML (preloads 3 hero-adjacent images)
├── vite.config.js                      # base: './', @vitejs/plugin-react
├── eslint.config.js                    # flat config: js.recommended + react-hooks + react-refresh
├── package.json
├── .github/workflows/deploy-pages.yml  # CI: npm ci → build → deploy dist/ to Pages
│
├── public/
│   ├── assets/images/                  # logos, car SVGs, section imagery, blog thumbnails
│   │   ├── cars/                       #   4 service icons (intercity, rideshare, airport, hourly)
│   │   ├── services/                   #   gallery + "More Than Miles" imagery
│   │   └── blog/                       #   3 blog thumbnails
│   ├── fonts/                          # Uncut Sans (4× woff2), Montserrat (variable),
│   │   └── montserrat/                 #   Li Ador Noirrit (4× ttf, for Bengali text)
│   └── garibook.png                    # favicon
│
└── src/
    ├── main.jsx                        # entry: createRoot + StrictMode, imports aos.css + 8 stylesheets
    ├── App.jsx                         # renders <Home />
    │
    ├── pages/
    │   └── Home.jsx                    # composes all 14 sections in order; AOS.init()
    │
    ├── components/                     # 14 section components + 1 shared component
    │   ├── Btn.jsx                     # ← the only shared/reusable component
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── BookingForm.jsx
    │   ├── Stats.jsx
    │   ├── Services.jsx
    │   ├── FreedomSection.jsx
    │   ├── MoreThanMiles.jsx
    │   ├── BookingArrival.jsx
    │   ├── SmartDriver.jsx
    │   ├── FeaturedBy.jsx
    │   ├── TestimonialSection.jsx
    │   ├── BlogSection.jsx
    │   ├── DownloadApp.jsx
    │   └── Footer.jsx
    │
    └── styles/
        ├── globals.css                 # focus ring, @font-face, design tokens, buttons, helpers
        ├── navbar.css
        ├── hero.css
        ├── bookingform.css
        ├── services.css                # Services + Freedom + More Than Miles
        ├── sections.css                # Booking-Arrival + Smart Driver + Featured By
        ├── blocks2.css                 # Testimonials + Blog + Download CTA
        └── footer.css
```

**CSS loading rule:** every stylesheet is imported **once, globally, in `main.jsx`**. Components do not import their own CSS — the single exception is `Navbar.jsx`, which also imports `navbar.css`.

**Asset path rule:** images are referenced as `` `${import.meta.env.BASE_URL}assets/images/...` `` in 9 component files, so they keep working when the app is served from a sub-path such as `https://<user>.github.io/<repo>/`.

---

## Component responsibilities

| File | Responsibility |
| --- | --- |
| `main.jsx` | Mounts `<App />` into `#root` inside `<React.StrictMode>`; imports `aos/dist/aos.css` and all 8 stylesheets. |
| `App.jsx` | Imports and renders `<Home />`. Nothing else. |
| `pages/Home.jsx` | The only page. Renders the 14 sections in order inside `<main>`, with `Navbar` and `Footer` outside it; runs `AOS.init()`. |
| `Navbar.jsx` | Sticky nav that activates past `window.scrollY > 90`; 6 links; mobile hamburger with body scroll-lock and a click-to-close backdrop. |
| `Hero.jsx` | Self-typing headline (custom `useTypingText` hook) + the page's only `<h1>` + GSAP entrance timeline. |
| `BookingForm.jsx` | Car Rental / Airport Rental tabs; contains the local `Dropdown` and `Radios` sub-components and the `CAR_OPTIONS` / `PICKUP_OPTIONS` lists. |
| `Stats.jsx` | 4 statistic counters; local `useCountUp` hook + `CounterItem`, driven by an `IntersectionObserver`. |
| `Services.jsx` | 4-tab services section. Contains `RIDE_CARDS` (4 cards) and `splitPanes` (Business / Club / VMS); owns **2** GSAP animations and the pane cross-fade logic. |
| `FreedomSection.jsx` | "Freedom in Every Journey" — 1 image + 3 items (Choose the Car / Driver / Fare). |
| `MoreThanMiles.jsx` | "More Than Miles" — 3 cards (Airport Rentals, Family Trips, Long Tours). |
| `BookingArrival.jsx` | "From Booking to Arrival" — 5-tile asymmetric gallery; owns **1** GSAP animation; lazy-loads its images and removes any tile whose image fails. |
| `SmartDriver.jsx` | "Be a Smart Driver — 0% Commission, 100% Freedom" banner with app screenshot and Play Store link. |
| `FeaturedBy.jsx` | "Featured by Top News Platforms" — 5 press cards. |
| `TestimonialSection.jsx` | "Our Passengers Speak For Us" — 4 testimonial cards with a smooth-scroll arrow slider. |
| `BlogSection.jsx` | "Beyond Destinations" — 3 blog cards (Bengali titles) + "Show All Blogs". |
| `DownloadApp.jsx` | Download-the-app CTA band. |
| `Footer.jsx` | 3 link columns + contacts, 4 inline-SVG social icons (local `SocialIcon`), partner rows, dynamic copyright year. |
| **`Btn.jsx`** | **The shared component**, used by 8 files. Props: `value`, `url`, `className`, `icon`. Renders an `<a>` with a text label and an optional arrow SVG; automatically adds `target="_blank" rel="noopener noreferrer"` for external `http(s)` URLs. |

**Data lives next to its component** as module-level constants (`RIDE_CARDS`, `COUNTERS`, `TESTIMONIALS`, `BLOGS`, `PLATFORMS`, `FREEDOM_ITEMS`, `MILES_ITEMS`, `ARRIVAL_IMAGES`, `NAV_LINKS`, `FOOTER_WIDGETS`, `SOCIALS`) rather than being passed down as props.

---

## Animation architecture

Three animation systems coexist, each with a clearly bounded job:

| System | Scope | Used for |
| --- | --- | --- |
| **CSS** (`@keyframes` + `transition`) | 3 keyframes, ~20 transitions | Caret blink, moving skyline, navbar slide-in, hover states |
| **AOS** | 16 `data-aos` elements | One-shot fade / zoom / flip reveals on scroll |
| **GSAP** (+ ScrollTrigger) | **4 animations in 3 files** | Sequences, staggers, and simultaneous enter/exit transitions |

The rule that keeps them from colliding: **any DOM node animated by GSAP has no `data-aos` attribute** (see [Design decision](#design-decision-one-animation-owner-per-element)).

### GSAP animations

All four animations live in `Hero.jsx`, `Services.jsx` and `BookingArrival.jsx`. Every one is wrapped in `gsap.context()` and torn down with `ctx.revert()` on unmount.

#### 1. Hero entrance timeline — `src/components/Hero.jsx`

| | |
| --- | --- |
| **Element** | `.hero-title-container` and `.hero-right`, via refs (`titleRef`, `rightRef`) |
| **Type** | `gsap.timeline({ defaults: { ease: "power3.out" } })` + two chained `.from()` tweens |
| **Title tween** | `y: 60`, `opacity: 0`, `duration: 1` |
| **Right-column tween** | `y: 40`, `opacity: 0`, `duration: 0.8`, positioned at `"-=0.55"` |
| **ScrollTrigger** | No — plays once on mount |
| **Cleanup** | `gsap.context(..., sectionRef)` → `ctx.revert()` |

The `"-=0.55"` overlap means the right column starts 0.55 s *before* the title finishes, so the two halves of the hero read as one motion instead of two waiting steps.

#### 2. Services cards scroll reveal — `src/components/Services.jsx`

| | |
| --- | --- |
| **Element** | `.service-card-col` (4 cards) — a selector resolved *inside* `sectionRef` because the context is scoped: `gsap.context(fn, sectionRef)` |
| **Type** | `gsap.from()` + `ScrollTrigger` |
| **Values** | `y: 48`, `opacity: 0`, `duration: 0.7`, `ease: "power3.out"`, `stagger: 0.12` |
| **ScrollTrigger** | `trigger: ".service-cards-row"`, `start: "top 85%"`, `once: true` (no `end`) |
| **On complete** | `gsap.set(..., { clearProps: "opacity,transform" })` |
| **Cleanup** | `ctx.revert()` |

#### 3. Services tab cross-fade — `src/components/Services.jsx` (inside `switchTab`)

| | |
| --- | --- |
| **Element** | The outgoing and incoming panes, located with `stackRef.current.querySelector('[data-pane="..."]')` |
| **Type** | `gsap.killTweensOf()` + two `gsap.set()` calls + `gsap.timeline().to().to()` at position `0` (simultaneous) |
| **Start state** | incoming: `opacity: 0`, `y: 16`, `zIndex: 2` · outgoing: `pointerEvents: "none"`, `zIndex: 1` |
| **Tweens** | outgoing `opacity: 0`, `duration: 0.3`, `ease: "power1.out"` · incoming `opacity: 1`, `y: 0`, `duration: 0.4`, `ease: "power2.out"` |
| **ScrollTrigger** | No |
| **On complete** | Re-hide the outgoing pane, `clearProps: "opacity,transform,zIndex,pointerEvents"` on the incoming pane, then run any queued tab click |
| **Reduced motion** | `window.matchMedia("(prefers-reduced-motion: reduce)")` short-circuits to an instant swap |

Both panes animate at the same time, so the section never shows a blank frame. Clicks that land mid-transition are stored in a ref (last one wins) and replayed in `onComplete` instead of being dropped.

#### 4. Booking-to-Arrival gallery reveal — `src/components/BookingArrival.jsx`

| | |
| --- | --- |
| **Element** | The 5 `.ba-grid-item` tiles, collected from `gridRef` as real DOM nodes (`Array.from(grid.querySelectorAll(...))`) |
| **Type** | `gsap.from()` + `ScrollTrigger` |
| **Values** | `scale: 0.92`, `opacity: 0`, `duration: 0.7`, `ease: "power3.out"`, `stagger: 0.1` |
| **ScrollTrigger** | `trigger: grid`, `start: "top 85%"`, `once: true` (no `end`) |
| **On complete** | `gsap.set(items, { clearProps: "opacity,transform" })` |
| **Cleanup** | `gsap.context(..., sectionRef)` → `ctx.revert()` |

### AOS reveals

Initialised once in `pages/Home.jsx`:

```js
AOS.init({ once: true, duration: 600, easing: "ease" });
```

**16 `data-aos` elements** use three animation types — `fade-up` (12), `zoom-in` (3), `flip-right` (1). Durations are `400` or `600`; delays range from `50` to `1350`.

| Section | Elements | Types | Delays |
| --- | --- | --- | --- |
| Stats | 4 counters, heading | `zoom-in`, `fade-up` | 750–1350 |
| Smart Driver | heading, banner, screenshot | `fade-up`, `zoom-in` | 200 |
| Services | heading, tab bar | `fade-up` | 200 |
| More Than Miles | heading, 3 cards | `fade-up` | 200 / 300 / 400 |
| Freedom | heading, image, 3 items | `fade-up`, `zoom-in` | 200 / 400 / 600 |
| Booking-Arrival | heading, button column | `fade-up`, `flip-right` | 200 / 400 |
| Featured By | whole section | `fade-up` | 50 |
| Blog | whole section | `fade-up` | 200 |

Deliberately **excluded** from AOS, because GSAP owns them: the Hero, the 4 Services tab panes, and the `.ba-grid-item` gallery tiles.

### Animations that are *not* GSAP

Worth knowing so they aren't misattributed:

| Effect | Where | Implementation |
| --- | --- | --- |
| Typing headline | `Hero.jsx` | Custom `useTypingText` hook — 60 ms per character, 2 s pause, loops 3 phrases |
| Blinking caret | `hero.css` | `animation: blink 1s step-end infinite` |
| Moving city skyline | `hero.css` | `animation: moveCity 30s linear infinite`, `translateX(0 → -25%)` |
| Driving sedan | `hero.css` | Animated GIF used as a background image |
| Navbar slide-in | `navbar.css` | `animation: slideDown 0.5s ease-out` |
| Statistic counters | `Stats.jsx` | `requestAnimationFrame` + `easeOutExpo` (`1 - 2^(-10p)`) over 5 s, started by an `IntersectionObserver` at `threshold: 0.3` |
| Testimonial slider | `TestimonialSection.jsx` | `track.scrollBy({ behavior: "smooth" })` |

---

## Design decision: one animation owner per element

The most interesting problem in this project was a conflict between two animation libraries, and the fix generalised into a rule applied throughout the codebase.

### The problem

The Booking-to-Arrival gallery tiles were intermittently **stuck invisible** — they looked like broken images.

### The cause

Each `.ba-grid-item` had **both** a `data-aos` attribute **and** a GSAP scroll reveal. Both libraries animate the same two properties (`opacity` and `transform`) by writing **inline styles**:

- AOS marks the element `aos-init` with inline `opacity: 0` / `transform`, then adds `.aos-animate` on scroll to write the end values.
- GSAP's `gsap.from()` also writes inline `opacity: 0` / `transform` on that node the moment it runs.

An element has a **single inline-style slot**. Whichever library writes last wins, and neither is aware of the other — so AOS's pre-animate `opacity: 0` could survive as the final state.

### The fix

1. **One owner per node** — `data-aos` was removed from every element GSAP animates. The gallery tiles now have no AOS attribute; AOS keeps only the section heading and the CTA button, which GSAP never touches.
2. **Refs instead of global selectors** — GSAP targets nodes collected from a ref (`gridRef`), and the whole animation sits inside `gsap.context(..., sectionRef)`.
3. **`clearProps` on completion** — `gsap.set(items, { clearProps: "opacity,transform" })` leaves the elements with **zero inline styles** once the animation ends, so CSS hover states still work.
4. **A CSS fallback** — so the tiles always paint even if the JS reveal never runs:

```css
/* sections.css */
.ba-grid-item {
  min-width: 0;
  opacity: 1;
  transform: none;
}
```

### The related tab-switch fix

The same class of problem appeared in the Services tabs. Hidden panes originally used `display: none`, so switching tabs changed the section height — which caused a page jump, fired `ScrollTrigger.refresh()`, and re-animated neighbouring sections. There was also a one-frame "ghost flash" where the outgoing pane briefly snapped back to full opacity.

Both were solved by keeping **all four panes mounted in a single CSS grid cell**:

```css
/* services.css */
.services-panes { display: grid; }
.services-panes .tab-pane-inner {
  display: block;      /* beats the UA's [hidden] { display: none } */
  grid-area: 1 / 1;    /* every pane shares one track */
}
.services-panes .tab-pane-inner[hidden] {
  visibility: hidden;  /* keeps intrinsic sizing — no display override */
  pointer-events: none;
  user-select: none;
}
```

Because `grid-area: 1 / 1` stacks every pane into the same track, the container height always equals the **tallest** pane: constant height, no jump, no `ScrollTrigger.refresh()`. `visibility` (rather than `display`) keeps the panes' intrinsic size so the track never collapses.

The ghost flash is handled by a `useLayoutEffect` that strips GSAP's leftover inline styles from hidden panes — it runs after React commits the `hidden` attribute but **before the browser paints**, so the flash never reaches the screen.

---

## Accessibility

What is actually implemented:

| Feature | Detail |
| --- | --- |
| **Alt text** | 11 `<img>` elements, 11 `alt` attributes — **100% coverage**. One is intentionally empty (`alt=""`) for a decorative icon. |
| **Tab semantics** | `role="tablist"` / `role="tab"` / `role="tabpanel"` with `aria-selected` on both the booking-form tabs and the services tabs. |
| **Dropdown semantics** | `aria-expanded` on each toggle; the option list uses `role="listbox"`. |
| **Labelled icon buttons** | `aria-label` on the testimonial and featured-by arrows, the hamburger toggle, the social links and both brand logos. |
| **Decorative SVGs hidden** | `aria-hidden="true"` on the button arrow and the footer social icons. |
| **Keyboard focus** | A global focus ring so keyboard users can see where they are: `:where(a, button, [role="tab"], input, select, textarea):focus-visible` with a 3 px outline and 2 px offset. |
| **Reduced motion** | The services tab cross-fade is skipped (instant swap) when `prefers-reduced-motion: reduce` matches. |
| **Semantic landmarks** | `<main>`, `<nav>`, 11 `<section>` elements, `<footer>`, one `<h1>` (in the Hero), `<ul>`/`<li>` for nav, stats and footer lists. |
| **Form controls** | Native `<input type="radio">` and `<button>` elements; custom styling layers on top rather than replacing them. |

**Known gaps** — stated for accuracy rather than glossed over:

- There is **no CSS `@media (prefers-reduced-motion)` block**. The check exists only in JavaScript, and only for the services tab transition — the AOS reveals, CSS keyframes and GSAP scroll reveals still run.
- There is **no `<header>` element**; the navbar is a `<div>` containing a `<nav>`.
- The Featured-By slider arrows are rendered with no click handler, so the "Next" button is inert.
- Tab panels are not wired to their tabs with `aria-controls` / `id`, and arrow-key navigation between tabs is not implemented.

---

## Responsive behaviour

19 `@media` queries across 7 stylesheets:

| Breakpoint | Files |
| --- | --- |
| `1200px` | `navbar.css` |
| `1024px` | `blocks2.css`, `sections.css` |
| `992px` | `navbar.css`, `hero.css` (×2), `bookingform.css`, `services.css`, `sections.css`, `blocks2.css` |
| `768px` | `globals.css`, `services.css` (×2), `sections.css`, `blocks2.css` |
| `576px` | `hero.css`, `services.css`, `sections.css`, `blocks2.css` |

Layouts move from two-column to stacked grids, the navbar collapses into a hamburger menu, and the hero headline reserves a fixed two-line height (`164px` with `overflow: hidden`) so the section never resizes while the text types itself.

---

## Assets and fonts

**Images** — `public/assets/images/` holds the logos (colour + white), the 4 car/service icons, the gallery and "More Than Miles" photography, the Smart Driver app screenshot, the animated sedan GIF, the skyline SVG, and 3 blog thumbnails. Most are `.webp`/`.svg`.

**Fonts** — self-hosted in `public/fonts/`, matching the files the live site serves, all with `font-display: swap`:

| Family | Files | Used for |
| --- | --- | --- |
| Uncut Sans | 4 × `.woff2` (Regular/Medium/SemiBold/Bold) | UI and body text |
| Montserrat | 1 variable `.woff2` (`100 900`) | Headings |
| Li Ador Noirrit | 4 × `.ttf` (Light → Bold) | Bengali blog titles |

**Path handling** — `vite.config.js` sets `base: './'`, and components build image URLs with `import.meta.env.BASE_URL`. Together these mean the built site works from any sub-path, not just a domain root.

---

## Deployment

### GitHub Pages (already wired up)

`.github/workflows/deploy-pages.yml` runs on every push to `main`:

1. Checkout → setup Node 20 (with npm cache)
2. `npm ci`
3. `npm run build`
4. Upload `dist/` as a Pages artifact
5. Deploy with `actions/deploy-pages@v4`

**Required repo setting:** Settings → Pages → Source must be set to **GitHub Actions**.

### Any static host (Vercel / Netlify / S3)

Build and serve the `dist/` folder — the relative `base` means no extra configuration is needed:

```bash
npm run build
# deploy the generated dist/ directory
```

---

## Known limitations

This is a front-end recreation of a single marketing page, so a few things are intentionally out of scope:

- **Single page only** — there is no router; `App.jsx` renders `Home` directly.
- **Static content** — all copy, testimonials, blog posts and stats are hard-coded constants. There is no API, backend, or persistence.
- **Placeholder links** — most navigation and footer links point to `#`. External links (app stores, contact email/phone) are real.
- **The booking form is not functional** — the dropdowns and radios hold local state, but the Search button does not submit anywhere.
- **The Featured-By slider arrows have no handlers** — the "Next" arrow does not scroll.
- **No automated tests** — there is no test runner or test files; `npm run lint` is the only check.
- **No code splitting** — everything ships in a single JS bundle. Only one image (`BookingArrival` gallery tiles) uses `loading="lazy"`.

---

## Notes

- **Reference:** [garibook.com](https://garibook.com) — recreated for assessment purposes. All branding, copy and imagery belong to their respective owners.
- **Attribution:** fonts and images are taken from the live site so the recreation matches the original; see the files in `public/`.
- `node_modules/`, `dist/` and `.DS_Store` are git-ignored and should not be committed.
- `src/` totals **3,528 lines across 26 files** — 18 JavaScript/JSX files (entry, app shell, page and 15 components) plus 8 stylesheets.
- Built with React's `<StrictMode>` enabled, which double-invokes effects in development — the `gsap.context()` / `ctx.revert()` cleanup in all three animated components is what keeps that safe.

---

**Author:** kazi Md Wazeh Ullah Farhan · **License:** MIT (see [LICENSE](LICENSE))
