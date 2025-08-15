"use client";
import { useState } from "react";
import PledgeModal from "@/components/agentActions/PledgeModal";
import { UpcomingAgentStaticInfo } from "@/types/agent";
import { UpcomingAgentDetailsPanel } from "./agentDetailsPanel";

interface UpcomingAgentDetailsPageProps {
  agentBasicInfo: UpcomingAgentStaticInfo;
}

const UpcomingAgentDetailsPage = ({
  agentBasicInfo,
}: UpcomingAgentDetailsPageProps) => {
  const [activeTab, setActiveTab] = useState<"info" | "pledge">("info");

  return (
    <div className="py-6 mx-6 sm:max-w-7xl sm:mx-auto flex flex-col lg:flex-row gap-16">
      {/* <div className="hidden lg:block flex-1 lg:flex-[3]">
        <UpcomingAgentDetailsPanel agentBasicInfo={agentBasicInfo} />
      </div>
      <div className="hidden lg:block flex-1 max-w-sm md:lg:flex-[2]">
        <PledgeModal launchDate={agentBasicInfo.launchDate} />
      </div> */}

      <div className="">
        <div className="flex border-t border-form-outline fixed gap-3 bottom-0 left-0 w-full bg-white z-10 p-4">
          <button
            className={`flex-1 text-sm py-2 border border-text-primary ${activeTab === "info" ? "bg-black text-white font-semibold" : "text-text-primary"}`}
            onClick={() => setActiveTab("info")}
          >
            Info
          </button>
          <button
            className={`flex-1 text-sm py-2 border border-text-primary ${activeTab === "pledge" ? "bg-black text-white font-semibold" : " text-text-primary"}`}
            onClick={() => setActiveTab("pledge")}
          >
            Pledge
          </button>
        </div>
        <div className="pt-4 pb-16">
          {activeTab === "info" ? (
            <UpcomingAgentDetailsPanel agentBasicInfo={agentBasicInfo} />
          ) : (
            <PledgeModal launchDate={agentBasicInfo.launchDate} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingAgentDetailsPage;
