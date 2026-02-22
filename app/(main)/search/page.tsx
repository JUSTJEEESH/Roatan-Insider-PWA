'use client';

import { Suspense, useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, Clock, X } from 'lucide-react';
import { getAllBusinesses, filterBusinesses, sortBusinesses } from '@/lib/data';
import type { BusinessFilters, SortOption } from '@/lib/data';
import { buildSearchIndex, searchBusinesses, isSearchReady } from '@/lib/search';
import { CATEGORIES, AREAS } from '@/lib/constants';
import type { Category, Area } from '@/lib/types';
import { BusinessCard } from '@/components/directory/BusinessCard';
import { useLocation } from '@/lib/hooks/useLocation';

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-charcoal mb-4">Search</h1>
          <div className="h-12 bg-coconut rounded-card animate-pulse" />
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [openNow, setOpenNow] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [indexReady, setIndexReady] = useState(false);

  const { latitude, longitude } = useLocation();
  const allBusinesses = useMemo(() => getAllBusinesses(), []);

  useEffect(() => {
    if (!isSearchReady()) {
      buildSearchIndex(allBusinesses);
    }
    setIndexReady(true);
  }, [allBusinesses]);

  const results = useMemo(() => {
    if (!indexReady) return [];

    let businesses = query.trim()
      ? searchBusinesses(query)
      : allBusinesses;

    const filters: BusinessFilters = {};
    if (selectedCategory) filters.category = selectedCategory;
    if (selectedArea) filters.area = selectedArea;
    if (selectedPrice) filters.priceRange = selectedPrice as 1 | 2 | 3 | 4;
    if (openNow) filters.openNow = true;

    businesses = filterBusinesses(businesses, filters);
    return sortBusinesses(businesses, sortBy, latitude ?? undefined, longitude ?? undefined);
  }, [query, selectedCategory, selectedArea, selectedPrice, openNow, sortBy, latitude, longitude, indexReady, allBusinesses]);

  const hasActiveFilters = selectedCategory || selectedArea || selectedPrice || openNow;

  const clearAll = useCallback(() => {
    setQuery('');
    setSelectedCategory(null);
    setSelectedArea(null);
    setSelectedPrice(null);
    setOpenNow(false);
  }, []);

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-4">
          Search
        </h1>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-driftwood-light pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants, dive shops, tours..."
            className="w-full pl-10 pr-10 py-3 min-h-[48px] rounded-card bg-white border border-gray-200 text-charcoal font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            aria-label="Search businesses"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-driftwood-light hover:text-charcoal transition-colors"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter Controls */}
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
              aria-label="Sort results"
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
              {/* Category filter */}
              <div>
                <p className="text-xs font-medium text-driftwood mb-2 font-body">Category</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                      !selectedCategory
                        ? 'bg-primary text-white'
                        : 'bg-coconut text-driftwood hover:bg-coconut-dark'
                    }`}
                  >
                    All
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                      className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-primary text-white'
                          : 'bg-coconut text-driftwood hover:bg-coconut-dark'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area filter */}
              <div>
                <p className="text-xs font-medium text-driftwood mb-2 font-body">Area</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedArea(null)}
                    className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                      !selectedArea
                        ? 'bg-primary text-white'
                        : 'bg-coconut text-driftwood hover:bg-coconut-dark'
                    }`}
                  >
                    All Areas
                  </button>
                  {AREAS.map((area) => (
                    <button
                      key={area.slug}
                      onClick={() => setSelectedArea(selectedArea === area.slug ? null : area.slug)}
                      className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                        selectedArea === area.slug
                          ? 'bg-primary text-white'
                          : 'bg-coconut text-driftwood hover:bg-coconut-dark'
                      }`}
                    >
                      {area.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price filter */}
              <div>
                <p className="text-xs font-medium text-driftwood mb-2 font-body">Price</p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setSelectedPrice(null)}
                    className={`px-3 py-1 rounded-pill text-xs font-body transition-colors ${
                      !selectedPrice
                        ? 'bg-primary text-white'
                        : 'bg-coconut text-driftwood hover:bg-coconut-dark'
                    }`}
                  >
                    Any
                  </button>
                  {[1, 2, 3, 4].map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPrice(selectedPrice === p ? null : p)}
                      className={`px-3 py-1 rounded-pill text-xs font-body transition-colors ${
                        selectedPrice === p
                          ? 'bg-primary text-white'
                          : 'bg-coconut text-driftwood hover:bg-coconut-dark'
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
                    setSelectedCategory(null);
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

        {/* Results */}
        <p className="text-sm text-driftwood font-body mb-4">
          {results.length} {results.length === 1 ? 'result' : 'results'}
          {query && ` for "${query}"`}
          {hasActiveFilters && ' (filtered)'}
        </p>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-driftwood font-body text-lg mb-2">
              {query ? `No results for "${query}"` : 'No listings match your filters'}
            </p>
            <p className="text-sm text-driftwood-light font-body">
              Try a different search term or{' '}
              <button onClick={clearAll} className="text-primary hover:underline">
                clear all filters
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
