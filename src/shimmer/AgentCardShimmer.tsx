'use client';

import { Shimmer } from '@/components/ui/Shimmer';

export default function AgentCardShimmer() {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Agent Image */}
      <div className="relative h-48">
        <Shimmer className="w-full h-full" />
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        {/* Agent Name and Verified Badge */}
        <div className="flex items-center gap-2">
          <Shimmer className="h-6 w-32" />
          <Shimmer className="h-4 w-4 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-3/4" />
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-4 gap-4 pt-4">
          <div className="text-center">
            <Shimmer className="h-6 w-12 mx-auto mb-1" />
            <Shimmer className="h-3 w-8 mx-auto" />
          </div>
          <div className="text-center">
            <Shimmer className="h-6 w-12 mx-auto mb-1" />
            <Shimmer className="h-3 w-8 mx-auto" />
          </div>
          <div className="text-center">
            <Shimmer className="h-6 w-12 mx-auto mb-1" />
            <Shimmer className="h-3 w-8 mx-auto" />
          </div>
          <div className="text-center">
            <Shimmer className="h-6 w-12 mx-auto mb-1" />
            <Shimmer className="h-3 w-8 mx-auto" />
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="flex justify-between">
            <Shimmer className="h-4 w-16" />
            <Shimmer className="h-4 w-20" />
          </div>
          <div className="flex justify-between">
            <Shimmer className="h-4 w-20" />
            <Shimmer className="h-4 w-16" />
          </div>
          <div className="flex justify-between">
            <Shimmer className="h-4 w-12" />
            <Shimmer className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
