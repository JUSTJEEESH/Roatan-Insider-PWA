**ROATÁN INSIDERS**

Progressive Web App

Product Requirements Document

Version 2.0 --- PWA Edition

February 2026

Prepared by Josh Green \| Josh Green Design Studio

*Your Island. Your Guide. Works Offline.*

**TABLE OF CONTENTS**

1\. Executive Summary

2\. Vision & Strategic Positioning

3\. Target Users & Personas

4\. Pain Point Analysis

5\. Core Features (MVP)

6\. PWA Architecture & Technical Stack

7\. Offline Strategy

8\. Data Architecture

9\. UI/UX Design System

10\. Business Directory Specification

11\. Interactive Map Specification

12\. Travel Tools Suite

13\. Cruise Ship Integration

14\. Content Strategy

15\. SEO & Discovery Strategy

16\. Monetization Model

17\. Analytics & Success Metrics

18\. Development Roadmap

19\. Deployment & Infrastructure

20\. Future Phases

**1. Executive Summary**

Roatán Insiders is a Progressive Web App (PWA) that serves as the definitive digital guide to Roatán, Honduras --- the largest of the Bay Islands and one of the Caribbean's most visited cruise and dive destinations. The platform provides curated business directories, interactive maps, essential travel tools, and offline-first functionality designed to work even when tourists have no cellular data or reliable WiFi.

This document represents a complete strategic pivot from the original native iOS application to a PWA architecture. The decision is driven by three critical insights: tourists will not download a native app for a short trip, PWAs provide instant access via any browser, and offline caching solves the #1 pain point on the island --- unreliable connectivity.

**Platform:** Progressive Web App (installable, offline-capable, cross-platform)

**Hosting:** Netlify (via GitHub repository, CI/CD pipeline)

**Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime)

**Frontend:** Next.js 14+ with App Router, TailwindCSS, TypeScript

**Target Launch:** Q2 2026 (MVP)

**2. Vision & Strategic Positioning**

**2.1 Vision Statement**

To be the single indispensable digital companion for anyone visiting or living in Roatán --- a platform so useful that tourists share it with each other on the ship, expats check it weekly, and local businesses consider it essential for visibility.

**2.2 Why a PWA**

The pivot from native iOS to PWA is a strategic decision rooted in the realities of island tourism:

-   **Zero Friction Access:** No app store download required. Tourists tap a link or scan a QR code and they're in. This is critical for cruise passengers with 6-8 hours on the island who aren't going to spend 5 minutes downloading an app.

-   **Offline-First Architecture:** Service workers cache the entire business directory, maps, and tools. When a tourist loses signal driving from Coxen Hole to West Bay (which happens constantly), the app keeps working.

-   **Cross-Platform by Default:** Works on iPhone, Android, tablets, and desktop. One codebase serves 100% of visitors regardless of device.

-   **Instant Updates:** No app store review process. Fix a business's phone number or add a new restaurant and it's live in minutes via Netlify's CI/CD pipeline.

-   **Install Prompt:** Users can still add it to their home screen for a native-like experience with splash screens, icons, and full-screen mode.

-   **Cost Efficiency:** No Apple Developer Program fees, no separate codebases, no app review delays.

**2.3 Competitive Landscape**

The current digital landscape for Roatán tourism information is fragmented and outdated:

  ------------------------------- ------------------------------------- ------------------------------------------------------------------
  **Competitor**                  **Strengths**                         **Weaknesses**

  TripAdvisor / Google Maps       Large review databases, brand trust   Generic, not Roatán-specific, poor offline, overwhelming options

  Roatan.com / tourism sites      Some local info, SEO presence         Outdated content, poor mobile UX, no tools or maps

  Facebook Groups                 Real-time local knowledge             Unsearchable, chaotic, requires account, no structure

  Cruise line excursion portals   Convenient for ship passengers        Overpriced, limited options, no local authenticity

  MapChick (comparable model)     Proven concept for island guides      Not available for Roatán
  ------------------------------- ------------------------------------- ------------------------------------------------------------------

Roatán Insiders occupies a unique position: local insider knowledge delivered through modern technology with offline capability. No existing solution combines curated local recommendations, offline maps, travel tools, and cruise-ship-aware features in a single platform.

**3. Target Users & Personas**

**3.1 User Segments**

  ---------------------- ------------------ -------------------- --------------------------------- --------------------------------------
  **Segment**            **% of Traffic**   **Time on Island**   **Primary Need**                  **Key Behavior**

  Cruise Passengers      50%                6-8 hours            Fast decisions, safe navigation   Scan, decide, go. No time to browse.

  Short-term Travelers   25%                3-14 days            Comprehensive exploration         Plan activities, find hidden gems

  Long-term Travelers    10%                1-6 months           Deep local knowledge              Routines, weekly spots, utilities

  Expats & Residents     10%                Permanent            New discoveries, sharing          Check events, recommend to visitors

  Pre-trip Planners      5%                 Not yet arrived      Research & itinerary building     Browse, save favorites, share lists
  ---------------------- ------------------ -------------------- --------------------------------- --------------------------------------

**3.2 Detailed Personas**

**Persona 1: "Cruise Sarah" --- The Time-Pressed Day Visitor**

**Demographics:** 45, married, traveling with spouse. From Dallas, TX. First time in Roatán.

**Scenario:** Ship docks at Mahogany Bay at 8 AM. Must be back by 4 PM. Has no cellular data plan for Honduras. Hotel WiFi ended when she left the ship.

**Goals:** Find a great beach, eat authentic food, buy souvenirs, feel safe the entire time.

**Frustrations:** Overwhelmed by taxi drivers at the port offering different prices. Doesn't know which beaches are free vs. resort-owned. No idea what things should cost. Phone has no signal once she leaves the port area.

**How Insiders Helps:** Sarah scans a QR code at the cruise terminal. The PWA loads instantly and caches itself. She browses the Cruise Day Guide showing a pre-planned 6-hour itinerary. The offline map shows her exactly where she is relative to West Bay Beach. The currency converter tells her 500 Lempiras equals about \$20 USD. The tip calculator suggests 15-20% at restaurants. She saves three restaurants to her favorites and taps for directions.

**Persona 2: "Explorer Mike" --- The Adventure Vacationer**

**Demographics:** 32, traveling with partner. From Portland, OR. Staying 10 days at a dive resort in West End.

**Scenario:** Has a local SIM card with spotty data. Wants to dive, eat local food, explore beyond the tourist zones, and find live music at night.

**Goals:** Discover authentic experiences, find the best dive sites and operators, eat where locals eat, find nightlife.

**Frustrations:** TripAdvisor reviews are from 3 years ago. Google Maps has wrong hours for half the restaurants. Can't tell which dive shops are PADI certified vs. sketchy operations. Doesn't know about the Garifuna villages or East End.

