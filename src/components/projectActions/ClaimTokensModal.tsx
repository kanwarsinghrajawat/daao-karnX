"use client";

import { useClaim } from "@/hooks/useClaim";
import { ProjectOnChainData, DeployedProjectStaticInfo } from "@/types/project";
import { truncateNumber } from "@/utils/number";
import { getTxnStateText } from "@/utils/txn";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import Text from "../ui/Text";

interface ClaimTokensModalProps {
  projectOnChainData: ProjectOnChainData;
  projectInfo: DeployedProjectStaticInfo;
  userContributionDetails: {
    contributionAmount: bigint;
    tokenAllocation: bigint;
    hasClaimed: boolean;
    currentBalance: bigint;
  };
  refreshUserContributionDetails: () => void;
}

export default function ClaimTokensModal({
  projectOnChainData,
  projectInfo,
  userContributionDetails,
  refreshUserContributionDetails,
}: ClaimTokensModalProps) {
  const { address: account } = useAccount();

  const { txnState, claimTokens } = useClaim({
    chainId: projectInfo.chainId,
    projectAddress: projectInfo.address,
  });

  const { symbol, decimals } = projectOnChainData;
  const { contributionAmount, tokenAllocation, hasClaimed } =
    userContributionDetails;

  const isClaimDisabled =
    hasClaimed || tokenAllocation === 0n || txnState !== null || !account;

  const handleClaim = async () => {
    if (isClaimDisabled) return;

    const success = await claimTokens();
    if (success) {
      await refreshUserContributionDetails();
    }
  };

  const underlyingAsset = projectOnChainData.underlyingAssetDetails;

  return (
    <div className="w-full max-w-xl mx-auto text-slate-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 py-2">
        <Text type="p" className="font-semibold text-lg text-slate-100">
          Claim Your {symbol} Tokens
        </Text>
      </div>
      <div>
        <div className="my-5 p-5 bg-[#171717] rounded-2xl ring-1 ring-slate-800/70">
          <Text type="p" className="font-bold text-base text-slate-100 mb-4">
            Your Contribution Details
          </Text>

          <div className="flex justify-between items-center mb-3">
            <Text type="span" className="text-sm text-slate-300 font-medium">
              Claim Status
            </Text>
            <Text
              type="span"
              className={`text-sm font-medium ${
                hasClaimed ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {hasClaimed ? "Claimed" : "Pending"}
            </Text>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Text type="span" className="text-sm text-slate-300 font-medium">
                Amount Contributed:
              </Text>
              <Text type="span" className="text-sm text-slate-400 font-mono">
                {truncateNumber(
                  formatUnits(contributionAmount, underlyingAsset.decimals)
                )}{" "}
                {underlyingAsset.symbol}
              </Text>
            </div>

            <div className="flex justify-between items-center">
              <Text type="span" className="text-sm text-slate-300 font-medium">
                Tokens Allocated:
              </Text>
              <Text type="span" className="text-sm text-slate-400 font-mono">
                {truncateNumber(formatUnits(tokenAllocation, decimals))}{" "}
                {projectOnChainData.symbol}
              </Text>
            </div>
          </div>
        </div>
        {/* Claim Button */}
        <button
          onClick={handleClaim}
          disabled={isClaimDisabled}
          className={`
        w-full rounded-xl
        bg-emerald-600 hover:bg-emerald-500
        text-white font-semibold text-base
        px-6 py-4
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
        active:scale-[0.97]
      `}
        >
          {hasClaimed
            ? "You've Already Claimed"
            : tokenAllocation === 0n
              ? "Claim Token"
              : getTxnStateText(
                  txnState,
                  `Claim ${projectOnChainData.symbol} Tokens`
                )}
        </button>
        {/* No Contribution Message */}
        {contributionAmount === 0n && (
          <div className="mt-4 p-4 bg-[#1b1b1b] rounded-xl ring-1 ring-slate-800/70">
            <Text type="span" className="text-sm font-medium text-slate-300">
              No Contribution Found
            </Text>
            <Text type="span" className="text-xs text-slate-400 block mt-1">
              You haven&apos;t contributed to this project&apos;s fundraising,
              so there are no tokens to claim.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
