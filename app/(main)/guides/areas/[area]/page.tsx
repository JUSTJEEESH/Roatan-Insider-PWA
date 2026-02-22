import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MapPin, Compass, Map } from 'lucide-react';
import { AREAS } from '@/lib/constants';
import { getAllBusinesses } from '@/lib/data';
import { BusinessCard } from '@/components/directory/BusinessCard';
import { Badge } from '@/components/ui/Badge';

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
      <div className="px-4 py-16 text-center">
        <h1 className="text-2xl font-display font-bold text-charcoal mb-2">Area Not Found</h1>
        <Link href="/guides" className="text-primary hover:underline font-body">Back to Guides</Link>
      </div>
    );
  }

  const businesses = getAllBusinesses().filter((b) => b.area === area.slug);
  const featured = businesses.filter((b) => b.isFeatured);
  const topPicks = featured.length > 0 ? featured.slice(0, 6) : businesses.slice(0, 6);

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm text-driftwood hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          All guides
        </Link>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
            {area.name}
          </h1>
          <Badge variant="category" color="#0E8B9E" className="mt-2">
            {area.vibe}
          </Badge>
          <p className="text-sm text-driftwood font-body mt-3 leading-relaxed">
            {area.description}
          </p>
        </div>

        {/* Best For */}
        <section className="mb-8">
          <div className="bg-seafoam rounded-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Compass size={18} className="text-primary" />
              <h2 className="text-sm font-display font-semibold text-charcoal">
                Best For
              </h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {area.bestFor.split(', ').map((tag) => (
                <Badge key={tag} variant="default" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Map link */}
        <section className="mb-8">
          <Link
            href={`/map`}
            className="flex items-center gap-3 bg-white rounded-card shadow-card p-4 hover:shadow-card-hover transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center flex-shrink-0">
              <Map size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-body font-semibold text-charcoal text-sm">
                View {area.name} on Map
              </p>
              <p className="text-xs text-driftwood font-body">
                See all businesses in this area
              </p>
            </div>
          </Link>
        </section>

        {/* Top Picks */}
        {topPicks.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-primary" />
              <h2 className="text-lg font-display font-semibold text-charcoal">
                Top Picks in {area.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topPicks.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
            {businesses.length > topPicks.length && (
              <div className="mt-4 text-center">
                <Link
                  href={`/search`}
                  className="text-sm text-primary hover:underline font-body"
                >
                  View all {businesses.length} listings in {area.name}
                </Link>
              </div>
            )}
          </section>
        )}

        {topPicks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-driftwood font-body">
              No listings in {area.name} yet. Check back soon!
            </p>
          </div>
        )}

        {/* Explore more */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button bg-seafoam text-primary text-sm font-body font-medium hover:bg-seafoam-dark transition-colors"
          >
            <Compass size={16} />
            Explore All Categories
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button bg-coconut text-driftwood text-sm font-body font-medium hover:bg-coconut-dark transition-colors"
          >
            More Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
