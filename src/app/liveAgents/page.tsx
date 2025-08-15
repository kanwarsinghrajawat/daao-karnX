import AgentCarousel from '@/components/agents/agentCarousel';
import AgentTable from '@/components/agents/AgentTable';
import { agentsBySlug } from '@/constants/agents';
import { supportedChainIds } from '@/constants/chains';
import { getMultipleAgentsOnChainInfo } from '@/helper/agent/agentOnChainInfo';
import { AgentPhase } from '@/types/agent';

const LiveAgents = async () => {
  const chainId = supportedChainIds.bsc;
  const liveAgents = Object.values(agentsBySlug[chainId]).filter((agent) => agent.status === 'deployed');
  const liveAgentsOnChainData = await getMultipleAgentsOnChainInfo(
    liveAgents.map((agent) => agent.address),
    chainId,
  );

  const deployedAgents = liveAgents.map((agent, index) => ({
    agentBasicInfo: agent,
    onChainData: liveAgentsOnChainData[index],
  }));

  const liveAgentsInEndedPhase = deployedAgents.filter((agent) => agent.onChainData.currentPhase === AgentPhase.Ended);
  return (
    <>
      <AgentCarousel agents={liveAgentsInEndedPhase} />
      <AgentTable agents={liveAgentsInEndedPhase} />
    </>
  );
};
export default LiveAgents;
