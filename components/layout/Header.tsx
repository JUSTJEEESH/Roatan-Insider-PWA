'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { OfflineIndicator } from './OfflineIndicator';

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 md:hidden">
      <OfflineIndicator />
      <div className="flex items-center justify-between h-14 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <MapPin size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-charcoal text-lg">
            Roat&aacute;n Insiders
          </span>
        </Link>
      </div>
    </header>
  );
}
