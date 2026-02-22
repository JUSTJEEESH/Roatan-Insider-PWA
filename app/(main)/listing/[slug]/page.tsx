import type { Metadata } from 'next';

interface ListingPageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: ListingPageProps): Metadata {
  const name = params.slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return {
    title: name,
    description: `${name} — a verified business on Roatán, Honduras. View details, hours, and insider tips.`,
  };
}

export default function ListingPage({ params }: ListingPageProps) {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
        {params.slug
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')}
      </h1>
      <p className="mt-2 text-driftwood font-body">
        Business detail page coming soon.
      </p>
    </div>
  );
}
