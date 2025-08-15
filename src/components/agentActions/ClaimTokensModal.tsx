'use client';

import { useClaim } from '@/hooks/useClaim';
import { AgentOnChainData, DeployedAgentStaticInfo } from '@/types/agent';
import { truncateNumber } from '@/utils/number';
import { getTxnStateText } from '@/utils/txn';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';
import Text from '../ui/Text';

interface ClaimTokensModalProps {
  agentOnChainData: AgentOnChainData;
  agentInfo: DeployedAgentStaticInfo;
  userContributionDetails: {
    contributionAmount: bigint;
    tokenAllocation: bigint;
    hasClaimed: boolean;
    currentBalance: bigint;
  };
  refreshUserContributionDetails: () => void;
}

export default function ClaimTokensModal({
  agentOnChainData,
  agentInfo,
  userContributionDetails,
  refreshUserContributionDetails,
}: ClaimTokensModalProps) {
  const { address: account } = useAccount();

  const { txnState, claimTokens } = useClaim({
    chainId: agentInfo.chainId,
    agentAddress: agentInfo.address,
  });

  const { symbol, decimals } = agentOnChainData;
  const { contributionAmount, tokenAllocation, hasClaimed } = userContributionDetails;

  const isClaimDisabled = hasClaimed || tokenAllocation === 0n || txnState !== null || !account;

  const handleClaim = async () => {
    if (isClaimDisabled) return;

    const success = await claimTokens();
    if (success) {
      await refreshUserContributionDetails();
    }
  };

  const underlyingAsset = agentOnChainData.underlyingAssetDetails;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-white flex justify-between items-center mb-2 py-2">
        <div className="flex items-center gap-2">
          <Text type="p" className="font-semibold text-lg text-black">
            Claim Your {symbol} Tokens
          </Text>
        </div>
      </div>

      <div className="mb-4 p-4  border border-divider">
        <Text type="p" className="font-bold text-sm md:text-base text-text-primary mb-3">
          Your Contribution Details
        </Text>
        <div className="flex justify-between items-center mb-2">
          <Text type="span" className="text-sm text-text-primary font-medium">
            Claim Status
          </Text>
          <div className="flex items-center gap-1">
            <Text type="span" className={`text-sm font-normal ${hasClaimed ? 'text-positive' : 'text-negative'}`}>
              {hasClaimed ? 'Claimed' : 'Pending'}
            </Text>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Text type="span" className="text-sm text-text-primary font-medium">
              Amount Contributed:
            </Text>
            <Text type="span" className="text-sm text-text-secondary font-medium">
              {truncateNumber(formatUnits(contributionAmount, underlyingAsset.decimals))} {underlyingAsset.symbol}
            </Text>
          </div>

          <div className="flex justify-between items-center">
            <Text type="span" className="text-sm text-text-primary font-medium">
              Tokens Allocated:
            </Text>
            <Text type="span" className="text-sm text-text-secondary font-medium">
              {truncateNumber(formatUnits(tokenAllocation, decimals))} {agentOnChainData.symbol}
            </Text>
          </div>
        </div>
      </div>
      <button
        onClick={handleClaim}
        disabled={isClaimDisabled}
        className={`
          w-full 
          bg-black
          text-white 
          font-bold 
          text-base 
          leading-none
          px-6 py-4
         disabled:cursor-not-allowed 
          transition-all duration-300
          active:scale-[0.97] 
          flex items-center justify-center
           -mt-2
        `}
      >
        {hasClaimed ? (
          <div className="flex items-center gap-2">You’ve Already Claimed</div>
        ) : tokenAllocation === 0n ? (
          'Claim Token'
        ) : (
          getTxnStateText(txnState, `Claim ${agentOnChainData.symbol} Tokens`)
        )}
      </button>

      {/* Additional Info */}
      {/* {!hasClaimed && tokenAllocation > 0n && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200">
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-4 h-4 text-orange-600" />
            <Text type="span" className="text-sm font-medium text-orange-800">
              Tokens Ready for Claim
            </Text>
          </div>
          <p className="text-xs text-orange-600">
            You have {truncateNumber(formatUnits(tokenAllocation, decimals))} {agentOnChainData.symbol} tokens ready to
            claim based on your contribution of{' '}
            {truncateNumber(formatUnits(contributionAmount, underlyingAsset.decimals))} {underlyingAsset.symbol}.
          </p>
        </div>
      )} */}

      {contributionAmount === 0n && (
        <div className="mt-4 p-3 bg-gray-50  border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <Text type="span" className="text-sm font-medium text-text-secondary">
              No Contribution Found
            </Text>
          </div>
          <Text type="span" className="text-xs text-text-secondary">
            You haven&apos;t contributed to this agent&apos;s fundraising, so there are no tokens to claim.
          </Text>
        </div>
      )}
    </div>
  );
}
