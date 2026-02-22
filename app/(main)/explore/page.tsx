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
    <div className="px-6 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
            Explore Roat&aacute;n
          </h1>
          <p className="mt-2 text-gray-400 font-body text-sm">
            Browse by category to discover the best of the island.
          </p>
        </div>

        {/* Category Grid */}
        <section className="mb-16">
          <CategoryGrid />
        </section>

        {/* Popular Section */}
        {popular.length > 0 && (
          <section>
            <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-6">
              Popular Right Now
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
