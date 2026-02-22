import type { Business } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { formatPriceRange, formatAreaName } from '@/lib/utils';

interface LocalBusinessJsonLdProps {
  business: Business;
}

export function LocalBusinessJsonLd({ business }: LocalBusinessJsonLdProps) {
  const category = CATEGORIES.find((c) => c.slug === business.category);
  const isBeach = business.category === 'beaches';

  const priceMap: Record<number, string> = {
    1: '$',
    2: '$$',
    3: '$$$',
    4: '$$$$',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isBeach ? 'TouristAttraction' : 'LocalBusiness',
    name: business.name,
    description: business.description,
    ...(business.phone && { telephone: business.phone }),
    ...(business.email && { email: business.email }),
    ...(business.website && { url: business.website }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: formatAreaName(business.area),
      addressRegion: 'Roatan',
      addressCountry: 'HN',
      description: business.addressDescription,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.latitude,
      longitude: business.longitude,
    },
    priceRange: priceMap[business.priceRange] ?? '$$',
    ...(category && {
      additionalType: category.name,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
