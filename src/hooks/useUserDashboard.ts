import { projectAbi } from '@/abi/project';
import { UserContributionDetails } from '@/types/user';
import { getPublicClient } from '@/utils/publicClient';
import { useState } from 'react';
import { Hex } from 'viem';
import { useAccount } from 'wagmi';

export const useUserDashboard = ({ chainId, projectAddress }: { chainId: number; projectAddress: Hex }) => {
  const publicClient = getPublicClient(chainId);

  const { address: account } = useAccount();
  const [isUserContributionDetailsLoading, setIsUserContributionDetailsLoading] = useState<boolean>(true);

  const [userContributionDetails, setUserContributionDetails] = useState<UserContributionDetails>({
    contributionAmount: 0n,
    tokenAllocation: 0n,
    hasClaimed: false,
    currentBalance: 0n,
  });

  const fetchUserContributionDetails = async () => {
    if (!account) return;
    setIsUserContributionDetailsLoading(true);
    try {
      const res = await publicClient.readContract({
        address: projectAddress,
        abi: projectAbi,
        functionName: 'getUserAllocation',
        args: [account],
      });

      setUserContributionDetails({
        contributionAmount: res[0],
        tokenAllocation: res[1],
        hasClaimed: res[2],
        currentBalance: res[3],
      });
    } catch (error) {
      console.error('Error fetching user contribution details:', error);
    } finally {
      setIsUserContributionDetailsLoading(false);
    }
  };

  return {
    userContributionDetails,
    fetchUserContributionDetails,
    isUserContributionDetailsLoading,
  };
};
