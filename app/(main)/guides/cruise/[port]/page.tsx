import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, DollarSign, MapPin, ChevronRight } from 'lucide-react';

import mahoganyBayData from '@/data/guides/cruise-mahogany-bay.json';
import coxenHoleData from '@/data/guides/cruise-coxen-hole.json';

const CRUISE_DATA: Record<string, typeof mahoganyBayData> = {
  'mahogany-bay': mahoganyBayData,
  'coxen-hole': coxenHoleData,
};

interface CruisePortPageProps {
  params: { port: string };
}

export function generateStaticParams() {
  return [{ port: 'mahogany-bay' }, { port: 'coxen-hole' }];
}

export function generateMetadata({ params }: CruisePortPageProps): Metadata {
  const data = CRUISE_DATA[params.port];
  return {
    title: data?.title ?? `${params.port} Cruise Guide`,
    description: data?.description ?? `Complete cruise day guide for ${params.port} port in Roatan.`,
  };
}

export default function CruisePortPage({ params }: CruisePortPageProps) {
  const data = CRUISE_DATA[params.port];

  if (!data) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Port Not Found</h1>
        <Link href="/guides" className="text-primary hover:underline font-body">Back to Guides</Link>
      </div>
    );
  }

  const { content } = data;

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
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-2">Cruise Guide</p>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
            {data.title}
          </h1>
          <p className="text-sm text-gray-500 font-body mt-3 leading-relaxed">
            {content.overview}
          </p>
        </div>

        {/* Transportation */}
        <section className="mb-10">
          <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-4">
            Getting Around
          </p>
          <div className="space-y-3">
            {content.transportation.map((t) => (
              <div key={t.type} className="bg-white border border-gray-100 rounded-card p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-body font-medium text-gray-900 text-sm">
                    {t.type}
                  </h3>
                  <span className="text-sm font-body font-semibold text-gray-900 whitespace-nowrap">
                    {t.estimatedCost}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-body mt-1 leading-relaxed">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Itineraries */}
        <section className="mb-10">
          <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-4">
            Sample Itineraries
          </p>
          <div className="space-y-6">
            {content.itineraries.map((itin) => (
              <div key={itin.name} className="bg-white border border-gray-100 rounded-card overflow-hidden">
                <div className="bg-gray-900 px-5 py-4">
                  <h3 className="font-display font-semibold text-white text-base">
                    {itin.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/60 font-body flex items-center gap-1">
                      <Clock size={12} />
                      {itin.duration}
                    </span>
                    <span className="text-xs text-white/60 font-body flex items-center gap-1">
                      <DollarSign size={12} />
                      {itin.estimatedCost}
                    </span>
                    <span className="text-xs text-white/40 font-body">
                      {itin.difficulty}
                    </span>
                  </div>
                </div>
                <ol className="p-5 space-y-3">
                  {itin.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm font-body text-gray-600">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mb-10">
          <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-4">
            Insider Tips
          </p>
          <div className="border-l-2 border-primary pl-5 space-y-3">
            {content.tips.map((tip, i) => (
              <div key={i} className="flex gap-2 text-sm font-body text-gray-600">
                <ChevronRight size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick links */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button border border-gray-200 text-gray-700 text-sm font-body font-medium hover:bg-gray-50 transition-colors"
          >
            <DollarSign size={16} />
            Currency Converter
          </Link>
          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button border border-gray-200 text-gray-700 text-sm font-body font-medium hover:bg-gray-50 transition-colors"
          >
            <MapPin size={16} />
            View Map
          </Link>
        </div>
      </div>
    </div>
  );
}
