import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Map',
  description: 'Interactive map of Roatán with all businesses, beaches, and points of interest. Works offline.',
};

export default function MapPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
        Map
      </h1>
      <p className="mt-2 text-driftwood font-body">
        Interactive map coming soon.
      </p>
    </div>
  );
}
