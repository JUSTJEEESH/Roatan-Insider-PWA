# CLAUDE.md — Roatán Insiders PWA

## Project Overview

**Roatán Insiders** is a Progressive Web App (PWA) travel guide for Roatán, Honduras — the largest Bay Island and a top Caribbean cruise/dive destination. It serves as the definitive digital companion for cruise passengers, vacationers, long-term travelers, and expats.

The app provides a curated business directory, interactive maps, offline-first tools, and cruise-specific guides. Its killer feature is **offline capability** — tourists lose signal constantly on the island, and this app works without it.

**Owner:** Josh Green (Josh Green Design Studio), based in West Bay, Roatán  
**Status:** New build (replacing a previous iOS/Swift concept)

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14+ (App Router) | Static Site Generation (SSG) for performance |
| Language | TypeScript | Strict mode enabled |
| Styling | TailwindCSS v3+ | Mobile-first, utility classes only |
| Backend | Supabase | PostgreSQL, Auth, Storage, Realtime |
| Maps | Leaflet.js + OpenStreetMap | Free, offline-cacheable tiles |
| PWA | next-pwa (Workbox) | Service workers, precaching, manifest |
| Hosting | Netlify | CI/CD via GitHub, edge CDN |
| Search | FlexSearch | Client-side offline full-text search |
| State | Zustand | Lightweight client state (favorites, prefs) |
| Icons | Lucide React | Tree-shakeable, consistent |
| Analytics | Plausible or Umami | Privacy-first, no cookies |
| Images | Next/Image + WebP | Lazy loading, responsive srcsets |

---

## Project Structure

```
roatan-insiders/
├── CLAUDE.md                    # This file — project guide
├── README.md                    # Public readme
├── docs/                        # PRD and documentation
├── .env.local                   # Environment variables (git-ignored)
├── .claude/                     # Claude Code settings and commands
│   └── commands/                # Custom slash commands
├── next.config.js               # Next.js + PWA config
├── tailwind.config.ts           # Tailwind with custom theme
├── tsconfig.json                # TypeScript strict config
├── netlify.toml                 # Netlify build config
├── public/
│   ├── manifest.json            # PWA manifest
│   ├── sw.js                    # Service worker (generated)
│   ├── icons/                   # PWA icons (192, 384, 512)
│   ├── og/                      # Open Graph images
│   └── images/                  # Static images
├── app/
│   ├── layout.tsx               # Root layout (fonts, meta, nav)
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Tailwind imports + custom CSS
│   ├── (main)/                  # Main app route group
│   │   ├── explore/
│   │   │   ├── page.tsx         # Category grid
│   │   │   └── [category]/
│   │   │       └── page.tsx     # Category listing page
│   │   ├── listing/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Business detail page
│   │   ├── map/
│   │   │   └── page.tsx         # Full-screen map
│   │   ├── tools/
│   │   │   └── page.tsx         # Currency converter + tip calc
│   │   ├── saved/
│   │   │   └── page.tsx         # Favorites list
│   │   ├── guides/
│   │   │   ├── page.tsx         # Guides index
│   │   │   ├── cruise/
│   │   │   │   └── [port]/
│   │   │   │       └── page.tsx # Port-specific cruise guide
│   │   │   ├── areas/
│   │   │   │   └── [area]/
│   │   │   │       └── page.tsx # Area guide
│   │   │   └── essentials/
│   │   │       └── page.tsx     # Island essentials
│   │   └── search/
│   │       └── page.tsx         # Search results
│   └── api/                     # API routes (if needed for ISR)
├── components/
│   ├── ui/                      # Base primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Skeleton.tsx
│   ├── layout/
│   │   ├── BottomNav.tsx        # Mobile bottom tab bar
│   │   ├── Header.tsx           # Top header with search
│   │   ├── OfflineIndicator.tsx # Offline status banner
│   │   └── InstallPrompt.tsx    # PWA install prompt
│   ├── directory/
│   │   ├── BusinessCard.tsx     # Listing card component
│   │   ├── BusinessDetail.tsx   # Full detail view
│   │   ├── CategoryGrid.tsx     # Category selection grid
│   │   ├── FilterBar.tsx        # Filter chips and controls
│   │   └── SearchBar.tsx        # Search input with suggestions
│   ├── map/
│   │   ├── MapView.tsx          # Leaflet map wrapper
│   │   ├── MapMarker.tsx        # Custom category markers
│   │   └── MapPopup.tsx         # Pin tap preview card
│   └── tools/
│       ├── CurrencyConverter.tsx
│       └── TipCalculator.tsx
├── lib/
│   ├── supabase.ts              # Supabase client init
│   ├── types.ts                 # TypeScript interfaces
│   ├── constants.ts             # App constants, enums
│   ├── utils.ts                 # Utility functions
│   └── hooks/
│       ├── useFavorites.ts      # Favorites hook (localStorage + Supabase)
│       ├── useOffline.ts        # Online/offline detection
│       └── useLocation.ts       # GPS location hook
├── data/
│   ├── businesses.json          # Seed data: 80+ verified listings
│   ├── categories.json          # Category definitions
│   ├── areas.json               # Area definitions with descriptions
│   └── guides/                  # Static guide content
│       ├── cruise-mahogany-bay.json
│       ├── cruise-coxen-hole.json
│       ├── essentials.json
│       └── areas/               # Per-area guide content
└── store/
    └── favorites.ts             # Zustand favorites store
```

