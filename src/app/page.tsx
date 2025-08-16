// import ProjectCard from "@/components/launchpad";
import { projectsBySlug } from "@/constants/projects";
import { supportedChainIds } from "@/constants/chains";
import { getProjectOnChainInfo } from "@/helper/project/projectOnChainInfo";
import { ProjectOnChainData } from "@/types/project";
import LiveProjects from "./liveProjects/page";

const Home = async () => {
  const chainId = supportedChainIds.bsc;
  const projectsOnChainDataByAddress: Record<string, ProjectOnChainData | null> =
    {};
  await Promise.all(
    Object.values(projectsBySlug[chainId]).map(async (project) => {
      if (project.status === "upcoming" || !project.address) {
        return null; // Skip projects without a valid address
      }
      const data = await getProjectOnChainInfo(project.address, project.chainId);
      projectsOnChainDataByAddress[project.address] = data;
      return data;
    })
  );
  return <LiveProjects />;
  // <ProjectCard projectsOnChainDataByAddress={projectsOnChainDataByAddress} />;
};
export default Home;
