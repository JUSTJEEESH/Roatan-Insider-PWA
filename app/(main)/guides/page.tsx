import type { Metadata } from 'next';
import Link from 'next/link';
import { Ship, MapPin, BookOpen, ChevronRight } from 'lucide-react';
import { AREAS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Guides',
  description: 'Island guides, cruise port guides, and essential tips for visiting Roatan, Honduras.',
};

const CRUISE_PORTS = [
  {
    slug: 'mahogany-bay',
    name: 'Mahogany Bay',
    description: 'Carnival\'s private port near West Bay Beach. Chairlift, shopping village, easy beach access.',
  },
  {
    slug: 'coxen-hole',
    name: 'Coxen Hole (Town Center)',
    description: 'The capital port with authentic island life. Closer to local markets and the real Roatan.',
  },
];

export default function GuidesPage() {
  return (
    <div className="px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-1">
          Island Guides
        </h1>
        <p className="text-sm text-driftwood font-body mb-8">
          Everything you need to know — works offline.
        </p>

        {/* Cruise Day Guides */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Ship size={20} className="text-primary" />
            <h2 className="text-lg font-display font-semibold text-charcoal">
              Cruise Day Guides
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {CRUISE_PORTS.map((port) => (
              <Link
                key={port.slug}
                href={`/guides/cruise/${port.slug}`}
                className="group block bg-white rounded-card shadow-card p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-body font-semibold text-charcoal group-hover:text-primary transition-colors">
                      {port.name}
                    </h3>
                    <p className="text-xs text-driftwood font-body mt-1 leading-relaxed">
                      {port.description}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-driftwood-light flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Island Essentials */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={20} className="text-primary" />
            <h2 className="text-lg font-display font-semibold text-charcoal">
              Island Essentials
            </h2>
          </div>
          <Link
            href="/guides/essentials"
            className="group block bg-white rounded-card shadow-card p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-body font-semibold text-charcoal group-hover:text-primary transition-colors">
                  Everything You Need to Know
                </h3>
                <p className="text-xs text-driftwood font-body mt-1 leading-relaxed">
                  Money, safety, water, sunscreen, getting around, healthcare, connectivity, and tipping — the practical stuff.
                </p>
              </div>
              <ChevronRight size={18} className="text-driftwood-light flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
            </div>
          </Link>
        </section>

        {/* Area Guides */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-primary" />
            <h2 className="text-lg font-display font-semibold text-charcoal">
              Area Guides
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/guides/areas/${area.slug.replace(/_/g, '-')}`}
                className="group block bg-white rounded-card shadow-card p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-body font-semibold text-charcoal group-hover:text-primary transition-colors">
                      {area.name}
                    </h3>
                    <p className="text-[11px] text-accent font-body font-medium">{area.vibe}</p>
                    <p className="text-xs text-driftwood font-body mt-0.5">
                      Best for: {area.bestFor}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-driftwood-light flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
