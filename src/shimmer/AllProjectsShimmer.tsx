'use client';

import { Shimmer } from '@/components/ui/Shimmer';
import ProjectTableShimmer from './ProjectTableShimmer';

export default function AllProjectsShimmer() {
  return (
    <div className="w-full p-4">
      {/* Section Title */}
      <div className="mb-6">
        <Shimmer className="h-7 w-32" />
      </div>

      {/* Filter/Sort Controls - mimicking the "All Projects", "Birth Date", "TVL", etc. headers */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-6 text-sm">
          <Shimmer className="h-4 w-20" />
          <Shimmer className="h-4 w-16" />
          <Shimmer className="h-4 w-12" />
          <Shimmer className="h-4 w-12" />
          <Shimmer className="h-4 w-16" />
          <Shimmer className="h-4 w-20" />
        </div>
      </div>

      {/* Table */}
      <ProjectTableShimmer />
    </div>
  );
}