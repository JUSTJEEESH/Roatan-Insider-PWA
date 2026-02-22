'use client';

import Link from 'next/link';
import { MapPin, Clock, Heart } from 'lucide-react';
import type { Business } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { cn, formatPriceRange, isOpenNow, formatAreaName } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { useFavoritesStore } from '@/store/favorites';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const category = CATEGORIES.find((c) => c.slug === business.category);
  const openNow = isOpenNow(business.hours);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const saved = isFavorite(business.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeFavorite(business.id);
    } else {
      addFavorite(business.id);
    }
  };

  return (
    <Link href={`/listing/${business.slug}`} className="block group">
      <div className="bg-white rounded-card shadow-card overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5">
        {/* Image Placeholder */}
        <div className="h-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-coconut-dark via-sand-dark to-coconut" />
          {/* Category-colored accent stripe */}
          {category && (
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ backgroundColor: category.color }}
            />
          )}
          {/* Featured badge */}
          {business.isFeatured && (
            <Badge variant="featured" className="absolute top-3 left-3 z-10 shadow-sm">
              <span className="flex items-center gap-1">Featured</span>
            </Badge>
          )}
          {/* Favorite button */}
          <button
            onClick={handleToggleFavorite}
            className={cn(
              'absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center',
              'transition-all duration-200 backdrop-blur-sm',
              saved
                ? 'bg-coral text-white shadow-sm'
                : 'bg-white/80 text-driftwood-light hover:bg-white hover:text-coral'
            )}
            aria-label={saved ? 'Remove from saved' : 'Save this place'}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
          {/* Open/Closed indicator */}
          <div className="absolute bottom-3 right-3 z-10">
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-pill text-[11px] font-medium backdrop-blur-sm',
                openNow
                  ? 'bg-green-500/90 text-white'
                  : 'bg-charcoal/60 text-white/90'
              )}
            >
              <span className={cn(
                'w-1.5 h-1.5 rounded-full',
                openNow ? 'bg-green-200' : 'bg-white/50'
              )} />
              {openNow ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-body font-semibold text-charcoal text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
              {business.name}
            </h3>
            <span className="text-sm text-driftwood-light font-body flex-shrink-0 tracking-tight">
              {formatPriceRange(business.priceRange)}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {category && (
              <Badge variant="category" color={category.color} className="text-[10px]">
                {category.name}
              </Badge>
            )}
            <span className="flex items-center gap-1 text-xs text-driftwood-light">
              <MapPin size={11} />
              {formatAreaName(business.area)}
            </span>
          </div>
          {business.features.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 overflow-hidden">
              {business.features.slice(0, 2).map((feature) => (
                <span
                  key={feature}
                  className="text-[10px] text-driftwood-light bg-sand px-1.5 py-0.5 rounded-pill whitespace-nowrap"
                >
                  {feature}
                </span>
              ))}
              {business.features.length > 2 && (
                <span className="text-[10px] text-driftwood-light">
                  +{business.features.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