**How Insiders Helps:** Mike browses the Dive category filtered by "PADI Certified" and compares 5 dive shops side by side. He discovers a Garifuna cultural tour in Punta Gorda he'd never have found otherwise. The Nightlife filter shows him three bars with live music this week, including Sundowner's. He saves an entire week's itinerary to his favorites.

**Persona 3: "Expat Elena" --- The Long-term Resident**

**Demographics:** 58, retired. Moved to Roatán 2 years ago from Toronto. Lives in Sandy Bay.

**Scenario:** Knows the island well but constantly has visiting friends asking for recommendations. Wants to stay current on new restaurants and events.

**Goals:** Share recommendations easily, discover new spots, stay informed about events and community happenings.

**Frustrations:** Tired of typing the same recommendations in Facebook messages. New places open and close without her knowing. No single source of truth for what's current.

**How Insiders Helps:** Elena shares a curated favorites list link with incoming friends. She checks the "New This Month" section for newly added businesses. She's a verified reviewer whose recommendations carry extra weight. She submits a new coffee shop she discovered and it's verified and added within 48 hours.

**Persona 4: "Planner Pat" --- The Pre-Trip Researcher**

**Demographics:** 38, planning a family trip. Researching from home in Chicago 6 weeks before departure.

**Scenario:** Flying into RTB airport, staying in West Bay for 7 days with spouse and two kids (ages 8 and 12). Needs kid-friendly activities.

**Goals:** Build a day-by-day itinerary, understand costs, find family-friendly options, know what to pack and expect.

**Frustrations:** Information scattered across blogs, forums, and outdated websites. Can't tell what's current. Hard to estimate budget without reliable pricing.

**How Insiders Helps:** Pat filters the directory by "Family Friendly" and builds a 7-day itinerary with estimated costs. The Island Essentials guide tells her to bring reef-safe sunscreen and that ATMs are scarce outside Coxen Hole. She shares her saved favorites list with her husband so they can plan together.

**4. Pain Point Analysis**

Every feature in Roatán Insiders maps directly to a real pain point experienced by visitors. This section documents the problems the PWA solves.

**4.1 Connectivity Pain Points**

-   **No cellular data:** Most tourists don't buy a local SIM. Once they leave WiFi, they're blind. Solution: Offline-first architecture caches everything.

-   **Spotty WiFi:** Even with hotel WiFi, coverage outside tourist zones is unreliable. Solution: Service worker pre-caches the full directory and map tiles on first load.

-   **Slow connections:** When connectivity exists, it's often slow 3G. Solution: Aggressive asset optimization, lazy loading, skeleton screens, and compressed images.

**4.2 Information Pain Points**

-   **Outdated content:** Businesses open and close frequently. Google Maps has wrong hours. Blogs are from 2019. Solution: Verified, actively maintained directory with "Last Updated" timestamps.

-   **Fragmented sources:** Information scattered across Facebook groups, TripAdvisor, blogs, and cruise forums. Solution: Single source of truth with comprehensive coverage.

-   **Pricing confusion:** No idea what a taxi should cost, what a fair restaurant price looks like, or how much to tip. Solution: Price range indicators, currency converter, tip calculator, and "What Things Cost" guide.

-   **Safety uncertainty:** Tourists don't know which areas are safe, which taxis to trust, or basic safety protocols. Solution: Safety tips integrated throughout, trusted transport recommendations, and area descriptions that include honest safety context.

**4.3 Navigation Pain Points**

-   **Confusing geography:** Tourists don't understand the island layout. Is West End the same as West Bay? How far is French Harbour? Solution: Interactive map with labeled areas, distance indicators, and contextual "you are here" features.

-   **Poor addressing:** Roatán doesn't have traditional street addresses. "Turn left at the big tree after the second speed bump" is a real direction. Solution: GPS coordinates for every listing, with clear landmark-based descriptions.

-   **Transportation confusion:** Tuk-tuks, taxis, water taxis, buses --- tourists don't know what's available or what it should cost. Solution: Dedicated Transportation guide with pricing and "how to use" instructions.

**4.4 Cruise-Specific Pain Points**

-   **Time pressure:** 6-8 hours creates anxiety about wasting time on bad choices. Solution: Curated "Cruise Day Itineraries" pre-built for common time windows.

-   **Port orientation:** Mahogany Bay and Town Center (Coxen Hole) ports are in different locations. Solution: Port-specific welcome screens with contextual maps.

-   **Excursion pricing:** Ship excursions are 2-3x the price of booking independently. Solution: Direct booking links and transparent pricing for independent tours.

-   **Return anxiety:** Fear of missing the ship. Solution: Integration-ready architecture for future PortPal-style countdown features.

**5. Core Features (MVP)**

The MVP includes all features necessary to deliver immediate value across all user segments. Every feature is offline-capable from day one.

**5.1 Feature Priority Matrix**

  ----------------------------------- --------------- --------------- -------------------------
  **Feature**                         **Priority**    **Offline**     **User Segment**

  Business Directory (9 categories)   P0 - Critical   Full            All users

  Interactive Map with GPS            P0 - Critical   Cached tiles    All users

  Offline Mode / Service Workers      P0 - Critical   Core feature    All users

  Currency Converter (USD/HNL)        P0 - Critical   Full            Tourists

  Tip Calculator                      P0 - Critical   Full            Tourists

  Search & Filtering                  P0 - Critical   Full            All users

  Favorites / Save Listings           P1 - High       Local storage   All users

  Cruise Day Guides                   P1 - High       Full            Cruise passengers

  Area Guides                         P1 - High       Full            All users

  Share / QR Codes                    P1 - High       Partial         All users

  PWA Install Prompt                  P1 - High       N/A             All users

  Island Essentials Guide             P1 - High       Full            New visitors

  Contact Business (Call/WhatsApp)    P2 - Medium     Shows info      All users

  Transportation Guide                P2 - Medium     Full            Tourists

  Safety Tips                         P2 - Medium     Full            All users
  ----------------------------------- --------------- --------------- -------------------------

**5.2 Business Directory**

The directory is the core of the platform. It organizes Roatán's businesses, attractions, and services into intuitive categories with rich detail pages.

