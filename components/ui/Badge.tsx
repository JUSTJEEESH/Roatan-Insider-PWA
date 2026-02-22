import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: string;
  color?: string;
}

export function Badge({
  variant,
  color,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-medium font-body',
        'bg-gray-100 text-gray-600',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
