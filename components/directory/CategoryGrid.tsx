'use client';

import Link from 'next/link';
import {
  UtensilsCrossed,
  Wine,
  Waves,
  Compass,
  ShoppingBag,
  Bed,
  Key,
  Car,
  Umbrella,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import type { Category } from '@/lib/types';

const ICON_MAP: Record<Category, LucideIcon> = {
  eat: UtensilsCrossed,
  drink: Wine,
  dive: Waves,
  tours: Compass,
  shop: ShoppingBag,
  stay: Bed,
  rentals: Key,
  transport: Car,
  beaches: Umbrella,
};

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 gap-8 sm:grid-cols-4 md:grid-cols-5 stagger-children">
      {CATEGORIES.map((cat) => {
        const Icon = ICON_MAP[cat.slug];
        return (
          <Link
            key={cat.slug}
            href={`/explore/${cat.slug}`}
            className="flex flex-col items-center gap-3 py-2 group"
            aria-label={`Browse ${cat.name}`}
          >
            <Icon
              size={28}
              strokeWidth={1.5}
              className="text-gray-500 group-hover:text-primary transition-colors duration-200"
            />
            <span className="text-xs font-body font-medium text-gray-500 text-center leading-tight group-hover:text-gray-900 transition-colors duration-200">
              {cat.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
