"use client";
import ClaimTokensModal from "@/components/projectActions/ClaimTokensModal";
import FundraisingModal from "@/components/projectActions/FundraisingModal";
import RedeemModal from "@/components/projectActions/RedeemModal";
import SwapModal from "@/components/projectActions/SwapModal";
// import { CustomConnectButton } from "@/components/CustomConnectButton";
import {
  ProjectOnChainData,
  ProjectPhase,
  DeployedProjectStaticInfo,
} from "@/types/project";
import { UserContributionDetails } from "@/types/user";

interface ProjectActionPanelProps {
  projectBasicInfo: DeployedProjectStaticInfo;
  projectOnChainData: ProjectOnChainData;
  refreshOnChainData: () => void;
  isContributionDetailsLoading: boolean;
  userContributionDetails: UserContributionDetails;
  refreshUserContributionDetails: () => void;
}

const ProjectActionPanel = ({
  projectBasicInfo,
  projectOnChainData,
  refreshOnChainData,
  isContributionDetailsLoading,
  userContributionDetails,
  refreshUserContributionDetails,
}: ProjectActionPanelProps) => {
  const { fundraiseEndTime, isFundraiseActive, currentPhase } =
    projectOnChainData;

  const showFundraiseModal =
    currentPhase === ProjectPhase.Fundraising ||
    (isFundraiseActive && new Date() < fundraiseEndTime);

  const showClaimModalShimmer =
    isContributionDetailsLoading && currentPhase !== ProjectPhase.Fundraising;

  const showSwapModal =
    !isContributionDetailsLoading &&
    currentPhase === ProjectPhase.Finalized &&
    (userContributionDetails.hasClaimed ||
      userContributionDetails.contributionAmount === 0n);

  const showClaimModal =
    !showSwapModal &&
    !isContributionDetailsLoading &&
    (currentPhase === ProjectPhase.Finalized ||
      (userContributionDetails.contributionAmount > 0n &&
        userContributionDetails.tokenAllocation > 0n &&
        !userContributionDetails.hasClaimed));

  const showRedeemModal =
    !showClaimModal &&
    !showClaimModalShimmer &&
    currentPhase === ProjectPhase.Ended;

  return (
    <div className="md:py-6 rounded-2xl h-fit space-y-4">
      {showFundraiseModal && (
        <FundraisingModal
          projectInfo={projectBasicInfo}
          projectOnChainData={projectOnChainData}
          refreshOnChainData={refreshOnChainData}
        />
      )}

      {showClaimModal && (
        <ClaimTokensModal
          projectInfo={projectBasicInfo}
          projectOnChainData={projectOnChainData}
          refreshUserContributionDetails={refreshUserContributionDetails}
          userContributionDetails={userContributionDetails}
        />
      )}
      {showSwapModal && (
        <SwapModal
          token0={projectOnChainData.projectTokenDetails}
          token1={projectOnChainData.underlyingAssetDetails}
          projectBasicInfo={projectBasicInfo}
          projectOnChainData={projectOnChainData}
        />
      )}
      {showRedeemModal && (
        <RedeemModal
          srcToken={{
            address: projectBasicInfo.address,
            name: projectOnChainData.symbol,
            decimals: projectOnChainData.decimals,
            logo: projectBasicInfo.logo || projectBasicInfo.imageDesktop,
            symbol: projectOnChainData.symbol,
          }}
          destToken={projectOnChainData.underlyingAssetDetails}
          projectBasicInfo={projectBasicInfo}
        />
      )}
    </div>
  );
};

export default ProjectActionPanel;
