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
      <div className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-4">Search</h1>
          <div className="h-12 bg-gray-100 rounded-card animate-pulse" />
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
    <div className="px-6 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">
          Search
        </h1>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants, dive shops, tours..."
            className="w-full pl-11 pr-10 py-3 min-h-[48px] rounded-card bg-white border border-gray-200 text-gray-900 font-body focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
            aria-label="Search businesses"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter Controls */}
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
            <div className="bg-gray-50 rounded-card p-5 space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-400 mb-2 font-body uppercase tracking-wide">Category</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                      !selectedCategory ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                      className={`px-2.5 py-1 rounded-pill text-xs font-body transition-colors ${
                        selectedCategory === cat.slug ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

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
                    setSelectedCategory(null);
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

        {/* Results */}
        <p className="text-sm text-gray-400 font-body mb-6">
          {results.length} {results.length === 1 ? 'result' : 'results'}
          {query && ` for "${query}"`}
          {hasActiveFilters && ' (filtered)'}
        </p>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 font-body text-lg mb-2">
              {query ? `No results for "${query}"` : 'No listings match your filters'}
            </p>
            <p className="text-sm text-gray-400 font-body">
              Try a different search term or{' '}
              <button onClick={clearAll} className="text-gray-600 hover:underline">
                clear all filters
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
