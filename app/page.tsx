import { ArrowRight, Search, Ship, Banknote, BookOpen, Map } from 'lucide-react';
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
      {/* Hero Section — Full-bleed photo */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&q=80&auto=format)',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center px-6">
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.1] text-center">
            Discover
            <br />
            Roat&aacute;n
          </h1>
          <p className="mt-6 text-white/70 font-body text-lg md:text-xl max-w-md mx-auto text-center leading-relaxed">
            Your insider guide to the island.
            <br className="hidden md:block" />
            Works offline, everywhere.
          </p>

          {/* Search Bar */}
          <div className="mt-10 w-full max-w-lg">
            <Link
              href="/search"
              className="flex items-center gap-3 w-full bg-white rounded-2xl px-5 py-4 shadow-lg hover:shadow-xl transition-shadow duration-200 group"
            >
              <Search size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              <span className="text-gray-400 font-body text-base">
                Search restaurants, beaches, tours...
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-8">
            Browse by category
          </p>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Businesses */}
      {featured.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm uppercase tracking-widest text-gray-400 font-medium">
                Featured
              </p>
              <Link
                href="/explore"
                className="text-sm font-body font-medium text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="px-6 md:px-0 md:max-w-5xl md:mx-auto">
            <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:snap-none">
              {featured.map((business) => (
                <div key={business.id} className="min-w-[300px] md:min-w-0 snap-start shrink-0 md:shrink">
                  <BusinessCard business={business} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Insider Picks */}
      {insiderPicks.length > 0 && (
        <section className="px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-8">
              Insider Picks
            </p>
            <div className="space-y-4">
              {insiderPicks.map((business) => (
                <InsiderPickCard key={business.id} business={business} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Guides */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-8">
            Quick Guides
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GuideLink
              href="/guides/cruise/mahogany-bay"
              icon={<Ship size={20} />}
              title="Cruise Day Guide"
              subtitle="Mahogany Bay & Coxen Hole"
            />
            <GuideLink
              href="/tools"
              icon={<Banknote size={20} />}
              title="Currency Converter"
              subtitle="USD to Lempira — works offline"
            />
            <GuideLink
              href="/guides/essentials"
              icon={<BookOpen size={20} />}
              title="Island Essentials"
              subtitle="Money, safety, water, tips"
            />
            <GuideLink
              href="/map"
              icon={<Map size={20} />}
              title="Interactive Map"
              subtitle="Find what's near you"
            />
          </div>
        </div>
      </section>

      {/* Offline Note */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-400">
            This app works completely offline — browse, search, and navigate without signal.
          </p>
        </div>
      </section>
    </div>
  );
}

function InsiderPickCard({ business }: { business: Business }) {
  return (
    <Link href={`/listing/${business.slug}`}>
      <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-card hover:shadow-card-hover transition-all duration-200 group">
        <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-body font-semibold text-gray-900 text-base leading-tight group-hover:text-primary transition-colors">
            {business.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 capitalize">
            {business.area.replace(/_/g, ' ')} &middot; {business.subcategory}
          </p>
          {business.insiderTip && (
            <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-snug italic">
              &ldquo;{business.insiderTip}&rdquo;
            </p>
          )}
        </div>
        <ArrowRight size={16} className="text-gray-300 mt-1 flex-shrink-0 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}

function GuideLink({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-card hover:shadow-card-hover transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-medium text-gray-900 text-sm group-hover:text-primary transition-colors">
          {title}
        </p>
        <p className="text-xs text-gray-400 font-body mt-0.5">
          {subtitle}
        </p>
      </div>
      <ArrowRight size={16} className="ml-auto text-gray-300 flex-shrink-0 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
