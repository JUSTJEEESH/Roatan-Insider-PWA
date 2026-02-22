import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Tools',
  description: 'Currency converter (USD to Lempira) and tip calculator for Roatán. Works offline.',
};

export default function ToolsPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal">
        Travel Tools
      </h1>
      <p className="mt-2 text-driftwood font-body">
        Currency converter and tip calculator coming soon.
      </p>
    </div>
  );
}
