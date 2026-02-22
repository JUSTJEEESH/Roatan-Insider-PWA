'use client';

import type { Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';

interface MapMarkerProps {
  category: Category;
  name: string;
}

export function MapMarker({ category, name }: MapMarkerProps) {
  const cat = CATEGORIES.find((c) => c.slug === category);
  const color = cat?.color ?? '#607D8B';

  return (
    <div
      className="w-8 h-8 rounded-full border-2 border-white shadow-card flex items-center justify-center"
      style={{ backgroundColor: color }}
      title={name}
      aria-label={`${name} map marker`}
    >
      <span className="text-white text-xs font-bold">
        {name.charAt(0)}
      </span>
    </div>
  );
}