---

## Design System

### Colors

```
Primary (Deep Teal):    #0C6478  — Headers, CTAs, primary actions
Secondary (Ocean):      #0E8B9E  — Links, hover states, secondary elements
Accent (Caribbean):     #17B5CE  — Badges, highlights
Gold (Warm):            #F7A731  — Featured badges, stars, alerts
Coral (Sunset):         #E85D4A  — Errors, warnings, "Closing Soon"
Background (Sand):      #FAF9F6  — Page backgrounds
Card BG (Coconut):      #F5F0EB  — Card backgrounds
Body Text (Driftwood):  #4A5568  — Body copy
Headlines (Charcoal):   #1A1A2E  — Headlines, high emphasis
Info (Sea Foam):        #E6F2F7  — Info banners, category backgrounds
```

### Typography

- **Display/Headings:** Poppins (600, 700 weight)
- **Body/UI:** Inter (400, 500 weight)
- **Fallback:** system-ui, -apple-system, sans-serif
- **Base size:** 16px on mobile and desktop

### Component Standards

- All interactive elements: minimum 44x44px touch target
- Border radius: 12px for cards, 8px for buttons, full for pills/badges
- Shadows: subtle, warm-toned (no harsh black shadows)
- Transitions: 200ms ease-out for interactions
- Skeleton loading states for all data-dependent components

### Bottom Navigation (Mobile)

5 tabs, always visible, fixed to bottom:
1. **Home** (Home icon) — Landing page with featured/search
2. **Explore** (Grid icon) — Category grid browser
3. **Map** (MapPin icon) — Full-screen interactive map
4. **Tools** (Wrench icon) — Currency converter, tip calculator
5. **Saved** (Heart icon) — Favorites list with item count badge

On desktop (>768px): Convert to sidebar navigation.

---

## Business Data Schema

Every business listing follows this TypeScript interface:

