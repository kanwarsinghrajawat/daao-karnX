import { AgentStaticInfo } from '@/types/agent';
import { supportedChainIds } from '../chains';
import { bscAgents } from './bsc';

export const agentsBySlug: { [chainId: number]: { [slug: string]: AgentStaticInfo } } = {
  [supportedChainIds.bsc]: bscAgents.reduce(
    (acc, agent) => {
      acc[agent.slug] = agent;
      return acc;
    },
    {} as { [slug: string]: AgentStaticInfo },
  ),
};

export const agentsById: { [chainId: number]: { [id: string]: AgentStaticInfo } } = {
  [supportedChainIds.bsc]: bscAgents.reduce(
    (acc, agent) => {
      acc[agent.id] = agent;
      return acc;
    },
    {} as { [id: string]: AgentStaticInfo },
  ),
};

export const agentsByAddress: { [chainId: number]: { [address: string]: AgentStaticInfo } } = {
  [supportedChainIds.bsc]: bscAgents.reduce(
    (acc, agent) => {
      if (agent.status === 'upcoming') return acc; // Skip upcoming agents
      acc[agent.address] = agent;
      return acc;
    },
    {} as { [address: string]: AgentStaticInfo },
  ),
};
