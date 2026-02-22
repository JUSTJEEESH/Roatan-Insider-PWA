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
    <div className="px-6 py-8 md:py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-1">
          Travel Tools
        </h1>
        <p className="text-sm text-gray-400 font-body mb-8">
          Works offline — no internet needed.
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'converter'}
            onClick={() => setActiveTab('converter')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-card text-sm font-body font-medium transition-all',
              activeTab === 'converter'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
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
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            )}
          >
            <Calculator size={18} />
            Tip Calculator
          </button>
        </div>

        {/* Tool Content */}
        <div role="tabpanel">
          {activeTab === 'converter' && (
            <div className="space-y-10">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-5">
                  Currency Converter
                </p>
                <CurrencyConverter />
              </div>
              <WhatThingsCost />
            </div>
          )}

          {activeTab === 'tipcalc' && (
            <div className="space-y-10">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-5">
                  Tip Calculator
                </p>
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
