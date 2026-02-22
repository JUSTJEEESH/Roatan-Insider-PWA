import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search restaurants, dive shops, tours, beaches, and more across Roatán.',
};

export default function SearchPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
        Search
      </h1>
      <p className="mt-2 text-driftwood font-body">
        Search functionality coming soon.
      </p>
    </div>
  );
}