**Categories**

  -------------------- ---------------- --------------------------------------------------------------------------------- ----------------------
  **Category**         **Icon**         **Subcategories**                                                                 **MVP Listings**

  Eat                  Fork & Knife     Fine Dining, Casual, Seafood, Local/Baleadas, International, Cafes, Food Trucks   20+

  Drink                Cocktail Glass   Beach Bars, Sports Bars, Cocktail Lounges, Breweries, Happy Hours                 12+

  Dive & Snorkel       Mask/Fins        PADI Centers, Snorkel Tours, Freediving, Equipment Rental                         8+

  Tours & Activities   Compass          Island Tours, Boat Tours, Zip-lining, ATV, Cultural, Wildlife, Fishing            10+

  Shop                 Shopping Bag     Souvenirs, Local Crafts, Art Galleries, Groceries, Cigars                         8+

  Stay                 Bed              Resorts, Hotels, Vacation Rentals, Hostels, Eco-Lodges                            8+

  Rentals              Key              Cars, Scooters, ATVs, Golf Carts, Kayaks, Paddleboards                            5+

  Transport            Car              Taxis, Water Taxis, Tuk-Tuks, Airport Shuttles, Ferries                           5+

  Beaches              Wave             Public Beaches, Private Beaches, Snorkel Beaches, Hidden Gems                     6+
  -------------------- ---------------- --------------------------------------------------------------------------------- ----------------------

**Listing Detail Page**

Each business listing includes:

-   **Core Info:** Name, description (100-200 words), category, subcategory, area, price range (\$-\$\$\$\$)

-   **Media:** 2-5 high-quality photos (WebP format, lazy loaded, blur-up placeholder)

-   **Location:** GPS coordinates, area label, landmark-based directions, distance from user (when GPS available)

-   **Contact:** Phone (tap to call), WhatsApp (tap to message), email, website, Facebook, Instagram

-   **Hours:** Daily operating hours with "Open Now" / "Closing Soon" status indicator

-   **Features:** Tag-based feature list (e.g., "PADI Certified," "Family Friendly," "Beachfront," "Live Music")

-   **Insider Tip:** A short, curated recommendation from local knowledge (e.g., "Ask for the off-menu coconut shrimp")

-   **Verified Badge:** Businesses personally verified by the Insiders team show a trust badge with "Last Verified" date

-   **Actions:** Save to Favorites, Share Link, Get Directions, Call, WhatsApp

**5.3 Interactive Map**

A full-screen, filterable map showing all directory listings as pins. This is the primary navigation mode for many users, especially those trying to find "what's near me."

-   **Map Provider:** Leaflet.js with OpenStreetMap tiles (free, offline-cacheable)

-   **Category Filters:** Toggle pins by category with colored markers

-   **Cluster Markers:** Auto-cluster dense areas, expand on zoom

-   **User Location:** GPS "You Are Here" dot with accuracy ring

-   **Offline Tiles:** Pre-cache map tiles for the entire island at zoom levels 10-16

-   **Listing Preview:** Tap a pin to see a mini card with photo, name, rating, and "View Details" button

-   **Directions:** Deep link to Google Maps / Apple Maps for turn-by-turn navigation

**5.4 Travel Tools Suite**

Built-in tools that work 100% offline --- no API calls required for basic functionality.

**Currency Converter**

-   **Currencies:** USD ↔ HNL (Honduran Lempira) bidirectional conversion

-   **Default Rate:** Hardcoded fallback rate (updated periodically), with live rate fetch when online

-   **Quick Amounts:** Preset buttons for common amounts (\$5, \$10, \$20, \$50, \$100)

-   **Context:** "What Things Cost" reference showing typical prices for meals, taxis, activities

**Tip Calculator**

-   **Presets:** 10%, 15%, 18%, 20% with custom input option

-   **Context:** Cultural tipping guidance for Roatán (when to tip, how much, cash vs. card)

-   **Split Bill:** Divide total + tip by number of people

-   **Dual Currency:** Show tip in both USD and Lempira

**5.5 Cruise Day Guides**

Pre-built itineraries specifically designed for cruise passengers at each port:

-   **Mahogany Bay Port Guide:** What to expect, transportation options, recommended itineraries for 4, 6, and 8-hour port calls

-   **Coxen Hole (Town Center) Port Guide:** Same format for the town center dock

-   **Budget Options:** Each itinerary includes estimated costs and budget-friendly alternatives

-   **Safety Layer:** Integrated safety tips, trusted transport providers, and emergency contacts

**5.6 Area Guides**

Comprehensive guides for each region of the island, giving context that maps alone cannot provide.

  --------------------- ------------------------------ ----------------------------------------------
  **Area**              **Vibe**                       **Best For**

  West Bay              Premium beach resort area      Beaches, snorkeling, resort dining, families

  West End              Bohemian dive/backpacker hub   Diving, nightlife, budget dining, hostels

  Coxen Hole            Main town, commercial center   Shopping, banking, local food, port access

  French Harbour        Commercial/residential         Seafood restaurants, iguana farm, local life

  Sandy Bay             Quiet residential              Institute for Marine Sciences, relaxation

  Oak Ridge             Traditional fishing village    Authentic experience, boat tours, mangroves

  Punta Gorda           Garifuna cultural center       Cultural tours, traditional food, drumming

  Camp Bay / East End   Remote and undeveloped         Untouched beaches, nature, solitude

  Flowers Bay           Airport adjacent               Convenience, local neighborhoods

  Port Royal            Historical significance        Archaeology, history, remote exploration
  --------------------- ------------------------------ ----------------------------------------------

**6. PWA Architecture & Technical Stack**

**6.1 Technology Stack**

  -------------- ---------------------------- -------------------------------------------------------------------------------------
  **Layer**      **Technology**               **Rationale**

  Framework      Next.js 14+ (App Router)     SSG for performance, API routes for dynamic content, excellent PWA plugin ecosystem

  Language       TypeScript                   Type safety across the entire codebase, better DX, fewer runtime errors

  Styling        TailwindCSS v3+              Utility-first, minimal CSS bundle, excellent mobile-first responsive design

  Backend / DB   Supabase (PostgreSQL)        Auth, database, storage, realtime subscriptions, generous free tier

  Maps           Leaflet.js + OpenStreetMap   Free, open source, excellent offline tile caching support

  PWA            next-pwa / Workbox           Service worker generation, precaching, runtime caching strategies

  Hosting        Netlify                      GitHub integration, automatic deploys, edge functions, free SSL, CDN

  Images         Next/Image + WebP            Automatic optimization, lazy loading, responsive srcsets

  Icons          Lucide React                 Consistent, lightweight, tree-shakeable icon library

  State          Zustand                      Lightweight client-side state management for favorites, preferences

  Analytics      Plausible or Umami           Privacy-first, lightweight, GDPR-compliant, no cookie banners
  -------------- ---------------------------- -------------------------------------------------------------------------------------

**6.2 PWA Manifest**

The web app manifest configures the installable PWA experience:

-   **name:** "Roatán Insiders"

-   **short_name:** "Insiders"

-   **description:** "Your insider guide to Roatán, Honduras. Works offline."

