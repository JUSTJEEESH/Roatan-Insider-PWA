import { MapPin, ArrowRight, Search, Star, Sparkles, Ship, Banknote, BookOpen, Map } from 'lucide-react';
import Link from 'next/link';
import { CategoryGrid } from '@/components/directory/CategoryGrid';
import { BusinessCard } from '@/components/directory/BusinessCard';
import type { Business } from '@/lib/types';
import businessesData from '@/data/businesses.json';

function getFeaturedBusinesses(): Business[] {
  return (businessesData as Business[])
    .filter((b) => b.isFeatured && b.status === 'active')
    .slice(0, 6);
}

function getInsiderPicks(): Business[] {
  return (businessesData as Business[])
    .filter((b) => b.insiderTip && b.status === 'active' && b.isVerified)
    .slice(0, 4);
}

export default function HomePage() {
  const featured = getFeaturedBusinesses();
  const insiderPicks = getInsiderPicks();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-gold blur-3xl" />
        </div>
        <div className="relative px-4 pt-20 pb-10 md:pt-24 md:pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-pill px-3 py-1.5 mb-5">
              <MapPin size={14} className="text-white" />
              <span className="text-white/90 text-xs font-body font-medium tracking-wide">
                Roat&aacute;n, Bay Islands, Honduras
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              Your Island.
              <br />
              <span className="text-gold-light">Your Guide.</span>
            </h1>
            <p className="mt-4 text-white/80 font-body text-base md:text-lg max-w-md mx-auto leading-relaxed">
              Curated restaurants, dive shops, tours, and beaches &mdash; all working
              offline. No signal? No problem.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-lg mx-auto">
              <Link
                href="/search"
                className="flex items-center gap-3 w-full bg-white/95 backdrop-blur-sm rounded-card px-4 py-3.5 shadow-lg hover:bg-white transition-all duration-200 group"
              >
                <Search size={20} className="text-driftwood-light group-hover:text-primary transition-colors" />
                <span className="text-driftwood-light font-body text-sm md:text-base">
                  Search restaurants, beaches, tours...
                </span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 flex items-center justify-center gap-6 md:gap-10">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-white">80+</p>
                <p className="text-white/60 text-xs font-body mt-0.5">Verified Spots</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-white">9</p>
                <p className="text-white/60 text-xs font-body mt-0.5">Categories</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-white">100%</p>
                <p className="text-white/60 text-xs font-body mt-0.5">Offline Ready</p>
              </div>
            </div>
          </div>
        </div>
        {/* Wave divider */}
        <div className="relative h-6">
          <svg viewBox="0 0 1440 48" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 48h1440V24C1200 0 960 48 720 24S240 0 0 24v24z" fill="#FAF9F6" />
          </svg>
        </div>
      </section>

      {/* Category Grid */}
      <section className="px-4 py-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-display font-bold text-charcoal">
              Browse by Category
            </h2>
            <Link
              href="/explore"
              className="text-sm font-body font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
            >
              See all
              <ArrowRight size={14} />
            </Link>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Businesses */}
      {featured.length > 0 && (
        <section className="py-8 md:py-10">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Star size={20} className="text-gold" />
                <h2 className="text-xl md:text-2xl font-display font-bold text-charcoal">
                  Featured
                </h2>
              </div>
              <Link
                href="/explore"
                className="text-sm font-body font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="px-4 md:px-0 md:max-w-3xl md:mx-auto">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:snap-none">
              {featured.map((business) => (
                <div key={business.id} className="min-w-[280px] md:min-w-0 snap-start shrink-0 md:shrink">
                  <BusinessCard business={business} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Insider Picks */}
      {insiderPicks.length > 0 && (
        <section className="px-4 py-8 md:py-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={20} className="text-gold" />
              <h2 className="text-xl md:text-2xl font-display font-bold text-charcoal">
                Insider Picks
              </h2>
            </div>
            <div className="space-y-3">
              {insiderPicks.map((business) => (
                <InsiderPickCard key={business.id} business={business} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Guides */}
      <section className="px-4 py-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-display font-bold text-charcoal mb-5">
            Quick Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <GuideLink
              href="/guides/cruise/mahogany-bay"
              icon={<Ship size={20} className="text-primary" />}
              title="Cruise Day Guide"
              subtitle="Mahogany Bay & Coxen Hole"
              bgColor="bg-primary/5"
            />
            <GuideLink
              href="/tools"
              icon={<Banknote size={20} className="text-gold-dark" />}
              title="Currency Converter"
              subtitle="USD to Lempira — works offline"
              bgColor="bg-gold/5"
            />
            <GuideLink
              href="/guides/essentials"
              icon={<BookOpen size={20} className="text-accent" />}
              title="Island Essentials"
              subtitle="Money, safety, water, tips"
              bgColor="bg-accent/5"
            />
            <GuideLink
              href="/map"
              icon={<Map size={20} className="text-secondary" />}
              title="Interactive Map"
              subtitle="Find what's near you"
              bgColor="bg-secondary/5"
            />
          </div>
        </div>
      </section>

      {/* Offline Badge */}
      <section className="px-4 pb-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-seafoam to-seafoam-dark rounded-card p-5 text-center">
            <p className="font-display font-semibold text-primary text-sm">
              This app works completely offline
            </p>
            <p className="font-body text-xs text-driftwood mt-1">
              Browse, search, and navigate even without cell signal
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function InsiderPickCard({ business }: { business: Business }) {
  return (
    <Link href={`/listing/${business.slug}`}>
      <div className="flex gap-4 p-4 bg-coconut rounded-card hover:shadow-card-hover transition-all duration-200 group">
        <div className="w-20 h-20 rounded-button bg-coconut-dark flex-shrink-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-coconut-dark to-sand-dark" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-body font-semibold text-charcoal text-base leading-tight group-hover:text-primary transition-colors">
            {business.name}
          </h3>
          <p className="text-xs text-driftwood-light mt-1 capitalize">
            {business.area.replace(/_/g, ' ')} &middot; {business.subcategory}
          </p>
          {business.insiderTip && (
            <p className="text-sm text-driftwood mt-1.5 line-clamp-2 leading-snug italic">
              &ldquo;{business.insiderTip}&rdquo;
            </p>
          )}
        </div>
        <ArrowRight size={16} className="text-driftwood-light mt-1 flex-shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}

function GuideLink({
  href,
  icon,
  title,
  subtitle,
  bgColor,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bgColor: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 bg-coconut rounded-card hover:shadow-card-hover transition-all duration-200 group"
    >
      <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-charcoal text-sm group-hover:text-primary transition-colors">
          {title}
        </p>
        <p className="text-xs text-driftwood-light font-body mt-0.5">
          {subtitle}
        </p>
      </div>
      <ArrowRight size={16} className="ml-auto text-driftwood-light flex-shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
