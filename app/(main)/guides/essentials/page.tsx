import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Island Essentials',
  description: 'Everything you need to know before visiting Roatán — money, safety, water, healthcare, and more.',
};

export default function EssentialsPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
        Island Essentials
      </h1>
      <p className="mt-2 text-driftwood font-body">
        Essential tips for visiting Roat&aacute;n coming soon.
      </p>
    </div>
  );
}
