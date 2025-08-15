import AgentDetailsPage from '@/components/launchpad/details';
import UpcomingAgentDetailsPage from '@/components/launchpad/details/UpcomingAgentDetails';
import { agentsBySlug } from '@/constants/agents';
import { supportedChainIds } from '@/constants/chains';
import { getAgentOnChainInfo } from '@/helper/agent/agentOnChainInfo';

interface AgentDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

const AgentDetails = async ({ params }: AgentDetailsProps) => {
  const { slug } = await params;

  const agentBasicInfo = agentsBySlug[supportedChainIds.bsc][slug];

  if (!agentBasicInfo) {
    return <div>Agent not found</div>;
  }

  if (agentBasicInfo?.status === 'upcoming') {
    return <UpcomingAgentDetailsPage agentBasicInfo={agentBasicInfo} />;
  }

  const agentOnChainData = await getAgentOnChainInfo(agentBasicInfo.address, agentBasicInfo.chainId);
  if (!agentOnChainData) {
    return <div>Agent data not found</div>;
  }

  return <AgentDetailsPage agentBasicInfo={agentBasicInfo} agentOnChainData={agentOnChainData} />;
};
export default AgentDetails;
