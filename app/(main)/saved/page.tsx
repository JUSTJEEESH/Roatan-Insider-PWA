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
    <div className="px-6 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
            Saved Places
          </h1>
          <p className="text-sm text-gray-400 font-body mt-1">
            {savedBusinesses.length} {savedBusinesses.length === 1 ? 'place' : 'places'} saved
          </p>
        </div>

        {savedBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-gray-200 mb-4" />
            <h2 className="text-lg font-body font-medium text-gray-900 mb-2">
              No saved spots yet
            </h2>
            <p className="text-sm text-gray-400 font-body mb-8 max-w-sm mx-auto">
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
