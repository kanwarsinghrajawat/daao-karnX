'use client';

import { Shimmer } from '@/components/ui/Shimmer';
import ProjectCardShimmer from './ProjectCardShimmer';

export default function ProjectsCarouselShimmer() {
  return (
    <div className="py-6 max-w-sm md:max-w-7xl md:mx-auto space-y-10 mx-4">
      <section>
        {/* Section Title */}
        <div className="mb-4">
          <Shimmer className="h-8 w-48" />
        </div>

        {/* Featured Projects Carousel */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          <ProjectCardShimmer />
          <ProjectCardShimmer />
        </div>
      </section>
    </div>
  );
}