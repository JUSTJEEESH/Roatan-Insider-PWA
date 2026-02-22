import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Places',
  description: 'Your saved favorite spots on Roatan — restaurants, beaches, dive shops, and more. Available offline.',
};

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