-   **theme_color:** #0C6478 (deep teal)

-   **background_color:** #FFFFFF

-   **display:** standalone (full-screen, no browser chrome)

-   **orientation:** portrait-primary

-   **start_url:** /?source=pwa (track installs via analytics)

-   **scope:** /

-   **icons:** 192x192, 384x384, 512x512 (maskable + standard)

**6.3 Service Worker Strategy**

The service worker is the heart of the offline experience. It uses Workbox under the hood with the following caching strategies:

  ------------------------- ---------------------- -------------------- -----------------------------------------------
  **Resource**              **Strategy**           **Cache Duration**   **Notes**

  App shell (HTML/CSS/JS)   Precache               Until next deploy    Versioned, updated on new builds

  Business data (JSON)      StaleWhileRevalidate   24 hours             Serve cached, fetch fresh in background

  Business images           CacheFirst             7 days               Cache up to 200 images, LRU eviction

  Map tiles                 CacheFirst             30 days              Pre-cache island area, cache on demand beyond

  API responses             NetworkFirst           1 hour               Try network, fall back to cache

  Fonts                     CacheFirst             365 days             Immutable, cache aggressively

  Analytics                 NetworkOnly            N/A                  Queue offline, send when reconnected
  ------------------------- ---------------------- -------------------- -----------------------------------------------

**6.4 Project Structure**

The Next.js project follows a clean, scalable architecture:

-   / --- Root: next.config.js, tailwind.config.ts, tsconfig.json, package.json

-   /app --- App Router pages: layout.tsx, page.tsx, and route groups

-   /app/(main) --- Primary pages: home, explore, map, tools, guides

-   /app/(main)/explore/\[category\] --- Dynamic category pages

-   /app/(main)/listing/\[id\] --- Individual business detail pages

-   /app/api --- API routes for dynamic data (search, favorites sync)

-   /components --- Reusable UI components organized by feature

-   /components/ui --- Base UI primitives (Button, Card, Input, Modal, Badge)

-   /components/directory --- BusinessCard, CategoryGrid, FilterBar, SearchBar

-   /components/map --- MapView, MapMarker, MapPopup, LocationButton

-   /components/tools --- CurrencyConverter, TipCalculator

-   /lib --- Utilities, Supabase client, types, constants

-   /data --- Static JSON seed data for businesses, areas, categories

-   /public --- Static assets, manifest.json, service worker, icons, og images

**7. Offline Strategy**

Offline capability is not a nice-to-have --- it is the primary differentiator of this platform. Every core feature must work without any network connection.

**7.1 Offline Feature Matrix**

  ---------------------- ------------------------------------ -------------------------------------------------------
  **Feature**            **Offline Behavior**                 **Implementation**

  Browse directory       Full access to all cached listings   Pre-cached JSON data in service worker

  View listing details   Full detail page with images         Cached individual pages + images

  Interactive map        Pan, zoom, view pins                 Pre-cached OSM tiles for Roatán

  User location on map   GPS works offline                    Browser Geolocation API (no network needed)

  Currency converter     Fully functional                     Hardcoded exchange rate in app bundle

  Tip calculator         Fully functional                     Pure client-side calculation

  Search & filter        Full search across cached data       Client-side search index (e.g., FlexSearch)

  Favorites              Save and view favorites              localStorage / IndexedDB

  Call business          Shows phone number                   tel: links work offline (if phone signal exists)

  Share listing          Copies link to clipboard             Clipboard API works offline

  Get directions         Opens maps app                       Deep link with coordinates (maps app handles offline)

  Area guides            Full guide content                   Pre-cached static content

  Cruise day guides      Full itineraries                     Pre-cached static content
  ---------------------- ------------------------------------ -------------------------------------------------------

**7.2 Offline-First Data Flow**

1.  First Visit (Online): User loads the PWA. Service worker installs and pre-caches: app shell, all business data as JSON, essential images (thumbnails), map tiles for zoom levels 10-16 covering Roatán, all guide/tool content.

2.  Subsequent Visits (Online): Service worker checks for updated data in the background. New or changed listings are fetched and cached. User sees fresh content without manual refresh.

3.  Offline Visit: All cached content is served from the service worker. No loading spinners, no errors, no "you are offline" messages. The app simply works. A subtle indicator in the header shows offline status.

4.  Back Online: Queued actions (favorited items, analytics events) are synced. Fresh data is fetched in the background. The transition is seamless.

**7.3 Storage Budget**

Total estimated cache size for the complete offline experience:

  ------------------------------ -------------------- ------------------------------------
  **Asset Type**                 **Estimated Size**   **Notes**

  App shell (HTML/CSS/JS)        \~500 KB             Compressed, code-split

  Business data (100 listings)   \~200 KB             JSON, compressed

  Thumbnail images (100x)        \~5 MB               WebP, 400px wide, quality 75

  Map tiles (Roatán island)      \~15 MB              Zoom 10-16, covering island extent

  Fonts                          \~200 KB             Subset to Latin characters

  Guide content                  \~100 KB             Static HTML/JSON

  Total                          \~21 MB              Well within typical device storage
  ------------------------------ -------------------- ------------------------------------

**8. Data Architecture**

**8.1 Supabase Database Schema**

The PostgreSQL database in Supabase stores all dynamic data. Static seed data ships with the app bundle for offline access.

**businesses**

  --------------------- --------------- ------------------------------- --------------------------------
  **Column**            **Type**        **Constraints**                 **Description**

  id                    uuid            PK, default gen_random_uuid()   Unique business identifier

  slug                  text            UNIQUE, NOT NULL                URL-friendly identifier

  name                  text            NOT NULL                        Business display name

  description           text            NOT NULL                        100-200 word description

  insider_tip           text                                            Curated insider recommendation

  category              text            NOT NULL                        Primary category enum

  subcategory           text                                            Secondary classification

  area                  text            NOT NULL                        Geographic area enum

  latitude              decimal(10,7)   NOT NULL                        GPS latitude

  longitude             decimal(10,7)   NOT NULL                        GPS longitude

  address_description   text                                            Landmark-based directions

  phone                 text                                            Primary phone number

  whatsapp              text                                            WhatsApp number

  email                 text                                            Contact email

  website               text                                            Business website URL

  facebook              text                                            Facebook page URL

  instagram             text                                            Instagram handle

  price_range           int2            1-4                             \$ to \$\$\$\$ scale

  hours                 jsonb                                           Operating hours object

  features              text\[\]                                        Array of feature tags

  images                text\[\]                                        Array of image URLs

  is_verified           boolean         DEFAULT false                   Verified by Insiders team

  is_featured           boolean         DEFAULT false                   Featured listing flag

  verified_at           timestamptz                                     Last verification date

  status                text            DEFAULT 'active'                active, paused, closed

  created_at            timestamptz     DEFAULT now()                   Record creation

  updated_at            timestamptz     DEFAULT now()                   Last update
  --------------------- --------------- ------------------------------- --------------------------------

