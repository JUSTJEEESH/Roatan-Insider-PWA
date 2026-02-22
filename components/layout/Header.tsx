'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { OfflineIndicator } from './OfflineIndicator';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className={`sticky top-0 z-30 md:hidden transition-colors duration-200 ${isHome ? 'bg-transparent absolute w-full' : 'bg-white/95 backdrop-blur-md border-b border-gray-100'}`}>
      <OfflineIndicator />
      <div className="flex items-center justify-between h-14 px-5">
        <Link href="/" className="flex items-center">
          <span className={`font-display font-bold text-lg tracking-tight ${isHome ? 'text-white' : 'text-gray-900'}`}>
            Roat&aacute;n Insiders
          </span>
        </Link>
        {!isHome && (
          <Link
            href="/search"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors duration-200"
            aria-label="Search"
          >
            <Search size={20} className="text-gray-400" />
          </Link>
        )}
      </div>
    </header>
  );
}
