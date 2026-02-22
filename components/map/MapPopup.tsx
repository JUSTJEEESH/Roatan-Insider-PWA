import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { Business } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { formatPriceRange } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface MapPopupProps {
  business: Business;
}

export function MapPopup({ business }: MapPopupProps) {
  const category = CATEGORIES.find((c) => c.slug === business.category);

  return (
    <div className="w-56 p-2">
      <div className="h-24 bg-coconut-dark rounded-button mb-2" />
      <h3 className="font-body font-semibold text-charcoal text-sm leading-tight">
        {business.name}
      </h3>
      <div className="flex items-center gap-1.5 mt-1">
        {category && (
          <Badge variant="category" color={category.color} className="text-[10px]">
            {category.name}
          </Badge>
        )}
        <span className="text-xs text-driftwood-light">
          {formatPriceRange(business.priceRange)}
        </span>
      </div>
      <div className="flex items-center gap-1 mt-1 text-xs text-driftwood-light">
        <MapPin size={11} />
        <span>{business.area.replace(/_/g, ' ')}</span>
      </div>
      <Link
        href={`/listing/${business.slug}`}
        className="mt-2 block text-center text-xs font-medium text-primary hover:text-primary-dark py-1.5 bg-seafoam rounded-button transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}