**Additional Tables**

-   **categories:** id, name, slug, icon, description, display_order, color

-   **areas:** id, name, slug, description, vibe, best_for, latitude, longitude, zoom_level

-   **favorites:** id, user_id (FK), business_id (FK), created_at --- for authenticated users

-   **guides:** id, slug, title, type (cruise/area/essential), content (jsonb), published, created_at

-   **analytics_events:** id, event_type, business_id, metadata (jsonb), session_id, created_at --- for understanding usage

**8.2 Data Sync Strategy**

Business data is served in two modes:

-   **Static Build Data:** At build time, all active businesses are exported as JSON and bundled into the app. This is the offline baseline. Netlify rebuilds are triggered by a Supabase webhook whenever data changes.

-   **Dynamic API Data:** When online, the app fetches fresh data from Supabase API routes to check for updates since the last cached version. Uses ETags or last-modified timestamps for efficient delta syncing.

**9. UI/UX Design System**

**9.1 Design Principles**

1.  Offline-First Confidence: The UI never shows errors when offline. It shows content. A subtle status indicator replaces panic-inducing error pages.

2.  Thumb-Friendly Navigation: Every interactive element is at least 44x44px. Primary actions are in the bottom navigation bar, reachable with one thumb.

3.  Speed Over Polish: Skeleton screens load instantly. Real content fills in progressively. A user should see something useful within 1 second.

4.  Local Authenticity: The design feels tropical and warm, not generic "tech startup." Photography is real Roatán imagery. Language is friendly and local.

5.  Accessibility First: WCAG 2.1 AA compliance. Dynamic type support. High contrast mode. Screen reader compatibility.

**9.2 Color Palette**

  ---------------- -------------- ----------------------------------------
  **Name**         **Hex Code**   **Usage**

  Deep Teal        #0C6478        Primary brand color, headers, CTAs

  Ocean Teal       #0E8B9E        Secondary, hover states, links

  Caribbean Blue   #17B5CE        Accents, badges, highlights

  Warm Gold        #F7A731        Featured badges, alerts, stars

  Coral Sunset     #E85D4A        Errors, warnings, "Closing Soon"

  Sand White       #FAF9F6        Page backgrounds

  Coconut Cream    #F5F0EB        Card backgrounds, alternating rows

  Driftwood        #4A5568        Body text

  Charcoal         #1A1A2E        Headlines, high emphasis text

  Sea Foam         #E6F2F7        Info banners, category backgrounds
  ---------------- -------------- ----------------------------------------

**9.3 Typography**

**Primary Font:** Inter --- Modern, highly readable, excellent at small sizes on mobile

**Display Font:** Poppins --- Headings and hero text, friendly and warm personality

**Fallback Stack:** system-ui, -apple-system, sans-serif

  ----------------------- ---------- ------------------- -------------------- -----------------
  **Element**             **Font**   **Size (mobile)**   **Size (desktop)**   **Weight**

  H1 (Page titles)        Poppins    28px                36px                 700

  H2 (Section headers)    Poppins    22px                28px                 600

  H3 (Subsections)        Inter      18px                22px                 600

  Body text               Inter      16px                16px                 400

  Small text / captions   Inter      14px                14px                 400

  Button labels           Inter      16px                16px                 500

  Navigation labels       Inter      12px                14px                 500
  ----------------------- ---------- ------------------- -------------------- -----------------

**9.4 Navigation Architecture**

The PWA uses a bottom tab bar for mobile (the dominant platform) with a sidebar on desktop:

**Bottom Navigation (Mobile)**

  ---------- -------------- -------------------------------- ----------------------
  **Tab**    **Icon**       **Destination**                  **Badge**

  Home       Home icon      Landing page, featured, search   None

  Explore    Grid icon      Category grid, browse all        None

  Map        Map pin icon   Full-screen interactive map      None

  Tools      Wrench icon    Currency, tips, essentials       None

  Saved      Heart icon     Favorites list                   Count of saved items
  ---------- -------------- -------------------------------- ----------------------

**9.5 Component Library**

All components are built as reusable React components with Tailwind utility classes. Key components include:

-   **BusinessCard:** Thumbnail image, name, category badge, area, price range, "Open Now" status, rating. Tap opens detail page. Long-press saves to favorites.

-   **CategoryPill:** Rounded pill with icon and label. Used in filter bars and the explore grid.

-   **MapPopup:** Mini business card that appears when tapping a map pin. Shows image, name, distance, and "View" button.

-   **OfflineIndicator:** Subtle banner that appears at the top when offline. "You're offline --- showing saved content." Dismissable.

-   **SearchBar:** Full-width search with category filter chips. Results appear in real-time as the user types.

-   **SkeletonCard:** Animated placeholder matching BusinessCard dimensions. Shows during initial data load.

-   **InstallPrompt:** Customized "Add to Home Screen" prompt triggered after 2nd visit or 30 seconds of engagement.

**10. Business Directory Specification**

**10.1 Listing Data Requirements**

Every business in the directory must meet minimum data quality standards before publication:

1.  Business name verified against official signage or registration

2.  Description of 100-200 words written in a consistent, engaging voice

3.  At least 2 high-quality photographs (minimum 800px wide, landscape orientation preferred)

4.  GPS coordinates verified via on-site visit or satellite imagery

5.  At least one working contact method (phone, WhatsApp, email, or website)

6.  Operating hours confirmed with the business (updated seasonally)

7.  Category and subcategory correctly assigned

8.  Area assignment verified against geographic boundaries

9.  Price range indicator confirmed via menu review or visit

10. Feature tags assigned based on actual offerings (no aspirational tagging)

**10.2 Search & Filter System**

Users can find businesses through multiple discovery paths:

-   **Text Search:** Full-text search across business name, description, features, and area. Uses FlexSearch for client-side offline search with fuzzy matching.

-   **Category Filter:** Filter by one or more categories simultaneously.

-   **Area Filter:** Filter by geographic area (West Bay, West End, etc.).

-   **Feature Filter:** Filter by specific features ("Family Friendly," "Beachfront," "Live Music," "PADI Certified").

-   **Price Range Filter:** Filter by price level (\$ to \$\$\$\$).

-   **Open Now:** Toggle to show only businesses currently open based on their hours.

-   **Sort Options:** Distance from user, rating, name (A-Z), featured first, newest.

**10.3 Feature Tags**

