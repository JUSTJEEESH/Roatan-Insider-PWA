import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'category' | 'featured' | 'status';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-seafoam text-primary',
  category: 'text-white',
  featured: 'bg-gold text-white',
  status: 'bg-green-100 text-green-800',
};

export function Badge({
  variant = 'default',
  color,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-medium font-body',
        variantStyles[variant],
        className
      )}
      style={color && variant === 'category' ? { backgroundColor: color } : undefined}
      {...props}
    >
      {children}
    </span>
  );
}
