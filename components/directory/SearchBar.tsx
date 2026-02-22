'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search restaurants, beaches, tours...',
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 min-h-[48px] rounded-card bg-white border border-gray-200 text-gray-900 font-body text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-colors duration-200"
        aria-label="Search businesses"
      />
    </div>
  );
}
