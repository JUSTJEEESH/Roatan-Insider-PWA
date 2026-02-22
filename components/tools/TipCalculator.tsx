'use client';

import { useState } from 'react';
import { convertUsdToHnl } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const TIP_PRESETS = [10, 15, 18, 20];

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [splitCount, setSplitCount] = useState(1);

  const bill = parseFloat(billAmount) || 0;
  const tip = bill * (tipPercent / 100);
  const total = bill + tip;
  const perPerson = splitCount > 1 ? total / splitCount : total;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-driftwood mb-1 font-body">
          Bill Amount (USD)
        </label>
        <input
          type="number"
          inputMode="decimal"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder="0.00"
          className="w-full px-4 py-2.5 min-h-[44px] rounded-button bg-white border border-gray-200 text-charcoal font-body text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          aria-label="Bill amount in US Dollars"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-driftwood mb-1 font-body">
          Tip Percentage
        </label>
        <div className="flex gap-2">
          {TIP_PRESETS.map((pct) => (
            <Button
              key={pct}
              size="sm"
              variant={tipPercent === pct ? 'primary' : 'outline'}
              onClick={() => setTipPercent(pct)}
              className="flex-1"
            >
              {pct}%
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-driftwood mb-1 font-body">
          Split Between
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
            className={cn(
              'min-w-[44px] min-h-[44px] rounded-button border border-gray-200 text-lg font-bold',
              'transition-colors',
              splitCount <= 1 ? 'text-gray-300' : 'text-charcoal hover:bg-coconut'
            )}
            disabled={splitCount <= 1}
            aria-label="Decrease split count"
          >
            -
          </button>
          <span className="text-lg font-body font-medium text-charcoal w-8 text-center">
            {splitCount}
          </span>
          <button
            onClick={() => setSplitCount(splitCount + 1)}
            className="min-w-[44px] min-h-[44px] rounded-button border border-gray-200 text-lg font-bold text-charcoal hover:bg-coconut transition-colors"
            aria-label="Increase split count"
          >
            +
          </button>
          <span className="text-sm text-driftwood-light font-body">
            {splitCount === 1 ? 'person' : 'people'}
          </span>
        </div>
      </div>

      {bill > 0 && (
        <div className="bg-seafoam rounded-card p-4 space-y-2">
          <div className="flex justify-between text-sm font-body">
            <span className="text-driftwood">Tip</span>
            <span className="text-charcoal font-medium">
              ${tip.toFixed(2)} / L {convertUsdToHnl(tip).toFixed(0)}
            </span>
          </div>
          <div className="flex justify-between text-sm font-body">
            <span className="text-driftwood">Total</span>
            <span className="text-charcoal font-medium">
              ${total.toFixed(2)} / L {convertUsdToHnl(total).toFixed(0)}
            </span>
          </div>
          {splitCount > 1 && (
            <div className="flex justify-between text-sm font-body border-t border-primary/10 pt-2">
              <span className="text-driftwood font-medium">Per Person</span>
              <span className="text-primary font-bold">
                ${perPerson.toFixed(2)} / L {convertUsdToHnl(perPerson).toFixed(0)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
