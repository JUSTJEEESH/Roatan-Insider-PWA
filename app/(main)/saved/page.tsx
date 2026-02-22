'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Heart, Compass } from 'lucide-react';
import { useFavoritesStore } from '@/store/favorites';
import { getAllBusinesses } from '@/lib/data';
import { BusinessCard } from '@/components/directory/BusinessCard';

export default function SavedPage() {
  const { favorites } = useFavoritesStore();
  const allBusinesses = useMemo(() => getAllBusinesses(), []);

  const savedBusinesses = useMemo(
    () => allBusinesses.filter((b) => favorites.includes(b.id)),
    [allBusinesses, favorites]
  );

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Heart size={24} className="text-coral" />
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
              Saved Places
            </h1>
            <p className="text-sm text-driftwood font-body">
              {savedBusinesses.length} {savedBusinesses.length === 1 ? 'place' : 'places'} saved
            </p>
          </div>
        </div>

        {savedBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart size={48} className="mx-auto text-coconut-dark mb-4" />
            <h2 className="text-lg font-display font-semibold text-charcoal mb-2">
              No saved spots yet
            </h2>
            <p className="text-sm text-driftwood font-body mb-6 max-w-sm mx-auto">
              Tap the heart icon on any listing to save it here for quick access — even offline.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-button bg-primary text-white font-body font-medium hover:bg-primary-dark transition-colors"
            >
              <Compass size={18} />
              Explore Places
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
