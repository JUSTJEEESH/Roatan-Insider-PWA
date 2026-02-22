'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Crosshair } from 'lucide-react';
import { getAllBusinesses } from '@/lib/data';
import { CATEGORIES } from '@/lib/constants';
import type { Category } from '@/lib/types';
import { useLocation } from '@/lib/hooks/useLocation';

const MapView = dynamic(
  () => import('@/components/map/MapView').then((mod) => ({ default: mod.MapView })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] bg-seafoam flex items-center justify-center">
        <p className="text-driftwood font-body text-sm">Loading map...</p>
      </div>
    ),
  }
);

export default function MapPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-seafoam">
        <p className="text-driftwood font-body text-sm">Loading map...</p>
      </div>
    }>
      <MapPageContent />
    </Suspense>
  );
}

function MapPageContent() {
  const searchParams = useSearchParams();
  const focusSlug = searchParams.get('business');

  const allBusinesses = useMemo(() => getAllBusinesses(), []);
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    new Set(CATEGORIES.map((c) => c.slug))
  );

  const { latitude, longitude, requestLocation } = useLocation();

  const filtered = useMemo(
    () => allBusinesses.filter((b) => activeCategories.has(b.category)),
    [allBusinesses, activeCategories]
  );

  const toggleCategory = (slug: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (activeCategories.size === CATEGORIES.length) {
      setActiveCategories(new Set());
    } else {
      setActiveCategories(new Set(CATEGORIES.map((c) => c.slug)));
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-80px)] md:h-screen">
      {/* Category filter bar */}
      <div className="absolute top-3 left-3 right-3 z-10">
        <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
          <button
            onClick={toggleAll}
            className={`flex-shrink-0 px-3 py-1.5 rounded-pill text-xs font-body font-medium transition-colors shadow-sm ${
              activeCategories.size === CATEGORIES.length
                ? 'bg-primary text-white'
                : 'bg-white text-driftwood hover:bg-coconut'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => toggleCategory(cat.slug)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-pill text-xs font-body font-medium transition-colors shadow-sm ${
                activeCategories.has(cat.slug)
                  ? 'text-white'
                  : 'bg-white text-driftwood hover:bg-coconut'
              }`}
              style={
                activeCategories.has(cat.slug)
                  ? { backgroundColor: cat.color }
                  : undefined
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapView
          businesses={filtered}
          userLat={latitude}
          userLng={longitude}
          focusSlug={focusSlug}
        />
      </div>

      {/* My Location button */}
      <button
        onClick={requestLocation}
        className="absolute bottom-24 md:bottom-6 right-4 z-10 w-12 h-12 rounded-full bg-white shadow-card flex items-center justify-center text-primary hover:bg-seafoam transition-colors"
        aria-label="Go to my location"
      >
        <Crosshair size={22} />
      </button>

      {/* Business count */}
      <div className="absolute bottom-24 md:bottom-6 left-4 z-10">
        <span className="bg-white/90 backdrop-blur-sm rounded-pill px-3 py-1.5 text-xs font-body text-driftwood shadow-sm">
          {filtered.length} places shown
        </span>
      </div>
    </div>
  );
}
