# Yline Shipping — Web

React + TypeScript + Tailwind CSS web port of the Yline Shipping mobile app's home screen: a B2B shipping/freight-forwarding portal (sea, air, road & courier freight, warehousing, rentals, jobs, and a company directory).

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- [Framer Motion](https://motion.dev) for animation
- [lucide-react](https://lucide.dev) for icons
- Fonts: Inter (body), Poppins (headings), Chewy (CTA), loaded from Google Fonts

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

## Structure

```
src/
  components/   # Navbar, Splash, HeroCarousel, ServiceGrid, FeaturedCompanies, ListCompanyCTA, PartnersMarquee, Footer
  data/         # services, dummy featured-companies, nav links
public/images/  # banners, service icons, splash art (copied from the Flutter app's assets/)
```

There is no backend — `src/data/companies.ts` mirrors the shape of the mobile app's `CompanyModel` dummy data. Wire up a real API there when one exists.
# ylinesshipping
