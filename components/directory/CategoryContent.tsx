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
    <div className="px-6 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          All categories
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 capitalize">
            {name}
          </h1>
          {cat && (
            <p className="text-sm text-gray-400 font-body mt-1">
              {cat.description}
            </p>
          )}
        </div>

        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-button text-sm font-body transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label="Toggle filters"
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-white" />}
            </button>

            <button
              onClick={() => setOpenNow(!openNow)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-button text-sm font-body transition-colors ${
                openNow
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label="Toggle open now filter"
            >
              <Clock size={14} />
              Open Now
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="ml-auto px-3 py-2 min-h-[44px] rounded-button bg-gray-50 text-sm text-gray-600 font-body border border-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none"
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
            <div className="bg-gray-50 rounded-card p-5 space-y-4">
              {cat && cat.subcategories.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-2 font-body uppercase tracking-wide">Type</p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSelectedSubcategory(null)}
                      className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                        !selectedSubcategory ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    {cat.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubcategory(selectedSubcategory === sub ? null : sub)}
                        className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                          selectedSubcategory === sub ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-gray-400 mb-2 font-body uppercase tracking-wide">Area</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedArea(null)}
                    className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                      !selectedArea ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All Areas
                  </button>
                  {AREAS.map((area) => (
                    <button
                      key={area.slug}
                      onClick={() => setSelectedArea(selectedArea === area.slug ? null : area.slug)}
                      className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                        selectedArea === area.slug ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {area.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 mb-2 font-body uppercase tracking-wide">Price</p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setSelectedPrice(null)}
                    className={`px-3 py-1 rounded-pill text-xs font-body transition-colors ${
                      !selectedPrice ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Any
                  </button>
                  {[1, 2, 3, 4].map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPrice(selectedPrice === p ? null : p)}
                      className={`px-3 py-1 rounded-pill text-xs font-body transition-colors ${
                        selectedPrice === p ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
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
                  className="text-xs text-gray-400 font-body hover:text-gray-600 hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        <p className="text-sm text-gray-400 font-body mb-6">
          {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          {hasActiveFilters && ' (filtered)'}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 font-body text-lg mb-2">No listings match your filters</p>
            <p className="text-sm text-gray-400 font-body">
              Try adjusting your filters or{' '}
              <button
                onClick={() => {
                  setSelectedSubcategory(null);
                  setSelectedArea(null);
                  setSelectedPrice(null);
                  setOpenNow(false);
                }}
                className="text-gray-600 hover:underline"
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
