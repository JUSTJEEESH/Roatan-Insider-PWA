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
    <div className="px-6 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          All guides
        </Link>

        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
            Island Essentials
          </h1>
          <p className="text-sm text-gray-400 font-body mt-1">
            Practical tips every visitor needs — works offline.
          </p>
        </div>

        <div className="space-y-8">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="bg-white border border-gray-100 rounded-card overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 pt-5 pb-2">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                  {ICON_MAP[section.icon] ?? <DollarSign size={20} />}
                </div>
                <h2 className="text-base font-body font-medium text-gray-900">
                  {section.title}
                </h2>
              </div>
              <ul className="px-5 pb-5 space-y-2.5 mt-1">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm font-body text-gray-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button border border-gray-200 text-gray-700 text-sm font-body font-medium hover:bg-gray-50 transition-colors"
          >
            <DollarSign size={16} />
            Currency Converter
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button border border-gray-200 text-gray-700 text-sm font-body font-medium hover:bg-gray-50 transition-colors"
          >
            More Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
