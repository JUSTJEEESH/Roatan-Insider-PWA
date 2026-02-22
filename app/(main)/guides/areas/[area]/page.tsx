import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Compass, Map } from 'lucide-react';
import { AREAS } from '@/lib/constants';
import { getAllBusinesses } from '@/lib/data';
import { BusinessCard } from '@/components/directory/BusinessCard';

interface AreaGuidePageProps {
  params: { area: string };
}

function findArea(slug: string) {
  const areaSlug = slug.replace(/-/g, '_');
  return AREAS.find((a) => a.slug === areaSlug);
}

export function generateStaticParams() {
  return AREAS.map((area) => ({ area: area.slug.replace(/_/g, '-') }));
}

export function generateMetadata({ params }: AreaGuidePageProps): Metadata {
  const area = findArea(params.area);
  const name = area?.name ?? params.area.replace(/-/g, ' ');
  return {
    title: `${name} Area Guide`,
    description: `Guide to ${name} in Roatan — ${area?.description?.slice(0, 120) ?? 'what to do, where to eat, and insider tips.'}`,
  };
}

export default function AreaGuidePage({ params }: AreaGuidePageProps) {
  const area = findArea(params.area);

  if (!area) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Area Not Found</h1>
        <Link href="/guides" className="text-primary hover:underline font-body">Back to Guides</Link>
      </div>
    );
  }

  const businesses = getAllBusinesses().filter((b) => b.area === area.slug);
  const featured = businesses.filter((b) => b.isFeatured);
  const topPicks = featured.length > 0 ? featured.slice(0, 6) : businesses.slice(0, 6);

  return (
    <div className="px-6 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          All guides
        </Link>

        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
            {area.name}
          </h1>
          <p className="text-sm text-gray-500 font-body font-medium mt-1">{area.vibe}</p>
          <p className="text-sm text-gray-500 font-body mt-3 leading-relaxed">
            {area.description}
          </p>
        </div>

        {/* Best For */}
        <section className="mb-10">
          <div className="bg-gray-50 rounded-card p-5">
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">Best For</p>
            <div className="flex flex-wrap gap-2">
              {area.bestFor.split(', ').map((tag) => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-pill text-xs font-body bg-white text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Map link */}
        <section className="mb-10">
          <Link
            href="/map"
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-card p-5 hover:shadow-card-hover transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Map size={20} className="text-gray-500" />
            </div>
            <div>
              <p className="font-body font-medium text-gray-900 text-sm">
                View {area.name} on Map
              </p>
              <p className="text-xs text-gray-400 font-body">
                See all businesses in this area
              </p>
            </div>
          </Link>
        </section>

        {/* Top Picks */}
        {topPicks.length > 0 && (
          <section className="mb-10">
            <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-6">
              Top Picks in {area.name}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPicks.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
            {businesses.length > topPicks.length && (
              <div className="mt-6 text-center">
                <Link
                  href="/search"
                  className="text-sm text-gray-400 hover:text-gray-900 hover:underline font-body"
                >
                  View all {businesses.length} listings in {area.name}
                </Link>
              </div>
            )}
          </section>
        )}

        {topPicks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 font-body">
              No listings in {area.name} yet. Check back soon!
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button border border-gray-200 text-gray-700 text-sm font-body font-medium hover:bg-gray-50 transition-colors"
          >
            <Compass size={16} />
            Explore All Categories
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button border border-gray-200 text-gray-700 text-sm font-body font-medium hover:bg-gray-50 transition-colors"
          >
            More Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
