import { Index } from 'flexsearch';
import type { Business } from './types';
import { formatAreaName } from './utils';

let searchIndex: Index | null = null;
let indexedBusinesses: Business[] = [];

export function buildSearchIndex(businesses: Business[]): void {
  searchIndex = new Index({
    tokenize: 'forward',
    resolution: 9,
  });

  indexedBusinesses = businesses;

  businesses.forEach((business, i) => {
    const searchableText = [
      business.name,
      business.description,
      business.category,
      business.subcategory,
      formatAreaName(business.area),
      business.insiderTip ?? '',
      business.features.join(' '),
    ].join(' ');

    searchIndex!.add(i, searchableText);
  });
}

export function searchBusinesses(query: string, limit = 50): Business[] {
  if (!searchIndex || !query.trim()) return [];

  const resultIds = searchIndex.search(query, { limit }) as number[];
  return resultIds.map((i) => indexedBusinesses[i]).filter(Boolean);
}

export function isSearchReady(): boolean {
  return searchIndex !== null;
}
