"use client";

import { Shimmer } from "@/components/ui/Shimmer";

export default function AgentTableShimmer() {
  return (
    <div className="w-full bg-[#171717] rounded-lg border border-gray-200">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 bg-gray-50">
        <div className="text-left">
          <Shimmer className="h-4 w-20" />
        </div>
        <div className="text-left">
          <Shimmer className="h-4 w-16" />
        </div>
        <div className="text-right">
          <Shimmer className="h-4 w-12" />
        </div>
        <div className="text-right">
          <Shimmer className="h-4 w-12" />
        </div>
        <div className="text-right">
          <Shimmer className="h-4 w-16" />
        </div>
        <div className="text-right">
          <Shimmer className="h-4 w-20" />
        </div>
      </div>

      {/* Table Rows */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 items-center"
        >
          {/* Agent Info */}
          <div className="flex items-center gap-3">
            <Shimmer className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="space-y-1">
              <Shimmer className="h-4 w-20" />
              <Shimmer className="h-3 w-16" />
            </div>
          </div>

          {/* Birth Date */}
          <div className="text-left">
            <Shimmer className="h-4 w-20" />
          </div>

          {/* TVL */}
          <div className="text-right">
            <Shimmer className="h-4 w-16" />
          </div>

          {/* 24h % */}
          <div className="text-right">
            <Shimmer className="h-4 w-12" />
          </div>

          {/* 24h Vol */}
          <div className="text-right">
            <Shimmer className="h-4 w-16" />
          </div>

          {/* Token Price */}
          <div className="text-right">
            <Shimmer className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
