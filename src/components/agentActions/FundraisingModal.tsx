'use client';

import SelectTokenCard from '@/components/agentActions/SelectTokenCard';
import { useContribute } from '@/hooks/useContribute';
import { AgentOnChainData, DeployedAgentStaticInfo } from '@/types/agent';
import { truncateNumber } from '@/utils/number';
import { getTxnStateText } from '@/utils/txn';
import { useState } from 'react';
import { formatUnits, parseUnits } from 'viem';
import Text from '../ui/Text';

interface FundraisingModalProps {
  agentOnChainData: AgentOnChainData;
  agentInfo: DeployedAgentStaticInfo;
  refreshOnChainData: () => void;
}

export default function FundraisingModal({ agentOnChainData, agentInfo, refreshOnChainData }: FundraisingModalProps) {
  const underlyingAsset = agentOnChainData.underlyingAssetDetails;
  const [contributionAmount, setContributionAmount] = useState('');
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
      Number(formatUnits(balances[underlyingAsset.address] || 0n, underlyingAssetDecimals)) ||
    Number(formatUnits(remainingCapacity, underlyingAssetDecimals)) <= 0 ||
    Number(formatUnits(remainingCapacity, underlyingAssetDecimals)) < Number(contributionAmount) ||
    !agentOnChainData.isFundraiseActive;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-white flex justify-between items-center mb-2 py-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg text-black">Pledge to {agentOnChainData.symbol}</h3>
        </div>
      </div>

      {/* Fundraising Progress */}

      <SelectTokenCard
        // title="Contribute with"
        token={underlyingAsset}
        amount={contributionAmount}
        setAmount={(val: string) => setContributionAmount(isNaN(Number(val)) ? '' : val)}
        onTokenClick={() => {}} // No token selection allowed
        balance={balances[underlyingAsset.address] || 0n}
        showDropdown={false}
      />

      <div className="mb-4 p-4  border border-divider">
        <div className="flex justify-between items-center mb-2">
          <Text type="p" className="text-sm font-medium text-text-primary">
            Max. Pledge Alloweds
          </Text>
          <Text type="p" className="text-sm font-medium text-text-secondary">
            {progressPercentage.toFixed(1)}%
          </Text>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <Text type="p" className="text-sm font-medium text-text-primary">
            Est. Allocation
          </Text>
          <Text type="p" className="text-sm font-medium text-text-secondary">
            {truncateNumber(formatUnits(currentRaised, underlyingAsset.decimals))} {underlyingAsset.symbol}
          </Text>
          {/* <Text type="p">
            Target: {formatUnits(maxRaise, underlyingAsset.decimals)} {underlyingAsset.symbol}
          </Text> */}
        </div>
      </div>
      <button
        onClick={() => {
          if (isContributeDisabled || txnState !== null) return;
          contribute(parseUnits(contributionAmount, underlyingAsset.decimals)).then(() => {
            setContributionAmount('');
            refreshOnChainData();
          });
        }}
        disabled={isContributeDisabled || txnState !== null}
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
        `}
      >
        {getTxnStateText(txnState, `Pledge to ${agentOnChainData.symbol}`)}
      </button>
    </div>
  );
}
