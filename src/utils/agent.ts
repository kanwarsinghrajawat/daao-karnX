import { agentsByAddress, agentsById, agentsBySlug } from '@/constants/agents';
import { DeployedAgentStaticInfo } from '@/types/agent';

export const getAgentStaticInfoById = ({ agentId, chainId }: { agentId: string; chainId: number }) => {
  const agentsForChain = agentsBySlug[chainId];
  if (!agentsForChain) return null;
  return agentsById[chainId][agentId] || null;
};

export const getAgentStaticInfoBySlug = ({ slug, chainId }: { slug: string; chainId: number }) => {
  const agentsForChain = agentsBySlug[chainId];
  if (!agentsForChain) return null;
  return agentsForChain[slug] || null;
};

export const getAgentStaticInfoByAddress = ({
  address,
  chainId,
}: {
  address: string;
  chainId: number;
}): DeployedAgentStaticInfo | null => {
  const agentsForChain = agentsByAddress[chainId];
  if (!agentsForChain) return null;
  return (agentsForChain[address] as DeployedAgentStaticInfo) || null;
};
