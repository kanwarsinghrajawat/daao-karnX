import { agentAbi } from '@/abi/agent';
import { AgentOnChainData } from '@/types/agent';
import { getAgentStaticInfoByAddress } from '@/utils/agent';
import { getPublicClient } from '@/utils/publicClient';
import { getContract, Hex } from 'viem';
import { multicallWithSameAbi } from '../multicall';
import { getPoolAddress } from '../swap/addresses';
import { getTokenDetails } from '../token';

export const getAgentOnChainInfo = async (address: Hex, chainId: number): Promise<AgentOnChainData | null> => {
  try {
    const publicClient = getPublicClient(chainId);
    const contract = getContract({
      abi: agentAbi,
      address,
      client: publicClient,
    });
    const [
      symbol,
      decimals,
      isFundraiseActive,
      currentPhase,
      fundraiseStartTime,
      fundraiseEndTime,
      underlyingAsset,
      remainingCapacity,
      contributors,
      creator,
      maxRaise,
      operationalEndTime,
    ] = await Promise.all([
      contract.read.symbol(),
      contract.read.decimals(),
      contract.read.isFundraiseActive(),
      contract.read.currentPhase(),
      contract.read.fundraiseStartTime(),
      contract.read.fundraiseEndTime(),
      contract.read.underlyingAsset(),
      contract.read.getRemainingCapacity(),
      contract.read.getContributorCount(),
      contract.read.creator(),
      contract.read.maxRaise(),
      contract.read.operationalEndTime(),
    ]);

    const agentStaticInfo = getAgentStaticInfoByAddress({ address, chainId });
    if (!agentStaticInfo) {
      return null;
    }

    const [underlyingAssetDetails, agentTokenDetails, poolAddress] = await Promise.all([
      getTokenDetails({ address: underlyingAsset, chainId }),
      getTokenDetails({ address, chainId }),
      getPoolAddress({
        chainId,
        dex: agentStaticInfo.swapInfo.dex,
        token0: address,
        token1: underlyingAsset,
        fee: agentStaticInfo.swapInfo.fee,
      }),
    ]);

    return {
      address,
      symbol,
      decimals,
      isFundraiseActive,
      // currentPhase: 1,
      currentPhase,
      fundraiseStartTime: new Date(Number(fundraiseStartTime) * 1000),
      fundraiseEndTime: new Date(Number(fundraiseEndTime) * 1000),
      contributors,
      agentTokenDetails: {
        ...agentTokenDetails,
        logo: agentStaticInfo.image,
      },
      poolAddress,
      fee: agentStaticInfo.swapInfo.fee,
      underlyingAsset,
      underlyingAssetDetails,
      remainingCapacity,
      creator,
      maxRaise,
      operationalEndTime: new Date(Number(operationalEndTime) * 1000),
    };
  } catch (error) {
    console.error('Error fetching agent info:', error);
    return null;
  }
};

export const getMultipleAgentsOnChainInfo = async (addresses: Hex[], chainId: number): Promise<AgentOnChainData[]> => {
  const methods = [
    'symbol',
    'decimals',
    'isFundraiseActive',
    'currentPhase',
    'fundraiseStartTime',
    'fundraiseEndTime',
    'underlyingAsset',
    'getRemainingCapacity',
    'getContributorCount',
    'creator',
    'maxRaise',
    'operationalEndTime',
  ];

  const multicallRes = (await multicallWithSameAbi({
    chainId,
    abi: agentAbi,
    allMethods: addresses.map(() => methods).flat(),
    contracts: addresses.map((address) => methods.map(() => address)).flat(),
    allParams: addresses.map(() => Array(methods.length).fill([])).flat(),
  })) as (Hex | bigint | number | boolean | string | null)[];

  const res: AgentOnChainData[] = (
    await Promise.all(
      addresses.map(async (address, index) => {
        const [
          symbol,
          decimals,
          isFundraiseActive,
          currentPhase,
          fundraiseStartTime,
          fundraiseEndTime,
          underlyingAsset,
          remainingCapacity,
          contributors,
          creator,
          maxRaise,
          operationalEndTime,
        ] = multicallRes.slice(index * methods.length, (index + 1) * methods.length);

        const agentStaticInfo = getAgentStaticInfoByAddress({ address, chainId });
        if (!agentStaticInfo) {
          return null;
        }

        const [underlyingAssetDetails, agentTokenDetails, poolAddress] = await Promise.all([
          getTokenDetails({ address: underlyingAsset as Hex, chainId }),
          getTokenDetails({ address, chainId }),
          getPoolAddress({
            chainId,
            dex: agentStaticInfo.swapInfo.dex,
            token0: address,
            token1: underlyingAsset as Hex,
            fee: agentStaticInfo.swapInfo.fee,
          }),
        ]);

        return {
          address,
          symbol: symbol as string,
          decimals: decimals as number,
          isFundraiseActive: isFundraiseActive as boolean,
          currentPhase: currentPhase as number,
          fundraiseStartTime: new Date(Number(fundraiseStartTime) * 1000),
          fundraiseEndTime: new Date(Number(fundraiseEndTime) * 1000),
          contributors: contributors as bigint,
          underlyingAsset: underlyingAsset as Hex,
          remainingCapacity: remainingCapacity as bigint,
          agentTokenDetails: {
            ...agentTokenDetails,
            logo: agentStaticInfo.image,
          },
          poolAddress,
          fee: agentStaticInfo.swapInfo.fee,
          creator: creator as Hex,
          maxRaise: maxRaise as bigint,
          operationalEndTime: new Date(Number(operationalEndTime) * 1000),
          underlyingAssetDetails,
        };
      }),
    )
  ).filter((item) => item !== null);

  return res;
};
