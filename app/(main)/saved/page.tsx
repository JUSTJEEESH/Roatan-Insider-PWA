import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved',
  description: 'Your saved favorites on Roatán — restaurants, beaches, dive shops, and more.',
};

export default function SavedPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
        Saved Places
      </h1>
      <p className="mt-2 text-driftwood font-body">
        Your favorite spots will appear here.
      </p>
    </div>
  );
}
