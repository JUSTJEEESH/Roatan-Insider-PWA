import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { Business } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { formatPriceRange } from '@/lib/utils';

interface MapPopupProps {
  business: Business;
}

export function MapPopup({ business }: MapPopupProps) {
  const category = CATEGORIES.find((c) => c.slug === business.category);

  return (
    <div className="w-56 p-2">
      <div className="h-24 bg-gray-100 rounded-button mb-2" />
      <h3 className="font-body font-semibold text-gray-900 text-sm leading-tight">
        {business.name}
      </h3>
      <div className="flex items-center gap-1.5 mt-1">
        {category && (
          <span className="inline-block text-[10px] px-1.5 py-0.5 rounded-pill bg-gray-100 text-gray-600 font-medium">
            {category.name}
          </span>
        )}
        <span className="text-xs text-gray-400">
          {formatPriceRange(business.priceRange)}
        </span>
      </div>
      <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
        <MapPin size={11} />
        <span>{business.area.replace(/_/g, ' ')}</span>
      </div>
      <Link
        href={`/listing/${business.slug}`}
        className="mt-2 block text-center text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 py-1.5 rounded-button transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}
