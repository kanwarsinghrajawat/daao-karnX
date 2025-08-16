"use client";
import ClaimTokensModal from "@/components/agentActions/ClaimTokensModal";
import FundraisingModal from "@/components/agentActions/FundraisingModal";
import { AgentActionModalShimmer } from "@/components/agentActions/ModalShimmers";
import RedeemModal from "@/components/agentActions/RedeemModal";
import SwapModal from "@/components/agentActions/SwapModal";
import {
  AgentOnChainData,
  AgentPhase,
  DeployedAgentStaticInfo,
} from "@/types/agent";
import { UserContributionDetails } from "@/types/user";

interface AgentClaimPanelProps {
  agentBasicInfo: DeployedAgentStaticInfo;
  agentOnChainData: AgentOnChainData;
  refreshOnChainData: () => void;
  isContributionDetailsLoading: boolean;
  userContributionDetails: UserContributionDetails;
  refreshUserContributionDetails: () => void;
}

const AgentActionPanel = ({
  agentBasicInfo,
  agentOnChainData,
  refreshOnChainData,
  isContributionDetailsLoading,
  userContributionDetails,
  refreshUserContributionDetails,
}: AgentClaimPanelProps) => {
  const { fundraiseEndTime, isFundraiseActive, currentPhase } =
    agentOnChainData;

  const showFundraiseModal =
    currentPhase === AgentPhase.Fundraising ||
    (isFundraiseActive && new Date() < fundraiseEndTime);

  const showClaimModalShimmer =
    isContributionDetailsLoading && currentPhase !== AgentPhase.Fundraising;

  const showSwapModal =
    !isContributionDetailsLoading &&
    currentPhase === AgentPhase.Finalized &&
    (userContributionDetails.hasClaimed ||
      userContributionDetails.contributionAmount === 0n);

  const showClaimModal =
    !showSwapModal &&
    !isContributionDetailsLoading &&
    (currentPhase === AgentPhase.Finalized ||
      (userContributionDetails.contributionAmount > 0n &&
        userContributionDetails.tokenAllocation > 0n &&
        !userContributionDetails.hasClaimed));

  const showRedeemModal =
    !showClaimModal &&
    !showClaimModalShimmer &&
    currentPhase === AgentPhase.Ended;

  return (
    <div className="md:py-6 rounded-2xl h-fit space-y-4">
      {showFundraiseModal && (
        <FundraisingModal
          agentInfo={agentBasicInfo}
          agentOnChainData={agentOnChainData}
          refreshOnChainData={refreshOnChainData}
        />
      )}
      {showClaimModalShimmer && (
        <div className="flex flex-col gap-4">
          <AgentActionModalShimmer />
        </div>
      )}

      {showClaimModal && (
        <ClaimTokensModal
          agentInfo={agentBasicInfo}
          agentOnChainData={agentOnChainData}
          refreshUserContributionDetails={refreshUserContributionDetails}
          userContributionDetails={userContributionDetails}
        />
      )}
      {showSwapModal && (
        <SwapModal
          token0={agentOnChainData.agentTokenDetails}
          token1={agentOnChainData.underlyingAssetDetails}
          agentBasicInfo={agentBasicInfo}
          agentOnChainData={agentOnChainData}
        />
      )}
      {showRedeemModal && (
        <RedeemModal
          srcToken={{
            address: agentBasicInfo.address,
            name: agentOnChainData.symbol,
            decimals: agentOnChainData.decimals,
            logo: agentBasicInfo.image,
            symbol: agentOnChainData.symbol,
          }}
          destToken={agentOnChainData.underlyingAssetDetails}
          agentBasicInfo={agentBasicInfo}
        />
      )}
    </div>
  );
};

export default AgentActionPanel;