Standardized tags used across all listings for filtering and discovery:

  -------------- -----------------------------------------------------------------------------------------------------------------------------------------
  **Category**   **Available Tags**

  Dining         Beachfront, Rooftop, Live Music, Happy Hour, Delivery, Takeout, Reservations, Vegetarian Options, Kid-Friendly Menu

  Diving         PADI Certified, SSI Certified, Night Diving, Wreck Diving, Freediving, Nitrox, Equipment Rental, Small Groups, Beginner Friendly

  Activities     Family Friendly, All Ages, Half Day, Full Day, Pickup Included, English Speaking, Private Tour, Group Tour, Physical Activity

  General        Accepts Credit Cards, USD Accepted, WiFi Available, Wheelchair Accessible, Pet Friendly, Air Conditioned, Parking Available, Ocean View

  Trust          Insider Verified, Locally Owned, Eco-Friendly, Award Winning
  -------------- -----------------------------------------------------------------------------------------------------------------------------------------

**11. Interactive Map Specification**

**11.1 Map Configuration**

**Center Point:** 16.3200°N, 86.5500°W (center of Roatán)

**Default Zoom:** 12 (shows full island)

**Min Zoom:** 10 (shows Bay Islands context)

**Max Zoom:** 18 (street-level detail)

**Tile Provider:** OpenStreetMap standard tiles (free, no API key needed)

**Offline Tile Cache:** Zoom levels 10-16 for bounding box \[16.22, -86.72\] to \[16.44, -86.27\]

**11.2 Marker System**

Each category has a distinct marker color and icon for quick visual identification on the map:

  -------------------- --------------------- -------------------------------
  **Category**         **Marker Color**      **Icon**

  Eat                  #E85D4A (Coral)       Fork & Knife

  Drink                #9B59B6 (Purple)      Cocktail

  Dive & Snorkel       #2196F3 (Blue)        Waves

  Tours & Activities   #4CAF50 (Green)       Compass

  Shop                 #FF9800 (Orange)      Bag

  Stay                 #795548 (Brown)       House

  Rentals              #607D8B (Gray-Blue)   Key

  Transport            #FFC107 (Amber)       Car

  Beaches              #00BCD4 (Cyan)        Umbrella
  -------------------- --------------------- -------------------------------

**12. Travel Tools Suite**

**12.1 Currency Converter Details**

The currency converter is one of the most-used features, particularly by cruise passengers encountering Lempiras for the first time.

**Exchange Rate Source:** Fallback rate hardcoded in the app bundle (updated at each deploy). When online, fetches live rate from a free API (e.g., exchangerate-api.com) and caches for 24 hours.

**Current Approximate Rate:** 1 USD = 24.85 HNL (as of February 2026, verified at deploy time)

**"What Things Cost" Reference**

Embedded within the currency converter for immediate context:

  ------------------------------- ------------------------- -------------------------
  **Item**                        **Typical Price (USD)**   **Typical Price (HNL)**

  Street baleada                  \$1-2                     L 25-50

  Restaurant meal (casual)        \$8-15                    L 200-375

  Restaurant meal (fine dining)   \$25-50                   L 620-1,240

  Local beer (bar)                \$2-4                     L 50-100

  Cocktail (beach bar)            \$5-10                    L 125-250

  Tuk-tuk (short ride)            \$2-3 per person          L 50-75

  Taxi (West Bay to West End)     \$8-10 per vehicle        L 200-250

  Two-tank dive                   \$65-85                   L 1,615-2,110

  Snorkel tour (half day)         \$35-55                   L 870-1,370

  Souvenir t-shirt                \$10-15                   L 250-375

  Bottled water (store)           \$0.50-1                  L 12-25

  Sunscreen (store)               \$8-12                    L 200-300
  ------------------------------- ------------------------- -------------------------

**12.2 Island Essentials Guide**

A comprehensive "things to know" resource covering practical information every visitor needs:

-   **Money:** USD widely accepted. ATMs available in Coxen Hole, French Harbour, and West End (not West Bay). Visa/MC accepted at most tourist businesses. Carry small bills.

-   **Safety:** Tourist areas are generally safe. Exercise normal caution. Avoid walking alone at night on dark roads. Use trusted taxi services. Keep valuables secure.

-   **Water:** Tap water is not recommended for drinking. Bottled water is inexpensive and widely available. Many hotels have purified water systems.

-   **Sunscreen:** Reef-safe sunscreen is strongly encouraged and increasingly required at marine parks. Available at most shops but more expensive than the mainland.

-   **Language:** Spanish is the official language. English is widely spoken in tourist areas, especially West Bay, West End, and at dive shops. Basic Spanish phrases are appreciated.

-   **Electricity:** 110V, 60Hz, US-style plugs. Power outages are common --- most businesses have generators.

-   **Healthcare:** Hospital in Coxen Hole, clinics in West End and French Harbour. Hyperbaric chamber available for diving emergencies. Travel insurance strongly recommended.

-   **Connectivity:** WiFi available at most hotels and restaurants. Local SIM cards (Tigo, Claro) available at the airport and Coxen Hole for \~\$10 with data. Coverage is spotty outside main towns.

-   **Wildlife:** Don't touch coral, sea turtles, or marine life. Mosquitoes can be prevalent --- bring repellent. Sand flies (no-see-ums) are common on beaches at dawn/dusk.

-   **Tipping:** 10-15% at restaurants if service charge not included. \$1-2 per drink at bars. \$5-10 per dive for divemasters. Tip in cash when possible.

**13. Cruise Ship Integration**

Cruise passengers represent 50% of projected traffic and have unique needs that require specific features and content strategies.

**13.1 Port-Specific Welcome Screens**

When a cruise passenger first loads the PWA (detected via QR code source parameter or self-identification), they see a port-specific welcome screen:

**Mahogany Bay Port Welcome**

-   Map showing port location relative to West Bay Beach (walking distance) and West End

-   Transportation options: complimentary beach shuttle, taxis, water taxis with pricing

-   Curated quick picks: "Best Beach (5 min walk)," "Best Lunch Nearby," "Best Souvenir Shopping"

-   Time-based itineraries: 4-hour, 6-hour, and 8-hour options

**Town Center (Coxen Hole) Port Welcome**

-   Map showing port location relative to downtown Coxen Hole and taxi routes to West Bay/West End

-   Transportation options: taxi pricing to all major areas

-   Different curated picks reflecting the Coxen Hole starting point

-   Time-based itineraries adjusted for transport time to popular areas

**13.2 Cruise Day Itineraries**

Pre-built itineraries are the killer feature for cruise passengers. Each itinerary includes:

-   Estimated timeline with buffer for transportation

-   Cost breakdown (transport + activities + meals)

-   Map route showing all stops with walking/driving indicators

-   Alternative options in case a business is closed

