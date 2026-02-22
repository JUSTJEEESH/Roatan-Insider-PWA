import type { Metadata } from 'next';
import { CategoryGrid } from '@/components/directory/CategoryGrid';
import { BusinessCard } from '@/components/directory/BusinessCard';
import type { Business } from '@/lib/types';
import businessesData from '@/data/businesses.json';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Browse Roatán businesses by category — restaurants, dive shops, tours, beaches, and more.',
};

function getPopularBusinesses(): Business[] {
  return (businessesData as Business[])
    .filter((b) => b.status === 'active' && b.isVerified)
    .slice(0, 6);
}

export default function ExplorePage() {
  const popular = getPopularBusinesses();

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
            Explore Roat&aacute;n
          </h1>
          <p className="mt-1.5 text-driftwood font-body text-sm md:text-base">
            Browse by category to discover the best of the island.
          </p>
        </div>

        {/* Category Grid */}
        <section className="mb-10">
          <CategoryGrid />
        </section>

        {/* Popular Section */}
        {popular.length > 0 && (
          <section>
            <h2 className="text-lg md:text-xl font-display font-bold text-charcoal mb-4">
              Popular Right Now
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popular.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
