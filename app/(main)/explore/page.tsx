import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Browse Roatán businesses by category — restaurants, dive shops, tours, beaches, and more.',
};

export default function ExplorePage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
        Explore Roat&aacute;n
      </h1>
      <p className="mt-2 text-driftwood font-body">
        Browse by category to discover the best of the island.
      </p>
    </div>
  );
}
