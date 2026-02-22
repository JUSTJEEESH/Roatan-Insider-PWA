import type { Metadata } from 'next';

interface CategoryPageProps {
  params: { category: string };
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const name = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return {
    title: name,
    description: `Discover the best ${name.toLowerCase()} spots in Roatán, Honduras.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal capitalize">
        {params.category.replace(/-/g, ' ')}
      </h1>
      <p className="mt-2 text-driftwood font-body">
        Listings coming soon.
      </p>
    </div>
  );
}
