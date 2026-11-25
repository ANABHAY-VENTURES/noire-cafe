# NOIRÉ Café — Coffee. Crafted Slowly.

> A minimalist, modern sanctuary inspired by Swiss editorial design, contemporary luxury branding, and independent specialty coffee culture.

[![React](https://img.shields.io/badge/React-18.3-30251F?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-899078?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-BC8B62?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-30251F?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-899078?style=flat)](LICENSE)

---

## ☕ Visual Identity & Design System

The visual identity is modeled after Swiss editorial restraint and luxury Scandinavian hospitality:

- **Warm Ivory Background**: `#F5F1E8` (Light: `#FAF7F2`, Dark: `#EAE3D6`)
- **Deep Espresso Typography**: `#30251F` (Dark: `#1C1612`, Soft: `#4A3B32`)
- **Muted Olive Accents**: `#899078` (Light: `#A4AB94`, Dark: `#687056`)
- **Caramel Highlights**: `#BC8B62` (Light: `#D4A882`, Dark: `#9E6E45`)
- **Display Headings**: *Cormorant Garamond* (Editorial Serif, 300/400/500/600)
- **Body & Metadata**: *Manrope* (Modern Geometric Sans) + Monospace numerals

---

## 🏛 Architecture & Tech Stack

- **Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom luxury easing curves
- **Motion & Micro-Interactions**: [Framer Motion](https://www.framer.com/motion/) for view transitions and drawers
- **Scroll Synchronization**: [Lenis](https://lenis.darkroom.engineering/) smooth inertia scrolling + [GSAP](https://greensock.com/) & ScrollTrigger
- **Icons**: [Lucide React](https://lucide.dev/)
- **Cart Management**: Custom React `CartContext` with `localStorage` persistence and INR (`₹`) formatting

---

## 📋 Features Overview

1. **Brand Preloader**: Full-screen letter-by-letter reveal of *N-O-I-R-É* with rotating monogram seal and animated progress bar (respects `prefers-reduced-motion`).
2. **Cinematic Hero**: Large editorial headline *"Coffee. Crafted Slowly."*, real-time extraction metrics ticker, and magnetic exploration button.
3. **Our Story & Philosophy**:
   - *Section 1: Our Story*: Split-screen lifestyle photography with vertical parallax and oversized headline *"More than just a cup."*
   - *Section 2: Our Philosophy*: The three-pillar code (*Quality without compromise*, *Crafted with intention*, *A space to slow down*).
4. **The Craft Sequence & Experience**:
   - *Section 3: The Craft*: 4-phase sequence (*The Beans*, *The Process*, *The Brew*, *The Moment*) with laboratory cupping parameters.
   - *Section 4: The Sanctuary*: Full-width interior photography with *"Stay a little longer"* overlay and smooth navigation to coordinates.
5. **Interactive Curated Menu & Cart**:
   - 7 filtered categories (*All*, *Espresso*, *Signature Coffee*, *Cold Brew*, *Tea & Matcha*, *Bakery*, *Desserts*).
   - Real-time search query and hot/iced temperature filters.
   - Slide-over `CartDrawer` with quantity controls, item deletion, 5% hospitality GST breakdown, and dynamic INR total.
   - Demo `CheckoutModal` supporting Table Service (Dine-in) vs. Curated Takeaway, barista notes, and instant receipt generation.
6. **Asymmetric Atmosphere Gallery**: 8-photo editorial masonry grid with full-screen lightbox, caption bar, and keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`).
7. **Coordinates & Visit Us**: Centralized demo contact parameters (`contactConfig.ts`), 1-click address copy, opening hours schedule, social links, and interactive Google Maps embed.
8. **Final CTA & Footer**: *"Make room for a little ritual"* full-width banner with magnetic button and minimal Swiss footer with newsletter dispatch and smooth back-to-top.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or later (`v24.x` recommended)
- **npm**: `v9.x` or later

### Installation

```bash
# Clone the repository
git clone https://github.com/Souvik-Das-23/noire-cafe.git

# Enter project directory
cd noire-cafe

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 🛠 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite development server with HMR |
| `npm run build` | Runs TypeScript compilation (`tsc -b`) and bundles production assets via Vite |
| `npm run preview` | Serves the production build locally for verification |

---

## 🔍 Technical SEO & Production-Readiness Audit

### 1. SEO & Metadata Verification
- **Page Title**: `NOIRÉ Café — Coffee. Crafted Slowly. | Specialty Coffee Zürich`
- **Canonical URL**: `<link rel="canonical" href="https://noirecafe.ch/" />`
- **Open Graph & Twitter Cards**: Configured in `index.html` with full image preview, description, and metadata.
- **Sitemap & Robots**:
  - `public/robots.txt` granting crawling access and pointing to `sitemap.xml`.
  - `public/sitemap.xml` listing primary routes and priority ratings.
- **JSON-LD Schema**: Implemented `schema.org` `CafeOrCoffeeShop` and `WebSite` structured data covering address, geocoordinates, opening hours, cuisine, and social profiles.

### 2. Performance & Code Splitting
- **Vite Rollup Chunking**: Splitting vendor modules (`vendor-react`, `vendor-motion`, `vendor-gsap`, `vendor-lenis`, `vendor-icons`) to prevent 500kB monolithic bundle warnings and enable long-term browser caching.
- **Image Optimization**: Defined aspect ratios (`aspect-[16/10]`, `aspect-[3/4]`, `aspect-square`) preventing Cumulative Layout Shifts (CLS). Hero image marked with `fetchPriority="high"` for optimal LCP.
- **Font Delivery**: DNS preconnect and prefetch headers to Google Fonts with `display=swap`.

### 3. Accessibility & Usability (WCAG 2.1 AA)
- **Keyboard Navigation**: Skip-to-content landmark link (`#main-content`) accessible via Tab.
- **Focus Rings**: High-contrast caramel `:focus-visible` styling (`outline: 2px solid #BC8B62; outline-offset: 3px`).
- **Modal Accessibility**: Modals equipped with `role="dialog"`, `aria-modal="true"`, labelled by titles, and `Escape` key close listeners.
- **Reduced-Motion Support**: Disables custom cursor, simplifies Lenis smooth scrolling, and disables CSS animations if `prefers-reduced-motion` is detected.

---

## ☁️ Deployment

### Vercel Deployment

This project includes a production-ready `vercel.json` with SPA rewrites and enterprise security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and immutable cache headers for static assets).

```bash
# Deploy with Vercel CLI
npm install -g vercel
vercel
```

Or connect the GitHub repository on [vercel.com](https://vercel.com) — framework detection is preset to **Vite**.

### Netlify Deployment

A `netlify.toml` file is provided in the repository with build configurations and SPA redirect rules.

```bash
# Build command
npm run build

# Publish directory
dist
```

---

## 📄 License

Distributed under the [MIT License](LICENSE).
© 2026 NOIRÉ Café Zürich. Crafted with slow reverence.
