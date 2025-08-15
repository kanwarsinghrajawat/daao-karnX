"use client";
import { getAgentOnChainInfo } from "@/helper/agent/agentOnChainInfo";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import {
  AgentOnChainData,
  AgentPhase,
  DeployedAgentStaticInfo,
} from "@/types/agent";
import { useEffect, useState } from "react";
import AgentActionPanel from "./AgentActionPanel";
import { motion, AnimatePresence } from "framer-motion";
import { AgentDetailsPanel } from "./agentDetailsPanel";
import { useAccount } from "wagmi";

interface AgentDetailsPageProps {
  agentBasicInfo: DeployedAgentStaticInfo;
  agentOnChainData: AgentOnChainData;
}

const AgentDetailsPage = ({
  agentBasicInfo,
  agentOnChainData,
}: AgentDetailsPageProps) => {
  const [currentOnChainData, setCurrentOnChainData] =
    useState<AgentOnChainData>(agentOnChainData);
  const [activeTab, setActiveTab] = useState<"info" | "trade">("info");
  const { address: account } = useAccount();

  const {
    userContributionDetails,
    fetchUserContributionDetails,
    isUserContributionDetailsLoading,
  } = useUserDashboard({
    chainId: agentBasicInfo.chainId,
    agentAddress: agentBasicInfo.address,
  });

  const refreshOnChainData = async () => {
    const res = await getAgentOnChainInfo(
      agentBasicInfo.address,
      agentBasicInfo.chainId
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
      currentOnChainData.currentPhase === AgentPhase.Fundraising &&
      currentOnChainData.isFundraiseActive
    ) {
      const interval = setInterval(() => {
        refreshOnChainData();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [currentOnChainData]);

  useEffect(() => {
    if (agentBasicInfo.address) {
      fetchUserContributionDetails();
    }
  }, [agentBasicInfo.address]);

  return (
    <div className="py-6 sm:max-w-7xl mx-6 sm:mx-auto flex flex-col lg:flex-row gap-16">
      <div className="hidden lg:block flex-1 lg:flex-[3]">
        <AgentDetailsPanel
          agentBasicInfo={agentBasicInfo}
          agentOnChainData={currentOnChainData}
        />
      </div>
      {account ? (
        <div className="hidden lg:block flex-1 max-w-sm md:lg:flex-[2]">
          <AgentActionPanel
            agentBasicInfo={agentBasicInfo}
            agentOnChainData={currentOnChainData}
            refreshOnChainData={refreshOnChainData}
            userContributionDetails={userContributionDetails}
            refreshUserContributionDetails={refreshUserContributionDetails}
            isContributionDetailsLoading={isUserContributionDetailsLoading}
          />
        </div>
      ) : (
        <div className="bg-[#171717] py-6 rounded-2xl h-fit space-y-4">
          <p className="text-center text-gray-500">
            Please connect your wallet to interact with the agent.
          </p>
        </div>
      )}

      <div className="lg:hidden">
        <div className="flex border-t border-form-outline fixed gap-3 bottom-0 left-0 w-full bg-[#171717] z-10 p-4">
          <button
            className={`flex-1 text-sm py-2 border border-text-primary ${activeTab === "info" ? "bg-black text-white font-semibold" : "text-text-primary"}`}
            onClick={() => setActiveTab("info")}
          >
            Info
          </button>
          <button
            className={`flex-1 text-sm py-2 border border-text-primary ${activeTab === "trade" ? "bg-black text-white font-semibold" : " text-text-primary"}`}
            onClick={() => setActiveTab("trade")}
          >
            Trade
          </button>
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
                <AgentDetailsPanel
                  agentBasicInfo={agentBasicInfo}
                  agentOnChainData={currentOnChainData}
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
                <AgentActionPanel
                  agentBasicInfo={agentBasicInfo}
                  agentOnChainData={currentOnChainData}
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

export default AgentDetailsPage;
