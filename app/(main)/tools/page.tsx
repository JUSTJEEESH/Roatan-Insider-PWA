'use client';

import { useState } from 'react';
import { ArrowRightLeft, Calculator } from 'lucide-react';
import { CurrencyConverter } from '@/components/tools/CurrencyConverter';
import { TipCalculator } from '@/components/tools/TipCalculator';
import { WhatThingsCost } from '@/components/tools/WhatThingsCost';
import { TippingGuide } from '@/components/tools/TippingGuide';
import { cn } from '@/lib/utils';

type ToolTab = 'converter' | 'tipcalc';

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<ToolTab>('converter');

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-1">
          Travel Tools
        </h1>
        <p className="text-sm text-driftwood font-body mb-5">
          Works offline — no internet needed.
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'converter'}
            onClick={() => setActiveTab('converter')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-card text-sm font-body font-medium transition-all',
              activeTab === 'converter'
                ? 'bg-primary text-white shadow-card'
                : 'bg-coconut text-driftwood hover:bg-coconut-dark'
            )}
          >
            <ArrowRightLeft size={18} />
            Currency
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'tipcalc'}
            onClick={() => setActiveTab('tipcalc')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-card text-sm font-body font-medium transition-all',
              activeTab === 'tipcalc'
                ? 'bg-primary text-white shadow-card'
                : 'bg-coconut text-driftwood hover:bg-coconut-dark'
            )}
          >
            <Calculator size={18} />
            Tip Calculator
          </button>
        </div>

        {/* Tool Content */}
        <div role="tabpanel">
          {activeTab === 'converter' && (
            <div className="space-y-8">
              <div className="bg-white rounded-card shadow-card p-5">
                <h2 className="text-lg font-display font-semibold text-charcoal mb-4">
                  Currency Converter
                </h2>
                <CurrencyConverter />
              </div>
              <WhatThingsCost />
            </div>
          )}

          {activeTab === 'tipcalc' && (
            <div className="space-y-8">
              <div className="bg-white rounded-card shadow-card p-5">
                <h2 className="text-lg font-display font-semibold text-charcoal mb-4">
                  Tip Calculator
                </h2>
                <TipCalculator />
              </div>
              <TippingGuide />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
