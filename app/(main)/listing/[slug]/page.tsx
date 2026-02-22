import type { Metadata } from 'next';
import { getBusinessBySlug, getAllSlugs } from '@/lib/data';
import { CATEGORIES } from '@/lib/constants';
import { formatAreaName } from '@/lib/utils';
import { ListingContent } from '@/components/directory/ListingContent';
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd';

interface ListingPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ListingPageProps): Metadata {
  const business = getBusinessBySlug(params.slug);
  if (!business) {
    return { title: 'Not Found' };
  }
  const cat = CATEGORIES.find((c) => c.slug === business.category);
  return {
    title: business.name,
    description: `${business.name} — ${cat?.name ?? business.category} in ${formatAreaName(business.area)}, Roatan. ${business.description.slice(0, 120)}...`,
  };
}

export default function ListingPage({ params }: ListingPageProps) {
  const business = getBusinessBySlug(params.slug);

  return (
    <>
      {business && <LocalBusinessJsonLd business={business} />}
      <ListingContent slug={params.slug} />
    </>
  );
}
