import type { Metadata } from 'next';
import { CATEGORIES } from '@/lib/constants';
import { CategoryContent } from '@/components/directory/CategoryContent';

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  const name = cat?.name ?? params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return {
    title: name,
    description: `Discover the best ${name.toLowerCase()} spots in Roatan, Honduras. ${cat?.description ?? ''}`.trim(),
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryContent category={params.category} />;
}
