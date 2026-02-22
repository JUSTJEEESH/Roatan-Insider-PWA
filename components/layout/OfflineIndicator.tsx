'use client';

import { WifiOff } from 'lucide-react';
import { useOffline } from '@/lib/hooks/useOffline';

export function OfflineIndicator() {
  const isOffline = useOffline();

  if (!isOffline) return null;

  return (
    <div
      className="bg-gold/10 border-b border-gold/20 px-4 py-2 flex items-center gap-2"
      role="status"
      aria-live="polite"
    >
      <WifiOff size={16} className="text-gold flex-shrink-0" />
      <p className="text-sm text-driftwood font-body">
        You&apos;re offline &mdash; showing saved content
      </p>
    </div>
  );
}
