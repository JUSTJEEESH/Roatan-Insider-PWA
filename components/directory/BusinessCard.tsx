import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import type { Business } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { formatPriceRange, isOpenNow } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const category = CATEGORIES.find((c) => c.slug === business.category);
  const openNow = isOpenNow(business.hours);

  return (
    <Link href={`/listing/${business.slug}`}>
      <Card hoverable className="overflow-hidden">
        <div className="h-40 bg-coconut-dark relative">
          {business.isFeatured && (
            <Badge variant="featured" className="absolute top-2 left-2 z-10">
              Featured
            </Badge>
          )}
        </div>
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-body font-semibold text-charcoal text-base leading-tight line-clamp-1">
              {business.name}
            </h3>
            <span className="text-sm text-driftwood-light font-body flex-shrink-0">
              {formatPriceRange(business.priceRange)}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            {category && (
              <Badge variant="category" color={category.color} className="text-[10px]">
                {category.name}
              </Badge>
            )}
            <span className="flex items-center gap-1 text-xs text-driftwood-light">
              <MapPin size={12} />
              {business.area.replace(/_/g, ' ')}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <Clock size={12} className={openNow ? 'text-green-600' : 'text-driftwood-light'} />
            <span className={`text-xs font-medium ${openNow ? 'text-green-600' : 'text-driftwood-light'}`}>
              {openNow ? 'Open Now' : 'Closed'}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
