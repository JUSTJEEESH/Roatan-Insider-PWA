'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import type { Business } from '@/lib/types';
import { cn, formatPriceRange, formatAreaName } from '@/lib/utils';
import { useFavoritesStore } from '@/store/favorites';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
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
      <div className="bg-white rounded-card overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-card-hover">
        {/* Image */}
        <div className="h-52 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50" />
          {/* Favorite button */}
          <button
            onClick={handleToggleFavorite}
            className={cn(
              'absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center',
              'transition-all duration-200',
              saved
                ? 'bg-gray-900 text-white'
                : 'bg-white/90 text-gray-400 hover:text-gray-600'
            )}
            aria-label={saved ? 'Remove from saved' : 'Save this place'}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Content — minimal */}
        <div className="px-1 pt-3 pb-1">
          <h3 className="font-body font-semibold text-gray-900 text-base leading-tight line-clamp-1">
            {business.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {formatAreaName(business.area)} &middot; {formatPriceRange(business.priceRange)}
          </p>
        </div>
      </div>
    </Link>
  );
}
