'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Clock,
  Star,
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
import { Badge } from '@/components/ui/Badge';
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
      <div className="px-4 py-16 text-center">
        <h1 className="text-2xl font-display font-bold text-charcoal mb-2">Not Found</h1>
        <p className="text-driftwood font-body mb-4">This listing could not be found.</p>
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
    <div className="pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="h-56 md:h-72 bg-gradient-to-br from-coconut-dark via-sand-dark to-coconut relative">
          {category && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ backgroundColor: category.color }} />
          )}
          <Link
            href={`/explore/${business.category}`}
            className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-charcoal hover:bg-white transition-colors shadow-sm"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </Link>
          <button
            onClick={handleToggleFavorite}
            className={cn(
              'absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center',
              'transition-all duration-200 backdrop-blur-sm shadow-sm',
              saved ? 'bg-coral text-white' : 'bg-white/80 text-driftwood hover:bg-white hover:text-coral'
            )}
            aria-label={saved ? 'Remove from saved' : 'Save this place'}
          >
            <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
          </button>
          {business.isFeatured && (
            <Badge variant="featured" className="absolute bottom-4 left-4 z-10 shadow-sm">Featured</Badge>
          )}
        </div>

        <div className="px-4 pt-4">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">{business.name}</h1>
            <span className="text-lg text-driftwood font-body flex-shrink-0">{formatPriceRange(business.priceRange)}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            {category && <Badge variant="category" color={category.color}>{category.name}</Badge>}
            <Badge variant="default" className="text-xs">{business.subcategory}</Badge>
            <Badge variant={openNow ? 'status' : 'default'}>
              <Clock size={12} className="mr-1" />{openNow ? 'Open Now' : 'Closed'}
            </Badge>
            {business.isVerified && (
              <Badge variant="default"><Star size={12} className="mr-1" />Verified</Badge>
            )}
          </div>

          <p className="mt-4 text-driftwood font-body leading-relaxed">{business.description}</p>

          {business.insiderTip && (
            <div className="mt-4 p-4 bg-gold/10 border border-gold/20 rounded-card">
              <p className="text-sm font-semibold text-charcoal font-display mb-1">Insider Tip</p>
              <p className="text-sm text-driftwood font-body leading-relaxed">{business.insiderTip}</p>
            </div>
          )}

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {business.phone && (
              <a href={`tel:${formatPhone(business.phone)}`} className="flex items-center justify-center gap-2 px-3 py-3 min-h-[44px] rounded-button bg-primary text-white text-sm font-body font-medium hover:bg-primary-dark transition-colors">
                <Phone size={16} />Call
              </a>
            )}
            {business.whatsapp && (
              <a href={`https://wa.me/${formatPhone(business.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-3 py-3 min-h-[44px] rounded-button bg-green-500 text-white text-sm font-body font-medium hover:bg-green-600 transition-colors">
                <MessageCircle size={16} />WhatsApp
              </a>
            )}
            {business.website && (
              <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-3 py-3 min-h-[44px] rounded-button bg-secondary text-white text-sm font-body font-medium hover:bg-secondary-dark transition-colors">
                <Globe size={16} />Website
              </a>
            )}
            <a href={`geo:${business.latitude},${business.longitude}?q=${encodeURIComponent(business.name)}`} className="flex items-center justify-center gap-2 px-3 py-3 min-h-[44px] rounded-button bg-accent text-white text-sm font-body font-medium hover:bg-accent-dark transition-colors">
              <Navigation size={16} />Directions
            </a>
          </div>

          <div className="mt-6 space-y-3">
            <h2 className="text-lg font-display font-semibold text-charcoal">Location & Contact</h2>
            <div className="flex items-start gap-3 text-sm text-driftwood font-body">
              <MapPin size={18} className="flex-shrink-0 text-primary mt-0.5" />
              <div>
                <p>{business.addressDescription}</p>
                <p className="text-driftwood-light mt-0.5">
                  {formatAreaName(business.area)}{area && ` — ${area.vibe}`}
                </p>
              </div>
            </div>
            {business.email && (
              <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-sm text-secondary hover:text-primary transition-colors">
                <Mail size={18} className="flex-shrink-0" /><span className="font-body">{business.email}</span>
              </a>
            )}
            {business.facebook && (
              <a href={`https://facebook.com/${business.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-secondary hover:text-primary transition-colors">
                <Facebook size={18} className="flex-shrink-0" /><span className="font-body">{business.facebook}</span>
              </a>
            )}
            {business.instagram && (
              <a href={`https://instagram.com/${business.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-secondary hover:text-primary transition-colors">
                <Instagram size={18} className="flex-shrink-0" /><span className="font-body">{business.instagram}</span>
              </a>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-display font-semibold text-charcoal mb-3">Hours</h2>
            <div className="bg-coconut rounded-card p-4 space-y-1.5">
              {DAY_NAMES.map((day) => {
                const hours = business.hours[day];
                const today = DAY_NAMES[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
                const isToday = day === today;
                return (
                  <div key={day} className={cn('flex justify-between text-sm font-body', isToday ? 'text-primary font-semibold' : 'text-driftwood')}>
                    <span>{DAY_LABELS[day]}{isToday && ' (today)'}</span>
                    <span>{hours ? `${formatHour(hours.open)} — ${formatHour(hours.close)}` : 'Closed'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {business.features.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-display font-semibold text-charcoal mb-3">Features</h2>
              <div className="flex flex-wrap gap-2">
                {business.features.map((feature) => (
                  <Badge key={feature} variant="default" className="text-sm">{feature}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <Link href={`/map?business=${business.slug}`} className="block bg-seafoam rounded-card p-4 hover:bg-seafoam-dark transition-colors">
              <div className="flex items-center gap-3">
                <MapPin size={24} className="text-primary" />
                <div>
                  <p className="font-body font-medium text-charcoal text-sm">View on Map</p>
                  <p className="text-xs text-driftwood font-body">{business.latitude.toFixed(4)}, {business.longitude.toFixed(4)}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
