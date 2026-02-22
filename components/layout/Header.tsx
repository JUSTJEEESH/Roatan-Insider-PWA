'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Search } from 'lucide-react';
import { OfflineIndicator } from './OfflineIndicator';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className={`sticky top-0 z-30 md:hidden transition-colors duration-200 ${isHome ? 'bg-transparent absolute w-full' : 'bg-white/95 backdrop-blur-md border-b border-coconut-dark'}`}>
      <OfflineIndicator />
      <div className="flex items-center justify-between h-14 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isHome ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-br from-primary to-secondary'}`}>
            <MapPin size={18} className="text-white" />
          </div>
          <span className={`font-display font-bold text-lg ${isHome ? 'text-white' : 'text-charcoal'}`}>
            Insiders
          </span>
        </Link>
        {!isHome && (
          <Link
            href="/search"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-coconut transition-colors duration-200"
            aria-label="Search"
          >
            <Search size={20} className="text-driftwood" />
          </Link>
        )}
      </div>
    </header>
  );
}
