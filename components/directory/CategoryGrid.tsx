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
    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5">
      {CATEGORIES.map((cat) => {
        const Icon = ICON_MAP[cat.slug];
        return (
          <Link
            key={cat.slug}
            href={`/explore/${cat.slug}`}
            className="flex flex-col items-center gap-2 p-4 rounded-card bg-coconut hover:bg-coconut-dark transition-colors duration-200 min-h-[88px] min-w-[44px]"
            aria-label={`Browse ${cat.name}`}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${cat.color}15` }}
            >
              <Icon size={22} style={{ color: cat.color }} />
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
