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
      <div className="h-56 md:h-72 bg-coconut-dark rounded-card relative" />

      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
            {business.name}
          </h1>
          <span className="text-lg text-driftwood font-body">
            {formatPriceRange(business.priceRange)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          {category && (
            <Badge variant="category" color={category.color}>
              {category.name}
            </Badge>
          )}
          <Badge variant={openNow ? 'status' : 'default'}>
            <Clock size={12} className="mr-1" />
            {openNow ? 'Open Now' : 'Closed'}
          </Badge>
          {business.isVerified && (
            <Badge variant="default">
              <Star size={12} className="mr-1" />
              Verified
            </Badge>
          )}
        </div>

        <p className="mt-4 text-driftwood font-body leading-relaxed">
          {business.description}
        </p>

        {business.insiderTip && (
          <div className="mt-4 p-3 bg-gold/10 border border-gold/20 rounded-button">
            <p className="text-sm font-medium text-charcoal font-body">
              Insider Tip
            </p>
            <p className="text-sm text-driftwood mt-1 font-body">
              {business.insiderTip}
            </p>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-driftwood">
            <MapPin size={16} className="flex-shrink-0 text-primary" />
            <span className="font-body">{business.addressDescription}</span>
          </div>
          {business.phone && (
            <a
              href={`tel:${business.phone}`}
              className="flex items-center gap-2 text-sm text-secondary hover:text-primary"
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
              className="flex items-center gap-2 text-sm text-secondary hover:text-primary"
            >
              <Globe size={16} className="flex-shrink-0" />
              <span className="font-body">Website</span>
            </a>
          )}
        </div>

        {business.features.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {business.features.map((feature) => (
              <Badge key={feature} variant="default">
                {feature}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
