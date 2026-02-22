import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-button',
        className
      )}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-3.5 space-y-2.5">
        <div className="flex items-start justify-between">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-14 rounded-pill" />
          <Skeleton className="h-5 w-20 rounded-pill" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-4 w-16 rounded-pill" />
          <Skeleton className="h-4 w-20 rounded-pill" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCategoryGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2.5 p-4 rounded-card bg-white shadow-card min-h-[96px]">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonInsiderPick() {
  return (
    <div className="flex gap-4 p-4 bg-coconut rounded-card">
      <Skeleton className="w-20 h-20 rounded-button flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
