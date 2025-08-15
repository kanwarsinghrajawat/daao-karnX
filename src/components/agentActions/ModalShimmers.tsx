"use client";

import { ShimmerSkeleton } from "@/components/ui/Shimmer";

export function AgentActionModalShimmer() {
  return (
    <div className="space-y-6 p-5 rounded-2xl bg-[#141414] ring-1 ring-slate-800/70">
      {/* Claim Status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <ShimmerSkeleton className="h-5 w-40 rounded" />
          <ShimmerSkeleton className="h-5 w-24 rounded" />
        </div>

        {/* Notice box */}
        <div className="rounded-lg p-3 bg-[#1b1b1b] ring-1 ring-slate-800/70">
          <ShimmerSkeleton className="w-full h-5 rounded" />
        </div>
      </div>

      {/* Contribution Details */}
      <div className="rounded-xl p-4 bg-[#1b1b1b] ring-1 ring-slate-800/70 space-y-4">
        <ShimmerSkeleton className="w-44 h-6 rounded mb-2" />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <ShimmerSkeleton className="w-32 h-4 rounded" />
            <ShimmerSkeleton className="w-24 h-4 rounded" />
          </div>
          <div className="flex justify-between items-center">
            <ShimmerSkeleton className="w-28 h-4 rounded" />
            <ShimmerSkeleton className="w-28 h-4 rounded" />
          </div>
          <div className="flex justify-between items-center">
            <ShimmerSkeleton className="w-28 h-4 rounded" />
            <ShimmerSkeleton className="w-28 h-4 rounded" />
          </div>
        </div>
      </div>

      {/* Token Allocation */}
      <div className="rounded-xl p-4 bg-[#1b1b1b] ring-1 ring-slate-800/70 space-y-4">
        <div className="flex justify-between items-center">
          <ShimmerSkeleton className="w-28 h-5 rounded" />
          <ShimmerSkeleton className="w-28 h-5 rounded" />
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <ShimmerSkeleton className="w-full h-2 rounded-full" />
          <div className="text-center">
            <ShimmerSkeleton className="w-40 h-4 mx-auto rounded" />
          </div>
        </div>
      </div>

      {/* Primary Button */}
      <ShimmerSkeleton className="w-full h-11 rounded-lg" />
    </div>
  );
}
