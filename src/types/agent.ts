import { Hex } from 'viem';
import { Token } from './tokens';
import { SupportedDex } from './swap/dex';

export type AgentStatus = 'deployed' | 'upcoming';

export type AgentStaticBaseInfo = {
  slug: string;
  symbol: string;
  name: string;
  description: string;
  imageDesktop: string;
  imageMobile: string;
  chainId: number;
  id: string;
  image: string;
  tags: string[];
  link: string;
  socials: { [platform: string]: string }[];
  abilities?: string[];
  level?: number;
  whatItDoes?: string;
  disclaimer?: string;
  holders: {
    address: string;
    share: string;
  }[];
};

export type UpcomingAgentStaticInfo = AgentStaticBaseInfo & {
  status: 'upcoming';
  launchDate: Date;
};

export type DeployedAgentStaticInfo = AgentStaticBaseInfo & {
  address: Hex;
  status: 'deployed';
  marketData: {
    marketCap: string;
    tvl: string;
    volume: string;
    price: string;
    holdersCount: number;
  };
  bornDate: Date;
  expiryDate: Date;
  swapInfo: {
    dex: SupportedDex;
    fee: number;
  };
};

export type AgentStaticInfo = UpcomingAgentStaticInfo | DeployedAgentStaticInfo;

export type AgentOnChainData = {
  address: Hex;
  symbol: string;
  decimals: number;
  isFundraiseActive: boolean;
  poolAddress: Hex;
  fee: number;
  currentPhase: AgentPhase;
  fundraiseStartTime: Date;
  contributors: bigint;
  fundraiseEndTime: Date;
  underlyingAsset: Hex;
  underlyingAssetDetails: Token;
  agentTokenDetails: Token;
  operationalEndTime: Date;
  remainingCapacity: bigint;
  maxRaise: bigint;
  creator: Hex;
};

export enum AgentPhase {
  Fundraising = 0,
  Finalized = 1,
  Ended = 2,
}
