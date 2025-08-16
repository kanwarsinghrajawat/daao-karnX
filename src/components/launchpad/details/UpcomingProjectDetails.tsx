"use client";
import { useState } from "react";
import PledgeModal from "@/components/projectActions/PledgeModal";
import { UpcomingProjectStaticInfo } from "@/types/project";
import { UpcomingProjectDetailsPanel } from "./projectDetailsPanel";
import { motion } from "framer-motion";
interface UpcomingProjectDetailsPageProps {
  projectBasicInfo: UpcomingProjectStaticInfo;
}

const UpcomingProjectDetailsPage = ({
  projectBasicInfo,
}: UpcomingProjectDetailsPageProps) => {
  const [activeTab, setActiveTab] = useState<"info" | "pledge">("info");

  return (
    <div className="py-6 mx-6 sm:max-w-7xl sm:mx-auto flex flex-col lg:flex-row gap-16">
      <div className="hidden lg:block flex-1 lg:flex-[3]">
        <UpcomingProjectDetailsPanel projectBasicInfo={projectBasicInfo} />
      </div>
      <div className="hidden lg:block flex-1 max-w-sm md:lg:flex-[2]">
        <PledgeModal launchDate={projectBasicInfo.launchDate} />
      </div>

      <div className="lg:hidden">
        {/* bottom segmented bar */}
        <div
          className="
    fixed inset-x-0 bottom-0 z-40
    bg-[#141414]/90 backdrop-blur
    border-t border-slate-800/70
    px-4 py-3 pb-[env(safe-area-inset-bottom)]
  "
        >
          <div className="max-w-7xl mx-auto">
            <div
              role="tablist"
              aria-label="Project actions"
              className="relative isolate flex w-full rounded-xl ring-1 ring-slate-800/70 bg-[#1a1a1a] p-1"
            >
              {/* moving highlight */}
              <motion.div
                layoutId="mobile-seg-pill"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                className={`absolute inset-y-1 rounded-lg bg-[#2a2a2a] ring-1 ring-slate-700/60
            ${activeTab === "info" ? "left-1 right-1/2" : "left-1/2 right-1"}`}
              />

              <button
                onClick={() => setActiveTab("info")}
                role="tab"
                aria-selected={activeTab === "info"}
                className={`relative z-10 flex-1 px-4 py-2 rounded-lg text-sm font-mono transition-colors
            ${activeTab === "info" ? "text-slate-100" : "text-slate-300 hover:text-slate-100"}`}
              >
                Info
              </button>

              <button
                onClick={() => setActiveTab("pledge")}
                role="tab"
                aria-selected={activeTab === "pledge"}
                className={`relative z-10 flex-1 px-4 py-2 rounded-lg text-sm font-mono transition-colors
            ${activeTab === "pledge" ? "text-slate-100" : "text-slate-300 hover:text-slate-100"}`}
              >
                Pledge
              </button>
            </div>
          </div>
        </div>

        {/* content with spacer so it doesn't hide behind the bar */}
        <div className="pt-4 pb-24">
          {activeTab === "info" ? (
            <UpcomingProjectDetailsPanel projectBasicInfo={projectBasicInfo} />
          ) : (
            <PledgeModal launchDate={projectBasicInfo.launchDate} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingProjectDetailsPage;
