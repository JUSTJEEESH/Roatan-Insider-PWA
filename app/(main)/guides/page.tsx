import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides',
  description: 'Island guides, cruise port guides, and essential tips for visiting Roatán, Honduras.',
};

export default function GuidesPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
        Island Guides
      </h1>
      <p className="mt-2 text-driftwood font-body">
        Cruise day guides, area guides, and island essentials.
      </p>
    </div>
  );
}
