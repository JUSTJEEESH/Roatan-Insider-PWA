'use client';

import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { convertUsdToHnl, convertHnlToUsd } from '@/lib/utils';
import { EXCHANGE_RATE_USD_TO_HNL } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [isUsdToHnl, setIsUsdToHnl] = useState(true);

  const numericAmount = parseFloat(amount) || 0;
  const converted = isUsdToHnl
    ? convertUsdToHnl(numericAmount)
    : convertHnlToUsd(numericAmount);

  const quickAmounts = isUsdToHnl ? [5, 10, 20, 50, 100] : [100, 250, 500, 1000, 2500];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-driftwood-light font-body">
        <span>Rate: 1 USD = {EXCHANGE_RATE_USD_TO_HNL} HNL</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-driftwood mb-1 font-body">
            {isUsdToHnl ? 'USD ($)' : 'HNL (L)'}
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2.5 min-h-[44px] rounded-button bg-white border border-gray-200 text-charcoal font-body text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            aria-label={`Amount in ${isUsdToHnl ? 'US Dollars' : 'Honduran Lempiras'}`}
          />
        </div>

        <button
          onClick={() => setIsUsdToHnl(!isUsdToHnl)}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-seafoam text-primary hover:bg-seafoam-dark transition-colors mt-5"
          aria-label="Swap currencies"
        >
          <ArrowRightLeft size={20} />
        </button>

        <div className="flex-1">
          <label className="block text-sm font-medium text-driftwood mb-1 font-body">
            {isUsdToHnl ? 'HNL (L)' : 'USD ($)'}
          </label>
          <div className="w-full px-4 py-2.5 min-h-[44px] rounded-button bg-coconut border border-gray-200 text-charcoal font-body text-lg">
            {numericAmount > 0
              ? `${isUsdToHnl ? 'L' : '$'} ${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : '0.00'}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {quickAmounts.map((qa) => (
          <Button
            key={qa}
            size="sm"
            variant="outline"
            onClick={() => setAmount(qa.toString())}
            className="text-sm"
          >
            {isUsdToHnl ? `$${qa}` : `L${qa}`}
          </Button>
        ))}
      </div>
    </div>
  );
}
