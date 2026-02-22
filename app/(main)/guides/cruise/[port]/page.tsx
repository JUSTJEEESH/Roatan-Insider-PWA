import type { Metadata } from 'next';

interface CruisePortPageProps {
  params: { port: string };
}

export function generateMetadata({ params }: CruisePortPageProps): Metadata {
  const name = params.port
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return {
    title: `${name} Cruise Guide`,
    description: `Complete cruise day guide for ${name} port in Roatán. Itineraries, transport, and insider tips.`,
  };
}

export default function CruisePortPage({ params }: CruisePortPageProps) {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal capitalize">
        {params.port.replace(/-/g, ' ')} Cruise Guide
      </h1>
      <p className="mt-2 text-driftwood font-body">
        Cruise port guide coming soon.
      </p>
    </div>
  );
}
