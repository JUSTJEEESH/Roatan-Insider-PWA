import type { Business, Category, Area, PriceRange } from './types';
import { isOpenNow, getDistanceKm } from './utils';
import businessesData from '@/data/businesses.json';

const allBusinesses = businessesData as Business[];

export function getAllBusinesses(): Business[] {
  return allBusinesses.filter((b) => b.status === 'active');
}

export function getBusinessBySlug(slug: string): Business | undefined {
  return allBusinesses.find((b) => b.slug === slug);
}

export function getBusinessesByCategory(category: Category): Business[] {
  return allBusinesses.filter(
    (b) => b.category === category && b.status === 'active'
  );
}

export function getAllSlugs(): string[] {
  return allBusinesses.map((b) => b.slug);
}

export interface BusinessFilters {
  category?: Category;
  area?: Area;
  priceRange?: PriceRange;
  subcategory?: string;
  openNow?: boolean;
  query?: string;
}

export function filterBusinesses(
  businesses: Business[],
  filters: BusinessFilters
): Business[] {
  let result = businesses;

  if (filters.category) {
    result = result.filter((b) => b.category === filters.category);
  }
  if (filters.area) {
    result = result.filter((b) => b.area === filters.area);
  }
  if (filters.priceRange) {
    result = result.filter((b) => b.priceRange === filters.priceRange);
  }
  if (filters.subcategory) {
    result = result.filter((b) => b.subcategory === filters.subcategory);
  }
  if (filters.openNow) {
    result = result.filter((b) => isOpenNow(b.hours));
  }

  return result;
}

export type SortOption = 'featured' | 'name' | 'price_asc' | 'price_desc' | 'distance';

export function sortBusinesses(
  businesses: Business[],
  sortBy: SortOption,
  userLat?: number,
  userLng?: number
): Business[] {
  const sorted = [...businesses];

  switch (sortBy) {
    case 'featured':
      sorted.sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'price_asc':
      sorted.sort((a, b) => a.priceRange - b.priceRange);
      break;
    case 'price_desc':
      sorted.sort((a, b) => b.priceRange - a.priceRange);
      break;
    case 'distance':
      if (userLat !== undefined && userLng !== undefined) {
        sorted.sort((a, b) => {
          const distA = getDistanceKm(userLat, userLng, a.latitude, a.longitude);
          const distB = getDistanceKm(userLat, userLng, b.latitude, b.longitude);
          return distA - distB;
        });
      }
      break;
  }

  return sorted;
}
