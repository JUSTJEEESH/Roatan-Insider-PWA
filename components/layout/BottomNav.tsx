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
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 animate-slide-up"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around h-14">
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
                    : 'text-gray-400 hover:text-gray-900'
                )}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.2 : 1.5}
                    className="transition-all duration-200"
                  />
                  {label === 'Saved' && favCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-gray-900 text-white text-[10px] font-bold px-1">
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
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-20 lg:w-60 bg-white border-r border-gray-100 flex-col"
        aria-label="Main navigation"
      >
        <div className="p-4 lg:px-5 lg:py-6 border-b border-gray-100">
          <Link href="/" className="flex items-center">
            <span className="font-display font-bold text-gray-900 text-lg tracking-tight leading-none hidden lg:block">
              Roat&aacute;n Insiders
            </span>
            <span className="font-display font-bold text-gray-900 text-sm tracking-tight lg:hidden">
              RI
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
                  'flex items-center gap-3 min-h-[44px] px-3 rounded-button relative group',
                  'transition-all duration-200 ease-out',
                  isActive
                    ? 'bg-gray-50 text-gray-900 font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2 : 1.5}
                  className="transition-all duration-200"
                />
                <span className="hidden lg:block font-body text-sm">
                  {label}
                </span>
                {label === 'Saved' && favCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 lg:relative lg:top-auto lg:right-auto lg:ml-auto min-w-[20px] h-[20px] flex items-center justify-center rounded-full bg-gray-900 text-white text-[11px] font-bold px-1">
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
