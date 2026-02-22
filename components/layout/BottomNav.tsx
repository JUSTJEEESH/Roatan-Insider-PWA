'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, MapPin, Wrench, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/favorites';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/explore', label: 'Explore', icon: LayoutGrid },
  { href: '/map', label: 'Map', icon: MapPin },
  { href: '/tools', label: 'Tools', icon: Wrench },
  { href: '/saved', label: 'Saved', icon: Heart },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const favCount = useFavoritesStore((s) => s.favorites.length);

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-nav"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around h-16">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === '/'
                ? pathname === '/'
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-2 gap-0.5 relative',
                  'transition-colors duration-200',
                  isActive
                    ? 'text-primary'
                    : 'text-driftwood-light hover:text-primary'
                )}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[11px] font-body font-medium leading-none">
                  {label}
                </span>
                {label === 'Saved' && favCount > 0 && (
                  <span className="absolute -top-0.5 right-0 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-coral text-white text-[10px] font-bold px-1">
                    {favCount > 99 ? '99+' : favCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-20 lg:w-56 bg-white border-r border-gray-100 shadow-card flex-col"
        aria-label="Main navigation"
      >
        <div className="p-4 lg:px-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-card bg-primary flex items-center justify-center">
              <MapPin size={22} className="text-white" />
            </div>
            <span className="hidden lg:block font-display font-bold text-charcoal text-lg">
              Insiders
            </span>
          </Link>
        </div>
        <div className="flex-1 flex flex-col gap-1 py-4 px-2 lg:px-3">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === '/'
                ? pathname === '/'
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 min-h-[44px] px-3 rounded-button relative',
                  'transition-colors duration-200',
                  isActive
                    ? 'bg-seafoam text-primary font-medium'
                    : 'text-driftwood hover:bg-coconut hover:text-charcoal'
                )}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="hidden lg:block font-body text-sm">
                  {label}
                </span>
                {label === 'Saved' && favCount > 0 && (
                  <span className="ml-auto min-w-[20px] h-[20px] flex items-center justify-center rounded-full bg-coral text-white text-[11px] font-bold px-1">
                    {favCount > 99 ? '99+' : favCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
