import { MapPin, Phone, Globe, Clock, Star } from 'lucide-react';
import type { Business } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { formatPriceRange, isOpenNow } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface BusinessDetailProps {
  business: Business;
}

export function BusinessDetail({ business }: BusinessDetailProps) {
  const category = CATEGORIES.find((c) => c.slug === business.category);
  const openNow = isOpenNow(business.hours);

  return (
    <article className="max-w-2xl mx-auto">
      <div className="h-72 md:h-[50vh] bg-gray-100 rounded-card relative" />

      <div className="px-6 py-6">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
            {business.name}
          </h1>
          <span className="text-lg text-gray-400 font-body">
            {formatPriceRange(business.priceRange)}
          </span>
        </div>

        <p className="text-sm text-gray-400 mt-2">
          {category?.name} &middot; {openNow ? 'Open now' : 'Closed'}
          {business.isVerified && ' &middot; Verified'}
        </p>

        <p className="mt-6 text-gray-600 font-body leading-relaxed">
          {business.description}
        </p>

        {business.insiderTip && (
          <div className="mt-6 border-l-2 border-primary pl-5 py-1">
            <p className="text-sm font-medium text-gray-900 font-body">
              Insider Tip
            </p>
            <p className="text-sm text-gray-600 mt-1 font-body">
              {business.insiderTip}
            </p>
          </div>
        )}

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="flex-shrink-0 text-gray-400" />
            <span className="font-body">{business.addressDescription}</span>
          </div>
          {business.phone && (
            <a
              href={`tel:${business.phone}`}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Phone size={16} className="flex-shrink-0" />
              <span className="font-body">{business.phone}</span>
            </a>
          )}
          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Globe size={16} className="flex-shrink-0" />
              <span className="font-body">Website</span>
            </a>
          )}
        </div>

        {business.features.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {business.features.map((feature) => (
              <Badge key={feature}>
                {feature}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
