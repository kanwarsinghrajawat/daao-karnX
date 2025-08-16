import ProjectDetailsPage from '@/components/launchpad/details';
import UpcomingProjectDetailsPage from '@/components/launchpad/details/UpcomingProjectDetails';
import { projectsBySlug } from '@/constants/projects';
import { supportedChainIds } from '@/constants/chains';
import { getProjectOnChainInfo } from '@/helper/project/projectOnChainInfo';

interface ProjectDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProjectDetails = async ({ params }: ProjectDetailsProps) => {
  const { slug } = await params;

  const projectBasicInfo = projectsBySlug[supportedChainIds.bsc][slug];

  if (!projectBasicInfo) {
    return <div>Project not found</div>;
  }

  if (projectBasicInfo?.status === 'upcoming') {
    return <UpcomingProjectDetailsPage projectBasicInfo={projectBasicInfo} />;
  }

  const projectOnChainData = await getProjectOnChainInfo(projectBasicInfo.address, projectBasicInfo.chainId);
  if (!projectOnChainData) {
    return <div>Project data not found</div>;
  }

  return <ProjectDetailsPage projectBasicInfo={projectBasicInfo} projectOnChainData={projectOnChainData} />;
};
export default ProjectDetails;