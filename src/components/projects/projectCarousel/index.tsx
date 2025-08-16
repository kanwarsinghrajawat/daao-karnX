import {
  DeployedProjectStaticInfo,
  ProjectOnChainData,
  ProjectStaticInfo,
} from "@/types/project";
import ProductShowcase from "../productShowcase";
import ProjectsCarouselDesktop from "./ProjectsCarouselDesktop";

type ProjectCarouselProps = {
  projects: {
    projectBasicInfo: ProjectStaticInfo;
    onChainData: ProjectOnChainData;
  }[];
};

const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
  const isDeployed = (p: ProjectStaticInfo): p is DeployedProjectStaticInfo => {
    return (p as DeployedProjectStaticInfo).marketData !== undefined;
  };
  // Convert projects data to trending format
  const trendingProjects = projects.slice(0, 4).map((project) => {
    const staticInfo = project.projectBasicInfo;

    // Determine tag from static info:
    // - upcoming -> UPCOMING
    // - deployed & before expiryDate -> LIVE
    // - otherwise -> ENDED
    let tagLabel = "ENDED";
    let tagType = "dyor" as "lock" | "dyor";

    if (staticInfo.status === "upcoming") {
      tagLabel = "UPCOMING";
      tagType = "dyor" as "lock" | "dyor";
    } else if (staticInfo.status === "deployed") {
      const expiry = (staticInfo as DeployedProjectStaticInfo).expiryDate;
      if (expiry && new Date() < expiry) {
        tagLabel = "LIVE";
        tagType = "lock" as "lock" | "dyor";
      }
    }

    return {
      id: staticInfo.id,
      slug: staticInfo.slug,
      name: staticInfo.name,
      subtitle: staticInfo.category,
      avatar: staticInfo.logo || staticInfo.imageDesktop,
      tag: {
        label: tagLabel,
        type: tagType,
      },
      price: `$${(Number(isDeployed(staticInfo) ? staticInfo.marketData.marketCap : staticInfo.fundingGoal) / 1000000).toFixed(2)}M`,
      changePct: isDeployed(staticInfo)
        ? staticInfo.marketData.fundingProgress
        : Math.random() * 100,
    };
  });

  // Use the first project as spotlight
  const spotlightProject = projects[0];
  const spInfo = spotlightProject.projectBasicInfo;
  const spotlight = {
    name: spInfo.name,
    avatar: spInfo.logo || spInfo.imageDesktop,
    badge: "Featured",
    fdv: `$${(Number(isDeployed(spInfo) ? spInfo.marketData.marketCap : spInfo.fundingGoal) / 1000).toFixed(0)}k`,
    fdvChangePct: isDeployed(spInfo) ? spInfo.marketData.fundingProgress : 85,
    category: spInfo.category,
    transactions: isDeployed(spInfo) ? spInfo.marketData.holdersCount : 1000,
    interactedWith: spInfo.team.slice(0, 2).map((member) => member.name),
    description: spInfo.description,
  };

  return (
    <div className="py-6 max-w-sm md:max-w-7xl md:mx-auto mx-auto">
      <ProductShowcase
        trending={trendingProjects}
        spotlight={spotlight}
        carousel={<ProjectsCarouselDesktop projects={projects} />}
      />
    </div>
  );
};

export default ProjectCarousel;
