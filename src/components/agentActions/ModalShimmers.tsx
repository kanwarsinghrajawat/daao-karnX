'use client';

import { ShimmerSkeleton } from '@/components/ui/Shimmer';

export function AgentActionModalShimmer() {
  return (
    <div className="space-y-6 shadow-lg p-5">
      {/* Claim Status Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <ShimmerSkeleton className="h-5" />
        </div>

        {/* Alert box */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 ">
          <ShimmerSkeleton className="w-full h-5" />
        </div>
      </div>

      {/* Your Contribution Details Section */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        <ShimmerSkeleton className="w-44 h-6 mb-4" />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <ShimmerSkeleton className="w-32 h-4" />
            <ShimmerSkeleton className="w-24 h-4" />
          </div>
          <div className="flex justify-between items-center">
            <ShimmerSkeleton className="w-28 h-4" />
            <ShimmerSkeleton className="w-28 h-4" />
          </div>
          <div className="flex justify-between items-center">
            <ShimmerSkeleton className="w-28 h-4" />
            <ShimmerSkeleton className="w-28 h-4" />
          </div>
        </div>
      </div>

      {/* Token Allocation Section */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        <div className="flex justify-between items-center">
          <ShimmerSkeleton className="w-28 h-5" />
          <ShimmerSkeleton className="w-28 h-5" />
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <ShimmerSkeleton className="w-full h-3 rounded-full" />
          <div className="text-center">
            <ShimmerSkeleton className="w-40 h-4 mx-auto" />
          </div>
        </div>
      </div>

      {/* Button Section */}
      <ShimmerSkeleton className="w-full h-12 rounded-lg" />
    </div>
  );
}