-   Safety notes and return-to-ship reminder

**Example Itinerary: "Beach & Bites" (6-hour Mahogany Bay)**

1.  Dock and walk to West Bay Beach via complimentary shuttle (15 min)

2.  Beach time at West Bay Beach --- rent chairs and snorkel gear (2.5 hours, \~\$15)

3.  Lunch at a recommended beachfront restaurant (1 hour, \~\$15-25)

4.  Walk through West Bay shops for souvenirs (45 min)

5.  Optional: Quick snorkel at Blue Channel if time allows (45 min, free with gear)

6.  Return to port via shuttle (15 min --- leave 30 min buffer)

**Estimated Total Cost:** \$30-55 per person (vs. \$90-150 for ship-organized excursion)

**13.3 QR Code Distribution Strategy**

Physical QR codes linking to the PWA will be strategically placed:

-   At the cruise port exit (poster or handout card)

-   In partnered taxi and tuk-tuk vehicles

-   At featured businesses (table tents, door stickers)

-   In vacation rental welcome guides (Casa Mañana and partner properties)

-   On social media posts targeting cruise-related hashtags

**14. Content Strategy**

**14.1 Voice & Tone**

Roatán Insiders speaks like a knowledgeable friend who lives on the island --- warm, confident, specific, and genuinely helpful. The voice is:

-   **Insider, not tourist:** "Locals call this the best baleada on the island" not "This is a popular restaurant"

-   **Specific, not vague:** "Ask for Maria's coconut shrimp --- it's not on the menu" not "They have good seafood"

-   **Honest, not promotional:** "The food is excellent but service can be slow on cruise ship days" not "Amazing in every way!"

-   **Practical, not flowery:** "Bring cash --- no card reader" not "Embrace the laid-back island atmosphere"

**14.2 Content Calendar**

-   **Weekly:** Verify 5-10 existing listings for accuracy (hours, contact info, status)

-   **Bi-weekly:** Add 2-3 new verified listings

-   **Monthly:** Update seasonal content (cruise ship schedules, events, weather advisories)

-   **Quarterly:** Comprehensive review of all listings, update photography, refresh guides

-   **Annually:** Complete content audit, refresh "What Things Cost" prices, update essentials guide

**14.3 Content for SEO**

Each listing page is also an SEO-optimized landing page. Additionally, the following content pages target high-value search queries:

-   "Things to Do in Roatán" --- comprehensive activity guide

-   "Best Restaurants in Roatán" --- curated dining guide

-   "Roatán Cruise Port Guide" --- complete cruise visitor resource

-   "Diving in Roatán" --- dive site guide with operator recommendations

-   "Getting Around Roatán" --- transportation guide

-   "West Bay Beach Guide" --- the most-searched beach on the island

-   "Roatán Safety Guide" --- addressing the #1 concern of first-time visitors

**15. SEO & Discovery Strategy**

**15.1 Technical SEO**

-   **SSG/ISR:** All directory and guide pages are statically generated at build time for instant loading and full crawlability by search engines.

-   **Meta Tags:** Unique title tags, meta descriptions, and Open Graph images for every page.

-   **Structured Data:** JSON-LD schema markup for LocalBusiness, TouristAttraction, and FAQ on every listing page.

-   **Sitemap:** Auto-generated XML sitemap submitted to Google Search Console and Bing Webmaster Tools.

-   **Canonical URLs:** Proper canonical tags to prevent duplicate content issues.

-   **Core Web Vitals:** Target LCP \< 2.5s, FID \< 100ms, CLS \< 0.1 on mobile 3G connection.

-   **Image Optimization:** WebP format, responsive srcsets, lazy loading, blur-up placeholders.

**15.2 Discovery Channels**

  --------------------- ------------------------------------------------------------ --------------------------
  **Channel**           **Strategy**                                                 **Target**

  Organic Search        SEO content targeting "Roatán + \[activity/need\]" queries   60% of traffic long-term

  QR Codes (Physical)   Cruise port, taxis, businesses, rental properties            25% of cruise traffic

  Social Media          Instagram, Facebook, TikTok with island photography + tips   Brand awareness

  Cruise Forums         Cruise Critic, Reddit r/cruise, Facebook cruise groups       Pre-trip planners

  Partner Referrals     Listed businesses linking back, vacation rental guides       Authority building

  Word of Mouth         Ship-to-ship sharing, tourist-to-tourist                     Organic growth
  --------------------- ------------------------------------------------------------ --------------------------

**16. Monetization Model**

Roatán Insiders is free for all users. Revenue is generated through business partnerships, not user fees.

**16.1 Revenue Streams**

  ----------------------------- ------------------------------------------------------------------------------------------- ------------------------------
  **Revenue Stream**            **Description**                                                                             **Pricing (Target)**

  Featured Listings             Premium placement at top of category, "Featured" badge, enhanced listing with more photos   \$25-50/month per business

  Sponsored Guides              Business included in relevant cruise day itineraries and area guides                        \$50-100/month

  Affiliate Commissions         Booking links for tours, diving, and accommodations via affiliate programs                  10-15% per booking

  Premium Business Profiles     Analytics dashboard, review management, special offers/coupons                              \$15-30/month

  Advertising Partnerships      Tasteful, relevant banner in category pages (not disruptive)                                CPM-based, limited inventory

  Casa Mañana Cross-promotion   Platform drives direct bookings to your vacation rental                                     Internal value
  ----------------------------- ------------------------------------------------------------------------------------------- ------------------------------

**16.2 Pricing Philosophy**

All pricing is designed to be accessible for small island businesses. A dive shop paying \$50/month for a featured listing that drives even 2-3 additional customers per month sees clear ROI. The platform never charges users and never puts essential information behind a paywall.

**17. Analytics & Success Metrics**

**17.1 Key Performance Indicators**

  -------------------------- ---------------------- ---------------------- ---------------------
  **Metric**                 **Target (Month 1)**   **Target (Month 6)**   **Target (Year 1)**

  Monthly Active Users       500                    3,000                  10,000

  PWA Installs               50                     500                    2,000

  Directory Listings         80                     120                    200+

  Avg. Session Duration      \> 2 min               \> 3 min               \> 4 min

  Pages per Session          \> 3                   \> 5                   \> 6

  Offline Sessions (%)       Track baseline         \> 20%                 \> 30%

  Return Visitors (%)        \> 15%                 \> 25%                 \> 35%

  Search-to-Listing CTR      \> 20%                 \> 30%                 \> 35%

  Favorites Saved per User   \> 1                   \> 3                   \> 5

  Revenue (Monthly)          \$0 (launch)           \$200-500              \$1,000-2,500
  -------------------------- ---------------------- ---------------------- ---------------------

**17.2 Analytics Implementation**

