'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Clock,
  Heart,
  MessageCircle,
  Navigation,
  Mail,
  Facebook,
  Instagram,
} from 'lucide-react';
import type { Business } from '@/lib/types';
import { getBusinessBySlug } from '@/lib/data';
import { CATEGORIES, AREAS } from '@/lib/constants';
import { formatPriceRange, isOpenNow, formatAreaName, formatPhone, cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/favorites';

function formatHour(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return m === 0 ? `${hour12} ${period}` : `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

const DAY_NAMES: (keyof Business['hours'])[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
];

const DAY_LABELS: Record<string, string> = {
  monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu',
  friday: 'Fri', saturday: 'Sat', sunday: 'Sun',
};

interface ListingContentProps {
  slug: string;
}

export function ListingContent({ slug }: ListingContentProps) {
  const business = getBusinessBySlug(slug);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

  if (!business) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Not Found</h1>
        <p className="text-gray-500 font-body mb-6">This listing could not be found.</p>
        <Link href="/explore" className="text-primary hover:underline font-body">Browse all listings</Link>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.slug === business.category);
  const area = AREAS.find((a) => a.slug === business.area);
  const openNow = isOpenNow(business.hours);
  const saved = isFavorite(business.id);

  const handleToggleFavorite = () => {
    if (saved) removeFavorite(business.id);
    else addFavorite(business.id);
  };

  return (
    <div className="pb-12">
      <div className="max-w-2xl mx-auto">
        {/* Hero Image — tall and immersive */}
        <div className="h-72 md:h-[50vh] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50 relative">
          <Link
            href={`/explore/${business.category}`}
            className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </Link>
          <button
            onClick={handleToggleFavorite}
            className={cn(
              'absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center',
              'transition-all duration-200',
              saved ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-400 hover:text-gray-600'
            )}
            aria-label={saved ? 'Remove from saved' : 'Save this place'}
          >
            <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="px-6 pt-6">
          {/* Title + Price */}
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">{business.name}</h1>
            <span className="text-lg text-gray-400 font-body flex-shrink-0">{formatPriceRange(business.priceRange)}</span>
          </div>

          {/* Subtle metadata — text only, no badges */}
          <p className="text-sm text-gray-400 mt-2">
            {category?.name} &middot; {business.subcategory} &middot; {openNow ? 'Open now' : 'Closed'}
          </p>

          {/* Description */}
          <p className="mt-6 text-gray-600 font-body leading-relaxed">{business.description}</p>

          {/* Insider Tip — left border accent */}
          {business.insiderTip && (
            <div className="mt-6 border-l-2 border-primary pl-5 py-1">
              <p className="text-sm font-medium text-gray-900 mb-1">Insider Tip</p>
              <p className="text-sm text-gray-600 font-body leading-relaxed">{business.insiderTip}</p>
            </div>
          )}

          {/* Contact buttons — outline style */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {business.phone && (
              <a href={`tel:${formatPhone(business.phone)}`} className="flex items-center justify-center gap-2 px-3 py-3 min-h-[44px] rounded-button border border-gray-200 text-gray-700 text-sm font-body font-medium hover:bg-gray-50 transition-colors">
                <Phone size={16} />Call
              </a>
            )}
            {business.whatsapp && (
              <a href={`https://wa.me/${formatPhone(business.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-3 py-3 min-h-[44px] rounded-button border border-gray-200 text-gray-700 text-sm font-body font-medium hover:bg-gray-50 transition-colors">
                <MessageCircle size={16} />WhatsApp
              </a>
            )}
            {business.website && (
              <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-3 py-3 min-h-[44px] rounded-button border border-gray-200 text-gray-700 text-sm font-body font-medium hover:bg-gray-50 transition-colors">
                <Globe size={16} />Website
              </a>
            )}
            <a href={`geo:${business.latitude},${business.longitude}?q=${encodeURIComponent(business.name)}`} className="flex items-center justify-center gap-2 px-3 py-3 min-h-[44px] rounded-button border border-gray-200 text-gray-700 text-sm font-body font-medium hover:bg-gray-50 transition-colors">
              <Navigation size={16} />Directions
            </a>
          </div>

          {/* Location & Contact */}
          <div className="mt-10 space-y-4">
            <p className="text-sm uppercase tracking-widest text-gray-400 font-medium">Location & Contact</p>
            <div className="flex items-start gap-3 text-sm text-gray-600 font-body">
              <MapPin size={18} className="flex-shrink-0 text-gray-400 mt-0.5" />
              <div>
                <p>{business.addressDescription}</p>
                <p className="text-gray-400 mt-0.5">
                  {formatAreaName(business.area)}{area && ` — ${area.vibe}`}
                </p>
              </div>
            </div>
            {business.email && (
              <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <Mail size={18} className="flex-shrink-0" /><span className="font-body">{business.email}</span>
              </a>
            )}
            {business.facebook && (
              <a href={`https://facebook.com/${business.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <Facebook size={18} className="flex-shrink-0" /><span className="font-body">{business.facebook}</span>
              </a>
            )}
            {business.instagram && (
              <a href={`https://instagram.com/${business.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <Instagram size={18} className="flex-shrink-0" /><span className="font-body">{business.instagram}</span>
              </a>
            )}
          </div>

          {/* Hours */}
          <div className="mt-10">
            <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-4">Hours</p>
            <div className="bg-gray-50 rounded-card p-5 space-y-2">
              {DAY_NAMES.map((day) => {
                const hours = business.hours[day];
                const today = DAY_NAMES[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
                const isToday = day === today;
                return (
                  <div key={day} className={cn('flex justify-between text-sm font-body', isToday ? 'text-gray-900 font-medium' : 'text-gray-500')}>
                    <span>{DAY_LABELS[day]}{isToday && ' (today)'}</span>
                    <span>{hours ? `${formatHour(hours.open)} — ${formatHour(hours.close)}` : 'Closed'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features */}
          {business.features.length > 0 && (
            <div className="mt-10">
              <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-4">Features</p>
              <div className="flex flex-wrap gap-2">
                {business.features.map((feature) => (
                  <span key={feature} className="inline-flex items-center px-3 py-1 rounded-pill text-sm font-body bg-gray-100 text-gray-600">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Map Link */}
          <div className="mt-10">
            <Link href={`/map?business=${business.slug}`} className="block bg-gray-50 border border-gray-100 rounded-card p-5 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <MapPin size={24} className="text-gray-400" />
                <div>
                  <p className="font-body font-medium text-gray-900 text-sm">View on Map</p>
                  <p className="text-xs text-gray-400 font-body">{business.latitude.toFixed(4)}, {business.longitude.toFixed(4)}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
