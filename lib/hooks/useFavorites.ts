'use client';

import { useFavoritesStore } from '@/store/favorites';

export function useFavorites() {
  const { favorites, addFavorite, removeFavorite, isFavorite, count } =
    useFavoritesStore();

  const toggleFavorite = (businessId: string) => {
    if (isFavorite(businessId)) {
      removeFavorite(businessId);
    } else {
      addFavorite(businessId);
    }
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    count,
  };
}
