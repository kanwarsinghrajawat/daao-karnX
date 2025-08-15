'use client';

import { cn } from '@/shadcn/lib/utils';

interface ShimmerProps {
  className?: string;
  children?: React.ReactNode;
}

export function Shimmer({ className, children }: ShimmerProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-200 rounded-lg',
        'before:absolute before:inset-0',
        'before:-translate-x-full before:animate-shimmer',
        'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        className
      )}
    >
      {children}
    </div>
  );
}

export function ShimmerSkeleton({ className }: { className?: string }) {
  return <Shimmer className={cn('bg-gray-200', className)} />;
}
