import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Tools',
  description: 'Currency converter (USD to Lempira) and tip calculator for Roatan. Works offline — no internet needed.',
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
