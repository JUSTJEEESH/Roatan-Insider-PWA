import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  DollarSign,
  Shield,
  Droplets,
  Sun,
  Car,
  Wifi,
  Heart,
  HandCoins,
} from 'lucide-react';
import essentialsData from '@/data/guides/essentials.json';

export const metadata: Metadata = {
  title: 'Island Essentials',
  description: 'Everything you need to know before visiting Roatan — money, safety, water, healthcare, connectivity, and tipping.',
};

const ICON_MAP: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign size={20} />,
  Shield: <Shield size={20} />,
  Droplets: <Droplets size={20} />,
  Sun: <Sun size={20} />,
  Car: <Car size={20} />,
  Wifi: <Wifi size={20} />,
  Heart: <Heart size={20} />,
  HandCoins: <HandCoins size={20} />,
};

export default function EssentialsPage() {
  const { content } = essentialsData;

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm text-driftwood hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          All guides
        </Link>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
            Island Essentials
          </h1>
          <p className="text-sm text-driftwood font-body mt-1">
            Practical tips every visitor needs — works offline.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="bg-white rounded-card shadow-card overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                <div className="w-9 h-9 rounded-full bg-seafoam flex items-center justify-center text-primary flex-shrink-0">
                  {ICON_MAP[section.icon] ?? <DollarSign size={20} />}
                </div>
                <h2 className="text-base font-display font-semibold text-charcoal">
                  {section.title}
                </h2>
              </div>
              <ul className="px-4 pb-4 space-y-2.5 mt-1">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm font-body text-driftwood leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button bg-seafoam text-primary text-sm font-body font-medium hover:bg-seafoam-dark transition-colors"
          >
            <DollarSign size={16} />
            Currency Converter
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button bg-coconut text-driftwood text-sm font-body font-medium hover:bg-coconut-dark transition-colors"
          >
            More Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
