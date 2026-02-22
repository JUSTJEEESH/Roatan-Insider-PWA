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
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-coconut-dark animate-slide-up"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
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
                  'flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 gap-0.5 relative',
                  'transition-all duration-200 ease-out',
                  isActive
                    ? 'text-primary'
                    : 'text-driftwood-light hover:text-primary'
                )}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={cn(
                      'transition-all duration-200',
                      isActive && 'drop-shadow-sm'
                    )}
                  />
                  {label === 'Saved' && favCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-coral text-white text-[10px] font-bold px-1 shadow-sm">
                      {favCount > 99 ? '99+' : favCount}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    'text-[10px] font-body leading-none transition-all duration-200',
                    isActive ? 'font-semibold' : 'font-medium'
                  )}
                >
                  {label}
                </span>
                {isActive && (
                  <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-20 lg:w-60 bg-white border-r border-coconut-dark flex-col"
        aria-label="Main navigation"
      >
        <div className="p-4 lg:px-5 lg:py-5 border-b border-coconut-dark">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-card bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
              <MapPin size={20} className="text-white" />
            </div>
            <div className="hidden lg:block">
              <span className="font-display font-bold text-charcoal text-lg leading-none">
                Roat&aacute;n
              </span>
              <span className="block text-xs text-driftwood-light font-body mt-0.5">
                Insiders
              </span>
            </div>
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
                  'flex items-center gap-3 min-h-[44px] px-3 rounded-button relative group',
                  'transition-all duration-200 ease-out',
                  isActive
                    ? 'bg-seafoam text-primary font-medium shadow-sm'
                    : 'text-driftwood hover:bg-coconut hover:text-charcoal'
                )}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full" />
                )}
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="transition-transform duration-200 group-hover:scale-105"
                />
                <span className="hidden lg:block font-body text-sm">
                  {label}
                </span>
                {label === 'Saved' && favCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 lg:relative lg:top-auto lg:right-auto lg:ml-auto min-w-[20px] h-[20px] flex items-center justify-center rounded-full bg-coral text-white text-[11px] font-bold px-1 shadow-sm">
                    {favCount > 99 ? '99+' : favCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        <div className="p-3 lg:px-4 border-t border-coconut-dark">
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-seafoam rounded-button">
            <span className="text-xs text-primary font-body">Works offline</span>
          </div>
        </div>
      </nav>
    </>
  );
}