```typescript
interface Business {
  id: string;                    // UUID
  slug: string;                  // URL-friendly: "coconut-tree-divers"
  name: string;                  // "Coconut Tree Divers"
  description: string;           // 100-200 words
  insiderTip: string | null;     // "Ask for the off-menu coconut shrimp"
  category: Category;            // 'eat' | 'drink' | 'dive' | 'tours' | 'shop' | 'stay' | 'rentals' | 'transport' | 'beaches'
  subcategory: string;           // "PADI Centers"
  area: Area;                    // 'west_bay' | 'west_end' | 'coxen_hole' | etc.
  latitude: number;              // 16.XXXXXX
  longitude: number;             // -86.XXXXXX
  addressDescription: string;    // "Next to the church in West End village"
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  priceRange: 1 | 2 | 3 | 4;    // $ to $$$$
  hours: BusinessHours;          // { monday: { open: "07:00", close: "17:00" }, ... }
  features: string[];            // ["PADI Certified", "Beachfront", "Family Friendly"]
  images: string[];              // URLs to WebP images
  isVerified: boolean;
  isFeatured: boolean;
  verifiedAt: string | null;     // ISO date
  status: 'active' | 'paused' | 'closed';
  createdAt: string;
  updatedAt: string;
}
```

### Categories (9 total)

| Category | Slug | Icon (Lucide) | Marker Color |
|----------|------|--------------|--------------|
| Eat | eat | UtensilsCrossed | #E85D4A |
| Drink | drink | Wine | #9B59B6 |
| Dive & Snorkel | dive | Waves | #2196F3 |
| Tours & Activities | tours | Compass | #4CAF50 |
| Shop | shop | ShoppingBag | #FF9800 |
| Stay | stay | Bed | #795548 |
| Rentals | rentals | Key | #607D8B |
| Transport | transport | Car | #FFC107 |
| Beaches | beaches | Umbrella | #00BCD4 |

### Areas of Roatán (10 total)

| Area | Slug | Center Lat | Center Lng |
|------|------|-----------|-----------|
| West Bay | west_bay | 16.2940 | -86.6180 |
| West End | west_end | 16.2985 | -86.6110 |
| Sandy Bay | sandy_bay | 16.3150 | -86.5850 |
| Coxen Hole | coxen_hole | 16.3040 | -86.5560 |
| Flowers Bay | flowers_bay | 16.3200 | -86.5400 |
| French Harbour | french_harbour | 16.3350 | -86.4600 |
| Oak Ridge | oak_ridge | 16.3670 | -86.3690 |
| Punta Gorda | punta_gorda | 16.3730 | -86.3420 |
| Port Royal | port_royal | 16.4050 | -86.3200 |
| Camp Bay | camp_bay | 16.4200 | -86.2900 |

---

## Offline Strategy

This is the #1 differentiator. Every core feature MUST work without a network connection.

### Service Worker Caching

| Resource | Strategy | Duration |
|----------|----------|----------|
| App shell (HTML/CSS/JS) | Precache | Until next deploy |
| Business data (JSON) | StaleWhileRevalidate | 24 hours |
| Business images | CacheFirst | 7 days, LRU eviction at 200 |
| Map tiles (OSM) | CacheFirst | 30 days |
| API responses | NetworkFirst | 1 hour fallback |
| Fonts | CacheFirst | 365 days |

### Pre-cache on First Load

- Full business directory as JSON (~200KB compressed)
- All thumbnail images (~5MB)
- Map tiles for Roatán: zoom 10-16, bounding box [16.22, -86.72] to [16.44, -86.27] (~15MB)
- All guide content
- Tool logic (currency converter, tip calculator)

### Offline Behavior Rules

- NEVER show an error page when offline. Show cached content.
- A subtle OfflineIndicator banner appears at top: "You're offline — showing saved content"
- Favorites save to localStorage immediately, sync to Supabase when back online
- GPS/geolocation works offline (browser API, no network needed)
- tel: and geo: links work offline if the phone has signal

---

## Coding Standards

### General Rules
- Use TypeScript strict mode everywhere. No `any` types.
- Use functional components with hooks. No class components.
- One component per file. File name matches component name.
- Use named exports, not default exports (except for Next.js pages which require default).
- Keep components under 200 lines. Extract logic into custom hooks.
- Use `const` by default, `let` only when reassignment is necessary. Never `var`.
- All text content that appears in the UI should be in English.
- Use semantic HTML elements (`nav`, `main`, `section`, `article`, `aside`, `header`, `footer`).
- Every interactive element needs proper `aria-label` or visible label text.
- All images need `alt` text.

