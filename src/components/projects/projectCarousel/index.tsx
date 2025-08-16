import { ProjectOnChainData, DeployedProjectStaticInfo } from "@/types/project";
import ProjectsCarouselDesktop from "./ProjectsCarouselDesktop";
import ProductShowcase from "../productShowcase";

type ProjectCarouselProps = {
  projects: {
    projectBasicInfo: DeployedProjectStaticInfo;
    onChainData: ProjectOnChainData;
  }[];
};

const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
  // Convert projects data to trending format
  const trendingProjects = projects.slice(0, 4).map((project, index) => ({
    id: project.projectBasicInfo.id,
    name: project.projectBasicInfo.name,
    subtitle: project.projectBasicInfo.category,
    avatar: project.projectBasicInfo.logo || project.projectBasicInfo.imageDesktop,
    tag: { 
      label: project.onChainData.currentPhase === 1 ? "LIVE" : "ENDED", 
      type: project.onChainData.currentPhase === 1 ? "lock" : "dyor" as "lock" | "dyor"
    },
    price: `$${(Number(project.projectBasicInfo.marketData?.marketCap || project.projectBasicInfo.fundingGoal) / 1000000).toFixed(2)}M`,
    changePct: project.projectBasicInfo.marketData?.fundingProgress || Math.random() * 100,
  }));

  // Use the first project as spotlight
  const spotlightProject = projects[0];
  const spotlight = {
    name: spotlightProject.projectBasicInfo.name,
    avatar: spotlightProject.projectBasicInfo.logo || spotlightProject.projectBasicInfo.imageDesktop,
    badge: "Featured",
    fdv: `$${(Number(spotlightProject.projectBasicInfo.marketData?.marketCap || spotlightProject.projectBasicInfo.fundingGoal) / 1000).toFixed(0)}k`,
    fdvChangePct: spotlightProject.projectBasicInfo.marketData?.fundingProgress || 85,
    category: spotlightProject.projectBasicInfo.category,
    transactions: spotlightProject.projectBasicInfo.marketData?.holdersCount || 1000,
    interactedWith: spotlightProject.projectBasicInfo.team.slice(0, 2).map(member => member.name),
    description: spotlightProject.projectBasicInfo.description,
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