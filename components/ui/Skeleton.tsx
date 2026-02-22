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
    <div className="bg-white rounded-card overflow-hidden">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="px-1 pt-3 pb-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonCategoryGrid() {
  return (
    <div className="grid grid-cols-3 gap-8 sm:grid-cols-4 md:grid-cols-5">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-3 py-2">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonInsiderPick() {
  return (
    <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-card">
      <Skeleton className="w-20 h-20 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
