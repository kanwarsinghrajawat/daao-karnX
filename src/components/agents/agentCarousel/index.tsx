import { AgentOnChainData, DeployedAgentStaticInfo } from '@/types/agent';
import AgentsCarouselDesktop from './AgentsCarouselDesktop';

type AgentCarouselProps = {
  agents: {
    agentBasicInfo: DeployedAgentStaticInfo;
    onChainData: AgentOnChainData;
  }[];
};

const AgentCarousel = ({ agents }: AgentCarouselProps) => {
  return (
    <div className="py-6 max-w-sm md:max-w-7xl md:mx-auto mx-6">
      <h2 className="text-base md:text-2xl font-semibold mb-2 md:mb-4">Featured Agents</h2>
      <AgentsCarouselDesktop agents={agents} />
    </div>
  );
};

export default AgentCarousel;
