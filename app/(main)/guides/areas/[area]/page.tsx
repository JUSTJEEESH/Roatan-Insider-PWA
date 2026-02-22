import type { Metadata } from 'next';

interface AreaGuidePageProps {
  params: { area: string };
}

export function generateMetadata({ params }: AreaGuidePageProps): Metadata {
  const name = params.area
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return {
    title: `${name} Area Guide`,
    description: `Complete guide to ${name} in Roatán — what to do, where to eat, and insider tips.`,
  };
}

export default function AreaGuidePage({ params }: AreaGuidePageProps) {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal capitalize">
        {params.area.replace(/-/g, ' ')} Guide
      </h1>
      <p className="mt-2 text-driftwood font-body">
        Area guide coming soon.
      </p>
    </div>
  );
}
