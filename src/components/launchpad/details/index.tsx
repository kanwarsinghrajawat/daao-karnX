"use client";
import { getProjectOnChainInfo } from "@/helper/project/projectOnChainInfo";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import {
  ProjectOnChainData,
  ProjectPhase,
  DeployedProjectStaticInfo,
} from "@/types/project";
import { useEffect, useState } from "react";
import ProjectActionPanel from "./ProjectActionPanel";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectDetailsPanel } from "./projectDetailsPanel";
import { useAccount } from "wagmi";
import ConnectWalletCard from "@/components/projectActions/ConnectWalletCard";

interface ProjectDetailsPageProps {
  projectBasicInfo: DeployedProjectStaticInfo;
  projectOnChainData: ProjectOnChainData;
}

const ProjectDetailsPage = ({
  projectBasicInfo,
  projectOnChainData,
}: ProjectDetailsPageProps) => {
  const [currentOnChainData, setCurrentOnChainData] =
    useState<ProjectOnChainData>(projectOnChainData);
  const [activeTab, setActiveTab] = useState<"info" | "trade">("info");

  const { address: account } = useAccount();

  const {
    userContributionDetails,
    fetchUserContributionDetails,
    isUserContributionDetailsLoading,
  } = useUserDashboard({
    chainId: projectBasicInfo.chainId,
    projectAddress: projectBasicInfo.address,
  });

  const refreshOnChainData = async () => {
    const res = await getProjectOnChainInfo(
      projectBasicInfo.address,
      projectBasicInfo.chainId
    );
    if (res) {
      setCurrentOnChainData(res);
    }
  };

  const refreshUserContributionDetails = async () => {
    await fetchUserContributionDetails();
  };

  useEffect(() => {
    if (
      currentOnChainData.currentPhase === ProjectPhase.Fundraising &&
      currentOnChainData.isFundraiseActive
    ) {
      const interval = setInterval(() => {
        refreshOnChainData();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [currentOnChainData]);

  useEffect(() => {
    if (projectBasicInfo.address) {
      fetchUserContributionDetails();
    }
  }, [projectBasicInfo.address]);

  return (
    <div className="py-6 sm:max-w-7xl mx-6 sm:mx-auto flex flex-col lg:flex-row gap-16">
      <div className="hidden lg:block flex-1 lg:flex-[3]">
        <ProjectDetailsPanel
          projectBasicInfo={projectBasicInfo}
          projectOnChainData={currentOnChainData}
        />
      </div>

      <div className="hidden lg:block flex-1 max-w-sm md:lg:flex-[2]">
        {account ? (
          <ProjectActionPanel
            projectBasicInfo={projectBasicInfo}
            projectOnChainData={currentOnChainData}
            refreshOnChainData={refreshOnChainData}
            userContributionDetails={userContributionDetails}
            refreshUserContributionDetails={refreshUserContributionDetails}
            isContributionDetailsLoading={isUserContributionDetailsLoading}
          />
        ) : (
          <ConnectWalletCard />
        )}
      </div>

      <div className="lg:hidden">
        <div
          className="
  fixed inset-x-0 bottom-0 z-40
  border-t border-slate-800/70
  bg-[#141414]/90 backdrop-blur
  px-4 py-3 pb-[env(safe-area-inset-bottom)]
"
        >
          <div className="max-w-7xl mx-auto">
            <div
              role="tablist"
              aria-label="Project actions"
              className="relative isolate inline-flex w-full rounded-xl ring-1 ring-slate-800/70 bg-[#1a1a1a] p-1"
            >
              {/* moving highlight */}
              <motion.div
                layoutId="seg-pill"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                className={`absolute inset-y-1 rounded-lg bg-[#2a2a2a] ring-1 ring-slate-700/60
          ${activeTab === "info" ? "left-1 right-1/2" : "left-1/2 right-1"}`}
              />

              {/* Info */}
              <button
                onClick={() => setActiveTab("info")}
                className={`relative z-10 flex-1 px-4 py-2 rounded-lg text-sm font-mono transition-colors
          ${activeTab === "info" ? "text-slate-100" : "text-slate-300 hover:text-slate-100"}`}
                aria-selected={activeTab === "info"}
                role="tab"
              >
                Info
              </button>

              {/* Trade */}
              <button
                onClick={() => setActiveTab("trade")}
                className={`relative z-10 flex-1 px-4 py-2 rounded-lg text-sm font-mono transition-colors
          ${activeTab === "trade" ? "text-slate-100" : "text-slate-300 hover:text-slate-100"}`}
                aria-selected={activeTab === "trade"}
                role="tab"
              >
                Trade
              </button>
            </div>
          </div>
        </div>
        <div className="md:pt-4 pb-16">
          <AnimatePresence mode="wait">
            {activeTab === "info" ? (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectDetailsPanel
                  projectBasicInfo={projectBasicInfo}
                  projectOnChainData={currentOnChainData}
                />
              </motion.div>
            ) : (
              <motion.div
                key="trade"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectActionPanel
                  projectBasicInfo={projectBasicInfo}
                  projectOnChainData={currentOnChainData}
                  refreshOnChainData={refreshOnChainData}
                  userContributionDetails={userContributionDetails}
                  refreshUserContributionDetails={
                    refreshUserContributionDetails
                  }
                  isContributionDetailsLoading={
                    isUserContributionDetailsLoading
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
