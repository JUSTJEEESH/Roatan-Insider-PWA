import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Ship, Clock, DollarSign, MapPin, Lightbulb, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

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
      <div className="px-4 py-16 text-center">
        <h1 className="text-2xl font-display font-bold text-charcoal mb-2">Port Not Found</h1>
        <Link href="/guides" className="text-primary hover:underline font-body">Back to Guides</Link>
      </div>
    );
  }

  const { content } = data;

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
          <div className="flex items-center gap-2 mb-2">
            <Ship size={22} className="text-primary" />
            <Badge variant="category" color="#0C6478">Cruise Guide</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
            {data.title}
          </h1>
          <p className="text-sm text-driftwood font-body mt-2 leading-relaxed">
            {content.overview}
          </p>
        </div>

        {/* Transportation */}
        <section className="mb-8">
          <h2 className="text-lg font-display font-semibold text-charcoal mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-secondary" />
            Getting Around
          </h2>
          <div className="space-y-3">
            {content.transportation.map((t) => (
              <div key={t.type} className="bg-white rounded-card shadow-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-body font-semibold text-charcoal text-sm">
                    {t.type}
                  </h3>
                  <span className="text-sm font-body font-semibold text-primary whitespace-nowrap">
                    {t.estimatedCost}
                  </span>
                </div>
                <p className="text-xs text-driftwood font-body mt-1 leading-relaxed">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Itineraries */}
        <section className="mb-8">
          <h2 className="text-lg font-display font-semibold text-charcoal mb-3 flex items-center gap-2">
            <Clock size={18} className="text-secondary" />
            Sample Itineraries
          </h2>
          <div className="space-y-5">
            {content.itineraries.map((itin) => (
              <div key={itin.name} className="bg-white rounded-card shadow-card overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-secondary px-4 py-3">
                  <h3 className="font-display font-semibold text-white text-base">
                    {itin.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/80 font-body flex items-center gap-1">
                      <Clock size={12} />
                      {itin.duration}
                    </span>
                    <span className="text-xs text-white/80 font-body flex items-center gap-1">
                      <DollarSign size={12} />
                      {itin.estimatedCost}
                    </span>
                    <Badge variant="default" className="text-[10px] bg-white/20 text-white border-0">
                      {itin.difficulty}
                    </Badge>
                  </div>
                </div>
                <ol className="p-4 space-y-2">
                  {itin.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm font-body text-driftwood">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-seafoam text-primary text-xs font-semibold flex items-center justify-center">
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
        <section className="mb-8">
          <h2 className="text-lg font-display font-semibold text-charcoal mb-3 flex items-center gap-2">
            <Lightbulb size={18} className="text-gold" />
            Insider Tips
          </h2>
          <div className="bg-gold/10 border border-gold/20 rounded-card p-4 space-y-3">
            {content.tips.map((tip, i) => (
              <div key={i} className="flex gap-2 text-sm font-body text-driftwood">
                <ChevronRight size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick links */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button bg-seafoam text-primary text-sm font-body font-medium hover:bg-seafoam-dark transition-colors"
          >
            <DollarSign size={16} />
            Currency Converter
          </Link>
          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-button bg-seafoam text-primary text-sm font-body font-medium hover:bg-seafoam-dark transition-colors"
          >
            <MapPin size={16} />
            View Map
          </Link>
        </div>
      </div>
    </div>
  );
}