Privacy-first analytics using Plausible or Umami (self-hosted option). No cookies required, GDPR-compliant by default. Key events tracked:

-   Page views and navigation paths

-   Category and listing engagement (views, time on page)

-   Tool usage (currency conversions, tip calculations)

-   Map interactions (pan, zoom, pin taps)

-   Search queries and filter usage

-   Favorite save/remove actions

-   PWA install prompts shown vs. accepted

-   Offline vs. online session ratio

-   Outbound clicks (phone, WhatsApp, directions, website)

-   QR code source tracking (which physical locations drive traffic)

**18. Development Roadmap**

**Phase 1: MVP (Weeks 1-10)**

The MVP delivers the complete core experience: offline-capable business directory, interactive map, travel tools, and cruise guides.

**Sprint 1-2: Foundation (Weeks 1-4)**

-   Next.js project setup with TypeScript, Tailwind, App Router

-   PWA configuration: manifest.json, service worker, icon set

-   Supabase project setup: database schema, auth, storage buckets

-   Design system implementation: colors, typography, base components

-   Bottom navigation bar with all 5 tabs

-   GitHub repository structure, Netlify deployment pipeline

-   Seed data: 80+ business listings with full data

**Sprint 3-4: Core Features (Weeks 5-8)**

-   Business directory pages: category grid, category pages, listing detail pages

-   Search and filter system with client-side search index

-   Interactive map with Leaflet, category markers, user location

-   Currency converter and tip calculator

-   Favorites system (localStorage for anonymous, Supabase for authenticated)

-   Offline caching: service worker strategies, tile pre-caching

-   Cruise day guides and area guides as static content

**Sprint 5: Polish & Launch (Weeks 9-10)**

-   Performance optimization: image compression, code splitting, lazy loading

-   SEO: meta tags, structured data, sitemap, Open Graph images

-   PWA install prompt customization

-   Offline testing across devices (iPhone, Android, various browsers)

-   Cross-browser testing (Safari, Chrome, Firefox, Samsung Internet)

-   Analytics integration

-   Content review: all listings verified, photos quality-checked

-   Soft launch: friends, local community, beta testers

**Phase 2: Growth (Weeks 11-20)**

-   User authentication (Supabase Auth: email, Google, Apple sign-in)

-   Cloud-synced favorites across devices

-   User reviews and ratings (moderated)

-   Business owner dashboard: claim listing, update info, view analytics

-   Featured listing and sponsored content system

-   Push notifications for events and deals (when supported)

-   Multi-language support (Spanish)

-   "New This Month" and "Editors' Picks" content features

**Phase 3: Expansion (Weeks 21-30)**

-   Booking integration for tours and activities (Stripe or affiliate)

-   Events calendar with live music, festivals, community happenings

-   User-submitted photos and reviews with moderation workflow

-   Expanded to Utila and Guanaja (Bay Islands coverage)

-   API for partner integrations (vacation rentals, tour operators)

-   Advanced analytics dashboard for business partners

-   Community features: user profiles, trip reports, photo galleries

-   PortPal integration: cruise ship departure countdown as embedded feature

**19. Deployment & Infrastructure**

**19.1 Netlify Configuration**

**Build Command:** next build && next export (or next build for SSR if needed)

**Publish Directory:** out/ (for static export) or .next/ (for SSR)

**Node Version:** 18.x or 20.x LTS

**Auto Deploy:** Triggered on push to main branch

**Preview Deploys:** Automatic for pull requests

**Custom Domain:** roataninsiders.com (or equivalent)

**SSL:** Automatic via Netlify (Let's Encrypt)

**Headers:** Cache-Control for static assets, security headers (HSTS, X-Frame-Options)

**Redirects:** 301 redirects for any URL changes, trailing slash normalization

**19.2 CI/CD Pipeline**

5.  Developer pushes to GitHub (feature branch)

6.  Netlify creates a preview deploy with unique URL for testing

7.  PR review and approval

8.  Merge to main triggers production build

9.  Netlify builds, runs validation, deploys to CDN edge nodes

10. Service worker updates on next user visit (background update)

11. Supabase webhook triggers rebuild when business data changes

**19.3 Performance Budgets**

  -------------------------------- --------------- -------------------------------
  **Metric**                       **Budget**      **Measurement**

  First Contentful Paint           \< 1.5s         Mobile 3G, Lighthouse

  Largest Contentful Paint         \< 2.5s         Mobile 3G, Lighthouse

  Total Blocking Time              \< 200ms        Lighthouse

  Cumulative Layout Shift          \< 0.1          Lighthouse

  JavaScript Bundle (initial)      \< 150 KB       gzipped

  CSS Bundle                       \< 30 KB        gzipped, Tailwind purged

  Lighthouse Score (Performance)   \> 90           Mobile audit

  Lighthouse Score (PWA)           100             All PWA criteria met

  Time to Interactive              \< 3s           Mobile 3G
  -------------------------------- --------------- -------------------------------

**20. Future Phases & Vision**

**20.1 Long-term Feature Vision**

Beyond the three development phases, the following features represent the long-term vision for the platform:

-   **AI-Powered Recommendations:** Personalized suggestions based on user preferences, past favorites, and behavior patterns. "Based on your saved restaurants, you might love this hidden spot in Oak Ridge."

-   **Augmented Reality Overlays:** Point your camera at a building and see Insiders reviews, hours, and insider tips overlaid. Experimental, depends on WebXR browser support.

-   **Real-time Cruise Ship Tracking:** Show which ships are in port today, estimated passenger volumes, and adjust "busy" predictions at popular spots.

-   **Dynamic Pricing Insights:** Crowdsourced pricing data showing whether costs are rising or falling at specific businesses.

-   **Offline Social Sharing:** Generate shareable cards that work without network (QR code-based peer sharing on the beach).

-   **Multi-Island Expansion:** Extend to Utila, Guanaja, and potentially mainland Honduras coast.

-   **Developer API:** Open API for tour operators, vacation rentals, and travel apps to integrate Insiders data.

-   **PortPal Embedded Module:** Deep integration with the PortPal cruise ship timer concept, providing departure countdowns within the Insiders PWA.

**20.2 Success Vision**

In 12-18 months, Roatán Insiders should be:

-   The #1 organic search result for "Roatán guide" and related queries

-   Referenced on Cruise Critic and cruise forums as the go-to resource

-   Installed on 5,000+ devices

-   Generating \$1,000-2,500/month in revenue from featured listings and partnerships

-   The default recommendation from vacation rental hosts across the island

-   A recognized and trusted brand among Roatán's tourism community

*End of Document*

Roatán Insiders PWA --- Version 2.0 --- February 2026

Josh Green \| Josh Green Design Studio
