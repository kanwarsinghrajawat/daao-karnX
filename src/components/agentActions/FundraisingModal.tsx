"use client";

import SelectTokenCard from "@/components/agentActions/SelectTokenCard";
import { useContribute } from "@/hooks/useContribute";
import { AgentOnChainData, DeployedAgentStaticInfo } from "@/types/agent";
import { truncateNumber } from "@/utils/number";
import { getTxnStateText } from "@/utils/txn";
import { useState } from "react";
import { formatUnits, parseUnits } from "viem";
import Text from "../ui/Text";

interface FundraisingModalProps {
  agentOnChainData: AgentOnChainData;
  agentInfo: DeployedAgentStaticInfo;
  refreshOnChainData: () => void;
}

export default function FundraisingModal({
  agentOnChainData,
  agentInfo,
  refreshOnChainData,
}: FundraisingModalProps) {
  const underlyingAsset = agentOnChainData.underlyingAssetDetails;
  const [contributionAmount, setContributionAmount] = useState("");
  const { balances, txnState, contribute } = useContribute({
    chainId: agentInfo.chainId,
    agentAddress: agentInfo.address,
    underlyingAsset,
  });
  const { maxRaise, remainingCapacity } = agentOnChainData;

  const currentRaised = maxRaise - remainingCapacity;
  const underlyingAssetDecimals = underlyingAsset.decimals;
  const progressPercentage =
    ((Number(formatUnits(maxRaise, underlyingAssetDecimals)) -
      Number(formatUnits(remainingCapacity, underlyingAssetDecimals))) /
      Number(formatUnits(maxRaise, underlyingAssetDecimals))) *
    100;

  const isContributeDisabled =
    Number.isNaN(Number(contributionAmount)) ||
    Number(contributionAmount) <= 0 ||
    Number(contributionAmount) >
      Number(
        formatUnits(
          balances[underlyingAsset.address] || 0n,
          underlyingAssetDecimals
        )
      ) ||
    Number(formatUnits(remainingCapacity, underlyingAssetDecimals)) <= 0 ||
    Number(formatUnits(remainingCapacity, underlyingAssetDecimals)) <
      Number(contributionAmount) ||
    !agentOnChainData.isFundraiseActive;

  return (
    <div className="w-full max-w-xl mx-auto text-slate-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 py-2">
        <h3 className="font-semibold text-lg text-slate-100">
          Pledge to {agentOnChainData.symbol}
        </h3>
      </div>

      {/* Token Input Card */}
      <SelectTokenCard
        token={underlyingAsset}
        amount={contributionAmount}
        setAmount={(val: string) =>
          setContributionAmount(isNaN(Number(val)) ? "" : val)
        }
        onTokenClick={() => {}}
        balance={balances[underlyingAsset.address] || 0n}
        showDropdown={false}
      />

      {/* Progress Card */}
      <div className="mb-5 p-5 bg-[#171717] rounded-2xl ring-1 ring-slate-800/70">
        <div className="flex justify-between items-center mb-3">
          <Text type="p" className="text-sm font-medium text-slate-300">
            Max. Pledge Allowed
          </Text>
          <Text type="p" className="text-sm font-medium text-slate-100">
            {progressPercentage.toFixed(1)}%
          </Text>
        </div>

        <div className="flex justify-between items-center">
          <Text type="p" className="text-sm font-medium text-slate-300">
            Est. Allocation
          </Text>
          <Text type="p" className="text-sm font-mono text-slate-400">
            {truncateNumber(
              formatUnits(currentRaised, underlyingAsset.decimals)
            )}{" "}
            {underlyingAsset.symbol}
          </Text>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => {
          if (isContributeDisabled || txnState !== null) return;
          contribute(
            parseUnits(contributionAmount, underlyingAsset.decimals)
          ).then(() => {
            setContributionAmount("");
            refreshOnChainData();
          });
        }}
        disabled={isContributeDisabled || txnState !== null}
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
        {getTxnStateText(txnState, `Pledge to ${agentOnChainData.symbol}`)}
      </button>
    </div>
  );
}
