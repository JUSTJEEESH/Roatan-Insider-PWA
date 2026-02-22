'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, SlidersHorizontal, Clock } from 'lucide-react';
import { CATEGORIES, AREAS } from '@/lib/constants';
import { getBusinessesByCategory, filterBusinesses, sortBusinesses } from '@/lib/data';
import type { BusinessFilters, SortOption } from '@/lib/data';
import type { Area, Category } from '@/lib/types';
import { BusinessCard } from '@/components/directory/BusinessCard';
import { useLocation } from '@/lib/hooks/useLocation';

interface CategoryContentProps {
  category: string;
}

export function CategoryContent({ category }: CategoryContentProps) {
  const cat = CATEGORIES.find((c) => c.slug === category);
  const allBusinesses = useMemo(() => getBusinessesByCategory(category as Category), [category]);

  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [openNow, setOpenNow] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const { latitude, longitude } = useLocation();

  const filtered = useMemo(() => {
    const filters: BusinessFilters = {};
    if (selectedSubcategory) filters.subcategory = selectedSubcategory;
    if (selectedArea) filters.area = selectedArea;
    if (selectedPrice) filters.priceRange = selectedPrice as 1 | 2 | 3 | 4;
    if (openNow) filters.openNow = true;

    const result = filterBusinesses(allBusinesses, filters);
    return sortBusinesses(result, sortBy, latitude ?? undefined, longitude ?? undefined);
  }, [allBusinesses, selectedSubcategory, selectedArea, selectedPrice, openNow, sortBy, latitude, longitude]);

  const name = cat?.name ?? category.replace(/-/g, ' ');
  const hasActiveFilters = selectedSubcategory || selectedArea || selectedPrice || openNow;

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-sm text-driftwood hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          All categories
        </Link>

        <div className="mb-4">
          <div className="flex items-center gap-3">
            {cat && (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                <div style={{ color: cat.color }} className="text-lg font-bold">
                  {filtered.length}
                </div>
              </div>
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal capitalize">
                {name}
              </h1>
              {cat && (
                <p className="text-sm text-driftwood font-body mt-0.5">
                  {cat.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-button text-sm font-body transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-primary text-white'
                  : 'bg-coconut text-driftwood hover:bg-coconut-dark'
              }`}
              aria-label="Toggle filters"
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-gold" />}
            </button>

            <button
              onClick={() => setOpenNow(!openNow)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-button text-sm font-body transition-colors ${
                openNow
                  ? 'bg-green-500 text-white'
                  : 'bg-coconut text-driftwood hover:bg-coconut-dark'
              }`}
              aria-label="Toggle open now filter"
            >
              <Clock size={14} />
              Open Now
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="ml-auto px-3 py-2 min-h-[44px] rounded-button bg-coconut text-sm text-driftwood font-body border-none focus:ring-2 focus:ring-primary"
              aria-label="Sort businesses"
            >
              <option value="featured">Featured</option>
              <option value="name">Name A-Z</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              {latitude && <option value="distance">Nearest</option>}
            </select>
          </div>

          {showFilters && (
            <div className="bg-white rounded-card p-4 shadow-card space-y-3">
              {cat && cat.subcategories.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-driftwood mb-2 font-body">Type</p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSelectedSubcategory(null)}
                      className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                        !selectedSubcategory ? 'bg-primary text-white' : 'bg-coconut text-driftwood hover:bg-coconut-dark'
                      }`}
                    >
                      All
                    </button>
                    {cat.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubcategory(selectedSubcategory === sub ? null : sub)}
                        className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                          selectedSubcategory === sub ? 'bg-primary text-white' : 'bg-coconut text-driftwood hover:bg-coconut-dark'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-driftwood mb-2 font-body">Area</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedArea(null)}
                    className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                      !selectedArea ? 'bg-primary text-white' : 'bg-coconut text-driftwood hover:bg-coconut-dark'
                    }`}
                  >
                    All Areas
                  </button>
                  {AREAS.map((area) => (
                    <button
                      key={area.slug}
                      onClick={() => setSelectedArea(selectedArea === area.slug ? null : area.slug)}
                      className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                        selectedArea === area.slug ? 'bg-primary text-white' : 'bg-coconut text-driftwood hover:bg-coconut-dark'
                      }`}
                    >
                      {area.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-driftwood mb-2 font-body">Price</p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setSelectedPrice(null)}
                    className={`px-3 py-1 rounded-pill text-xs font-body transition-colors ${
                      !selectedPrice ? 'bg-primary text-white' : 'bg-coconut text-driftwood hover:bg-coconut-dark'
                    }`}
                  >
                    Any
                  </button>
                  {[1, 2, 3, 4].map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPrice(selectedPrice === p ? null : p)}
                      className={`px-3 py-1 rounded-pill text-xs font-body transition-colors ${
                        selectedPrice === p ? 'bg-primary text-white' : 'bg-coconut text-driftwood hover:bg-coconut-dark'
                      }`}
                    >
                      {'$'.repeat(p)}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSelectedSubcategory(null);
                    setSelectedArea(null);
                    setSelectedPrice(null);
                    setOpenNow(false);
                  }}
                  className="text-xs text-coral font-body hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        <p className="text-sm text-driftwood font-body mb-4">
          {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          {hasActiveFilters && ' (filtered)'}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-driftwood font-body text-lg mb-2">No listings match your filters</p>
            <p className="text-sm text-driftwood-light font-body">
              Try adjusting your filters or{' '}
              <button
                onClick={() => {
                  setSelectedSubcategory(null);
                  setSelectedArea(null);
                  setSelectedPrice(null);
                  setOpenNow(false);
                }}
                className="text-primary hover:underline"
              >
                clear all filters
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
