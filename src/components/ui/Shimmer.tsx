"use client";

import { cn } from "@/shadcn/lib/utils";
import clsx from "clsx";
import { Props } from "next/script";

interface ShimmerProps {
  className?: string;
  children?: React.ReactNode;
}

export function Shimmer({ className, children }: ShimmerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-200 rounded-lg",
        "before:absolute before:inset-0",
        "before:-translate-x-full before:animate-shimmer",
        "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ShimmerSkeleton({ className }: Props) {
  return (
    <div
      className={clsx(
        // dark base + subtle ring
        "relative overflow-hidden rounded-md bg-[#1b1b1b] ring-1 ring-slate-800/70",
        // running shimmer highlight
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/12 before:to-transparent",
        className
      )}
    />
  );
}
