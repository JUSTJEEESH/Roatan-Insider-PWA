import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Map',
  description: 'Interactive map of Roatan with all businesses, beaches, and points of interest. Works offline.',
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
