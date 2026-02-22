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
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 stagger-children">
      {CATEGORIES.map((cat) => {
        const Icon = ICON_MAP[cat.slug];
        return (
          <Link
            key={cat.slug}
            href={`/explore/${cat.slug}`}
            className="flex flex-col items-center gap-2.5 p-4 rounded-card bg-white shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 min-h-[96px] group"
            aria-label={`Browse ${cat.name}`}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: `${cat.color}12` }}
            >
              <Icon
                size={24}
                strokeWidth={1.8}
                style={{ color: cat.color }}
              />
            </div>
            <span className="text-xs font-body font-medium text-charcoal text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
