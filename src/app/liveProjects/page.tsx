import ProjectCarousel from '@/components/projects/projectCarousel';
import ProjectTable from '@/components/projects/ProjectTable';
import { projectsBySlug } from '@/constants/projects';
import { supportedChainIds } from '@/constants/chains';
import { getMultipleProjectsOnChainInfo } from '@/helper/project/projectOnChainInfo';
import { ProjectPhase } from '@/types/project';

const LiveProjects = async () => {
  const chainId = supportedChainIds.bsc;
  const allProjects = Object.values(projectsBySlug[chainId]);
  
  // Get deployed projects for on-chain data
  const deployedProjects = allProjects.filter((project) => project.status === 'deployed');
  const deployedProjectsOnChainData = await getMultipleProjectsOnChainInfo(
    deployedProjects.map((project) => project.address),
    chainId,
  );

  // Combine deployed projects with their on-chain data
  const deployedProjectsWithData = deployedProjects.map((project, index) => ({
    projectBasicInfo: project,
    onChainData: deployedProjectsOnChainData[index],
  }));

  // Add upcoming projects (they don't have on-chain data yet)
  const upcomingProjects = allProjects
    .filter((project) => project.status === 'upcoming')
    .map((project) => ({
      projectBasicInfo: project,
      onChainData: null, // Upcoming projects don't have on-chain data
    }));

  // Combine all projects for the table
  const allProjectsForTable = [...deployedProjectsWithData, ...upcomingProjects];

  // For carousel, only show ended projects as before
  const liveProjectsInEndedPhase = deployedProjectsWithData.filter((project) => project.onChainData.currentPhase === ProjectPhase.Ended);
  
  return (
    <>
      <ProjectCarousel projects={liveProjectsInEndedPhase} />
      <ProjectTable projects={allProjectsForTable} />
    </>
  );
};
export default LiveProjects;