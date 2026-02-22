import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-500 mb-1 font-body"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 min-h-[44px] rounded-button',
            'bg-white border border-gray-200',
            'text-gray-900 font-body text-base',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent',
            'transition-colors duration-200',
            error && 'border-red-400 focus:ring-red-300',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 font-body">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
