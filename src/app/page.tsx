// import AgentCard from "@/components/launchpad";
import { agentsBySlug } from "@/constants/agents";
import { supportedChainIds } from "@/constants/chains";
import { getAgentOnChainInfo } from "@/helper/agent/agentOnChainInfo";
import { AgentOnChainData } from "@/types/agent";
import LiveAgents from "./liveAgents/page";

const Home = async () => {
  const chainId = supportedChainIds.bsc;
  const agentsOnChainDataByAddress: Record<string, AgentOnChainData | null> =
    {};
  await Promise.all(
    Object.values(agentsBySlug[chainId]).map(async (agent) => {
      if (agent.status === "upcoming" || !agent.address) {
        return null; // Skip agents without a valid address
      }
      const data = await getAgentOnChainInfo(agent.address, agent.chainId);
      agentsOnChainDataByAddress[agent.address] = data;
      return data;
    })
  );
  return <LiveAgents />;
  // <AgentCard agentsOnChainDataByAddress={agentsOnChainDataByAddress} />;
};
export default Home;
