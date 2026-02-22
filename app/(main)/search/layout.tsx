import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search restaurants, dive shops, tours, beaches, and more across Roatan. Works offline.',
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
