'use client';

import { cn } from '@/lib/utils';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  options: FilterOption[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}

export function FilterBar({ options, selected, onSelect }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="tablist">
      <button
        role="tab"
        aria-selected={selected === null}
        onClick={() => onSelect(null)}
        className={cn(
          'px-3 py-1.5 rounded-pill text-sm font-body font-medium whitespace-nowrap min-h-[36px]',
          'transition-colors duration-200',
          selected === null
            ? 'bg-primary text-white'
            : 'bg-coconut text-driftwood hover:bg-coconut-dark'
        )}
      >
        All
      </button>
      {options.map((option) => (
        <button
          key={option.value}
          role="tab"
          aria-selected={selected === option.value}
          onClick={() =>
            onSelect(selected === option.value ? null : option.value)
          }
          className={cn(
            'px-3 py-1.5 rounded-pill text-sm font-body font-medium whitespace-nowrap min-h-[36px]',
            'transition-colors duration-200',
            selected === option.value
              ? 'bg-primary text-white'
              : 'bg-coconut text-driftwood hover:bg-coconut-dark'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
