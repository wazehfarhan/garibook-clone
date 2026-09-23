# React + Vite — Garibook Homepage Clone

A pixel-focused recreation of the Garibook homepage (garibook.com) built
with **React.js + JavaScript + Vite**, with GSAP scroll/entrance
animations and a fully responsive layout.

## Features

- Component-based homepage: Navbar, Hero (typing headline), BookingForm
  (Car / Airport rental tabs), Stats (animated counters), Services
  (Rides / Business / Club / VMS tabs), Freedom, More Than Miles,
  Booking-to-Arrival gallery, Smart Driver, Featured By, Testimonials
  slider, Blog, Download App, Footer
- GSAP animations: hero entrance timeline, Services cards stagger
  scroll-reveal, Booking-to-Arrival gallery stagger reveal (plus AOS
  fade/zoom reveals across sections)
- Interactive states: tabs, hover lift on cards, dropdowns, radio
  toggles, testimonial slider arrows, focus-visible outlines,
  mobile hamburger menu
- Responsive: desktop / tablet / mobile breakpoints (1200 / 1024 /
  992 / 768 / 576px), fluid grids and stacked layouts on small screens

## Prerequisites

- Node.js 20+ and npm

## Setup / Run

```bash
npm install   # or: npm ci
npm run dev   # start dev server (http://localhost:5173)
npm run build # production build -> dist/
npm run preview # preview the production build
npm run lint  # eslint check
```

## Project structure

```
src/
  main.jsx            # entry: mounts App, imports global CSS
  App.jsx             # renders Home page
  pages/Home.jsx      # page composition (all sections in order)
  components/         # one component per section (Navbar, Hero,
                      # BookingForm, Stats, Services, ...)
  styles/             # globals, navbar, hero, bookingform,
                      # services, sections, blocks2, footer
public/assets/images/ # static imagery (cars, services, blogs, icons)
```

## GSAP implementation

- `Hero.jsx` — entrance timeline (`gsap.timeline`): title slides up +
  fades in, right column follows with overlap.
- `Services.jsx` — `gsap.from` + `ScrollTrigger` stagger on
  `.service-card-col` (`top 85%`, `once: true`).
- `BookingArrival.jsx` — `gsap.from` + `ScrollTrigger` scale/fade
  stagger on `.ba-grid-item` gallery tiles.

## Deployment

- `vite.config.js` uses `base: './'` so built asset URLs are relative
  and work from any sub-path.
- GitHub Pages: `.github/workflows/deploy-pages.yml` builds (`npm ci`
  + `npm run build`) and deploys `dist/` on every push to `main`.
  Repo Settings → Pages → Source must be **GitHub Actions**.
- Live demo hosts (Vercel / Netlify) work too — just build and serve
  `dist/`.

## Notes

- Reference: garibook.com (recreated for assessment purposes).
- `node_modules/`, `dist/`, `.env` files are git-ignored and must not
  be committed.
