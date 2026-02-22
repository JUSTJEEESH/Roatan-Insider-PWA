import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { BusinessCard } from '@/components/directory/BusinessCard';
import type { Business } from '@/lib/types';
import businessesData from '@/data/businesses.json';

interface CategoryPageProps {
  params: { category: string };
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  const name = cat?.name ?? params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return {
    title: name,
    description: `Discover the best ${name.toLowerCase()} spots in Roatán, Honduras. ${cat?.description ?? ''}`,
  };
}

function getBusinessesByCategory(category: string): Business[] {
  return (businessesData as Business[])
    .filter((b) => b.category === category && b.status === 'active');
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  const businesses = getBusinessesByCategory(params.category);
  const name = cat?.name ?? params.category.replace(/-/g, ' ');

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-sm text-driftwood-light hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          All categories
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            {cat && (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}12` }}
              >
                <div style={{ color: cat.color }} className="text-lg font-bold">
                  {businesses.length}
                </div>
              </div>
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal capitalize">
                {name}
              </h1>
              {cat && (
                <p className="text-sm text-driftwood font-body mt-0.5">
                  {cat.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Business listings */}
        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-driftwood font-body">
              No listings in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
