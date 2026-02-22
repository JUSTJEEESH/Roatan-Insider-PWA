'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const DISMISS_KEY = 'install-prompt-dismissed-at';
const VISIT_COUNT_KEY = 'install-prompt-visit-count';
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const ENGAGEMENT_DELAY_MS = 30_000; // 30 seconds
const MIN_VISITS = 2;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if dismissed within last 7 days
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      if (elapsed < DISMISS_DURATION_MS) return;
    }

    // Track visit count
    const visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) ?? '0', 10) + 1;
    localStorage.setItem(VISIT_COUNT_KEY, visitCount.toString());

    // Show after 2nd visit immediately when prompt is available
    if (visitCount >= MIN_VISITS) {
      setShouldShow(true);
      return;
    }

    // Otherwise show after 30 seconds of engagement
    const timer = setTimeout(() => setShouldShow(true), ENGAGEMENT_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      localStorage.removeItem(DISMISS_KEY);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setDeferredPrompt(null);
    setShouldShow(false);
  };

  if (!deferredPrompt || !shouldShow) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 bg-white rounded-card shadow-xl border border-gray-100 p-4 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-card bg-seafoam flex items-center justify-center flex-shrink-0">
          <Download size={20} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-charcoal text-sm">
            Install Roat&aacute;n Insiders
          </p>
          <p className="text-xs text-driftwood mt-0.5 font-body">
            Add to your home screen for offline access
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-driftwood-light hover:text-driftwood -mt-1 -mr-1"
          aria-label="Dismiss install prompt"
        >
          <X size={18} />
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={handleInstall} className="flex-1">
          Install
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDismiss}
          className="flex-1"
        >
          Not now
        </Button>
      </div>
    </div>
  );
}