### Naming Conventions
- Components: PascalCase (`BusinessCard.tsx`)
- Hooks: camelCase with `use` prefix (`useFavorites.ts`)
- Utilities: camelCase (`formatPrice.ts`)
- Constants: UPPER_SNAKE_CASE (`MAX_FAVORITES`)
- Types/Interfaces: PascalCase (`Business`, `Category`)
- CSS classes: Tailwind utilities only, no custom CSS classes unless absolutely necessary
- File slugs: kebab-case (`cruise-mahogany-bay.json`)

### Tailwind Rules
- Mobile-first: base styles are mobile, use `md:` and `lg:` for larger screens
- Never use arbitrary values like `w-[347px]` unless there's no Tailwind equivalent
- Use the custom theme colors defined in `tailwind.config.ts`, not raw hex values
- Prefer `gap` over margins for spacing between flex/grid children

### Component Patterns
```tsx
// Standard component template
'use client'; // Only if it needs client-side interactivity

import { useState } from 'react';
import type { Business } from '@/lib/types';

interface BusinessCardProps {
  business: Business;
  onSave?: (id: string) => void;
}

export function BusinessCard({ business, onSave }: BusinessCardProps) {
  // Component logic here
  return (
    // JSX here
  );
}
```

### Git Commit Messages
- Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `chore:`
- Keep subject line under 72 characters
- Examples:
  - `feat: add currency converter with offline fallback`
  - `fix: map tiles not caching for offline use`
  - `refactor: extract search logic into useSearch hook`

---

## SEO Requirements

Every page needs:
- Unique `<title>` tag (format: "Page Name | Roatán Insiders")
- Unique `<meta name="description">` (150-160 characters)
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags
- JSON-LD structured data (LocalBusiness for listings, TouristAttraction for beaches)
- Canonical URL
- Proper heading hierarchy (one H1 per page)

Generate `sitemap.xml` and `robots.txt` at build time.

Target Core Web Vitals:
- LCP < 2.5s on mobile 3G
- TBI < 200ms
- CLS < 0.1

---

## Content Voice

Write all descriptions, tips, and guide content in this voice:

- **Insider, not tourist:** "Locals call this the best baleada on the island" not "This is a popular restaurant"
- **Specific, not vague:** "Ask for Maria's coconut shrimp — it's not on the menu" not "They have good seafood"
- **Honest, not promotional:** "The food is excellent but service can be slow on cruise ship days"
- **Practical, not flowery:** "Bring cash — no card reader" not "Embrace the laid-back island atmosphere"

---

## Important Context

- Roatán is an island. Internet connectivity is unreliable outside tourist zones. OFFLINE SUPPORT IS CRITICAL.
- Cruise passengers represent ~50% of projected traffic. They have 6-8 hours on the island and zero patience for slow apps.
- Two cruise ports: Mahogany Bay (near West Bay) and Town Center/Coxen Hole. They need different welcome experiences.
- Roatán doesn't have traditional street addresses. Use GPS coordinates + landmark descriptions for every listing.
- USD is widely accepted but the local currency is Honduran Lempira (HNL). ~1 USD = 24.85 HNL.
- The island is roughly 48 miles long and 5 miles wide. West Bay/West End is the main tourist zone on the western tip.

---

## Rules for Claude Code

- Never refactor code unless explicitly asked.
- Never delete or modify existing files without stating which files will change.
- Always use Plan Mode for features that touch more than 3 files.
- Test that the dev server runs (`npm run dev`) after making significant changes.
- When creating seed data for businesses, use realistic Roatán businesses with accurate GPS coordinates.
- Do not install packages without stating what you're installing and why.
- Keep bundle size minimal — tree-shake everything, lazy load below-the-fold content.
- When in doubt about Roatán-specific details (business names, locations, prices), ask the user.
