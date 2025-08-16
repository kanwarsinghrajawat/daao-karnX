import { Hex } from 'viem';
import { Token } from './tokens';
import { SupportedDex } from './swap/dex';

export type ProjectStatus = 'deployed' | 'upcoming';

export type ProjectStaticBaseInfo = {
  slug: string;
  symbol: string;
  name: string;
  description: string;
  detailedOverview: string;
  problemStatement: string;
  solution: string;
  targetMarket: string;
  imageDesktop: string;
  imageMobile: string;
  logo?: string;
  chainId: number;
  id: string;
  tags: string[];
  category: string;
  link: string;
  socials: { [platform: string]: string }[];
  
  // Enhanced project information
  pitchDeckUrl?: string;
  demoVideoUrl?: string;
  websiteUrl?: string;
  whitePaperUrl?: string;
  
  // Team information
  team: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
    linkedIn?: string;
    twitter?: string;
  }[];
  
  // Funding information
  fundingGoal: string;
  useOfFunds: {
    category: string;
    percentage: number;
    description: string;
  }[];
  
  // Project timeline
  milestones: {
    title: string;
    description: string;
    targetDate: Date;
    completed: boolean;
  }[];
  
  holders: {
    address: string;
    share: string;
  }[];
};

export type UpcomingProjectStaticInfo = ProjectStaticBaseInfo & {
  status: 'upcoming';
  launchDate: Date;
};

export type DeployedProjectStaticInfo = ProjectStaticBaseInfo & {
  address: Hex;
  status: 'deployed';
  marketData: {
    marketCap: string;
    tvl: string;
    volume: string;
    price: string;
    holdersCount: number;
    fundingProgress: number; // percentage
    totalFunded: string;
  };
  bornDate: Date;
  expiryDate: Date;
  swapInfo: {
    dex: SupportedDex;
    fee: number;
  };
};

export type ProjectStaticInfo = UpcomingProjectStaticInfo | DeployedProjectStaticInfo;

export type ProjectOnChainData = {
  address: Hex;
  symbol: string;
  decimals: number;
  isFundraiseActive: boolean;
  poolAddress: Hex;
  fee: number;
  currentPhase: ProjectPhase;
  fundraiseStartTime: Date;
  contributors: bigint;
  fundraiseEndTime: Date;
  underlyingAsset: Hex;
  underlyingAssetDetails: Token;
  projectTokenDetails: Token;
  operationalEndTime: Date;
  remainingCapacity: bigint;
  maxRaise: bigint;
  creator: Hex;
};

export enum ProjectPhase {
  Fundraising = 0,
  Finalized = 1,
  Ended = 2,
}