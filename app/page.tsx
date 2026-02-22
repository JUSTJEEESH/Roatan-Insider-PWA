import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CategoryGrid } from '@/components/directory/CategoryGrid';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-pill px-3 py-1 mb-4">
            <MapPin size={14} className="text-white" />
            <span className="text-white/90 text-xs font-body font-medium">
              Roat&aacute;n, Bay Islands, Honduras
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
            Your Island.
            <br />
            Your Guide.
          </h1>
          <p className="mt-3 text-white/80 font-body text-base md:text-lg max-w-md mx-auto">
            Curated restaurants, dive shops, tours, beaches &mdash; all working
            offline. No signal? No problem.
          </p>
          <div className="mt-6">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 bg-white text-primary font-body font-semibold px-6 py-3 rounded-button hover:bg-sand transition-colors duration-200 min-h-[48px]"
            >
              Start Exploring
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-display font-bold text-charcoal mb-4">
            Browse by Category
          </h2>
          <CategoryGrid />
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-display font-bold text-charcoal mb-4">
            Quick Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/guides/cruise/mahogany-bay"
              className="flex items-center gap-3 p-4 bg-coconut rounded-card hover:bg-coconut-dark transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🚢</span>
              </div>
              <div>
                <p className="font-body font-semibold text-charcoal text-sm">
                  Cruise Day Guide
                </p>
                <p className="text-xs text-driftwood-light font-body">
                  Mahogany Bay &amp; Coxen Hole
                </p>
              </div>
              <ArrowRight size={16} className="ml-auto text-driftwood-light" />
            </Link>
            <Link
              href="/tools"
              className="flex items-center gap-3 p-4 bg-coconut rounded-card hover:bg-coconut-dark transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">💱</span>
              </div>
              <div>
                <p className="font-body font-semibold text-charcoal text-sm">
                  Currency Converter
                </p>
                <p className="text-xs text-driftwood-light font-body">
                  USD to Lempira &mdash; works offline
                </p>
              </div>
              <ArrowRight size={16} className="ml-auto text-driftwood-light" />
            </Link>
            <Link
              href="/guides/essentials"
              className="flex items-center gap-3 p-4 bg-coconut rounded-card hover:bg-coconut-dark transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📋</span>
              </div>
              <div>
                <p className="font-body font-semibold text-charcoal text-sm">
                  Island Essentials
                </p>
                <p className="text-xs text-driftwood-light font-body">
                  Money, safety, water, tips
                </p>
              </div>
              <ArrowRight size={16} className="ml-auto text-driftwood-light" />
            </Link>
            <Link
              href="/map"
              className="flex items-center gap-3 p-4 bg-coconut rounded-card hover:bg-coconut-dark transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🗺️</span>
              </div>
              <div>
                <p className="font-body font-semibold text-charcoal text-sm">
                  Interactive Map
                </p>
                <p className="text-xs text-driftwood-light font-body">
                  Find what&apos;s near you
                </p>
              </div>
              <ArrowRight size={16} className="ml-auto text-driftwood-light" />
            </Link>
          </div>
        </div>
      </section>

      {/* Offline Badge */}
      <section className="px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-seafoam rounded-card p-4 text-center">
            <p className="font-body text-sm text-primary font-medium">
              📶 This app works offline &mdash; browse, search, and navigate even without signal
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
