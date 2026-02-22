import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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
    <div className="px-6 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-1">
          Island Guides
        </h1>
        <p className="text-sm text-gray-400 font-body mb-12">
          Everything you need to know — works offline.
        </p>

        {/* Cruise Day Guides */}
        <section className="mb-12">
          <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-4">
            Cruise Day Guides
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {CRUISE_PORTS.map((port) => (
              <Link
                key={port.slug}
                href={`/guides/cruise/${port.slug}`}
                className="group block bg-white border border-gray-100 rounded-card p-5 hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-body font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {port.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-body mt-1 leading-relaxed">
                      {port.description}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 flex-shrink-0 mt-0.5 group-hover:text-gray-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Island Essentials */}
        <section className="mb-12">
          <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-4">
            Island Essentials
          </p>
          <Link
            href="/guides/essentials"
            className="group block bg-white border border-gray-100 rounded-card p-5 hover:shadow-card-hover transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-body font-medium text-gray-900 group-hover:text-primary transition-colors">
                  Everything You Need to Know
                </h3>
                <p className="text-xs text-gray-400 font-body mt-1 leading-relaxed">
                  Money, safety, water, sunscreen, getting around, healthcare, connectivity, and tipping — the practical stuff.
                </p>
              </div>
              <ChevronRight size={18} className="text-gray-300 flex-shrink-0 mt-0.5 group-hover:text-gray-600 transition-colors" />
            </div>
          </Link>
        </section>

        {/* Area Guides */}
        <section>
          <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-4">
            Area Guides
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/guides/areas/${area.slug.replace(/_/g, '-')}`}
                className="group block bg-white border border-gray-100 rounded-card p-5 hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-body font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {area.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-body font-medium mt-0.5">{area.vibe}</p>
                    <p className="text-xs text-gray-400 font-body mt-0.5">
                      Best for: {area.bestFor}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 flex-shrink-0 mt-0.5 group-hover:text-gray-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
