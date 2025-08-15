"use client";

import { agentsBySlug } from "@/constants/agents";
import { supportedChainIds } from "@/constants/chains";
import { AgentOnChainData, AgentPhase, AgentStaticInfo } from "@/types/agent";
import { getFormattedTimeLeft } from "@/utils/dateTime";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatUnits } from "viem";
import Text from "../ui/Text";
import AgentPlaceholder from "../AgentPlaceholder";
import { endedPlaceholder, upcomingPlaceholder } from "@/content";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface AgentCardProps {
  agentsOnChainDataByAddress: Record<string, AgentOnChainData | null>;
}

const tabs = ["live", "upcoming", "ended"] as const;
type AvailableTabs = (typeof tabs)[number];

const AgentCard = ({ agentsOnChainDataByAddress }: AgentCardProps) => {
  const chainId = supportedChainIds.bsc;
  const agents = Object.values(agentsBySlug[chainId]);

  const liveAgents: AgentStaticInfo[] = [];
  const endedAgents: AgentStaticInfo[] = [];
  const upcomingAgents: AgentStaticInfo[] = [];

  const getInitialTab = (): AvailableTabs => {
    if (liveAgents.length > 0) return "live";
    if (upcomingAgents.length > 0) return "upcoming";
    return "ended";
  };

  const [tab, setTab] = useState<AvailableTabs>(getInitialTab());

  agents.forEach((agent) => {
    if (agent.status === "deployed") {
      const onChainData = agentsOnChainDataByAddress[agent.address];
      if (onChainData?.currentPhase === AgentPhase.Fundraising) {
        liveAgents.push(agent);
      } else if (
        onChainData?.currentPhase === AgentPhase.Ended ||
        onChainData?.currentPhase === AgentPhase.Finalized
      ) {
        endedAgents.push(agent);
      }
    } else if (agent.status === "upcoming") {
      upcomingAgents.push(agent);
    }
  });
  const filtered =
    tab === "live"
      ? liveAgents
      : tab === "upcoming"
        ? upcomingAgents
        : endedAgents;

  return (
    <div className="max-w-xs md:max-w-7xl mx-auto py-6">
      <div className="hidden border border-form-outline py-1 w-full md:w-1/3 my-4">
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as AvailableTabs)}
          className="w-full"
        >
          <div className="relative">
            <TabsList className="grid grid-cols-3 w-full overflow-hidden bg-white">
              <motion.div
                className="absolute h-full bg-black z-0"
                style={{
                  left: `calc(${tabs.indexOf(tab)} * (100% / 3) + 1rem)`,
                  width: "calc(33.333% - 2rem)",
                }}
                initial={false}
                animate={{
                  left: `calc(${tabs.indexOf(tab)} * (100% / 3) + 1rem)`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              {tabs.map((status) => (
                <TabsTrigger
                  key={status}
                  value={status}
                  className={clsx(
                    "relative z-10 transition-colors text-xs duration-300",
                    tab === status
                      ? "text-white font-semibold"
                      : "text-text-secondary"
                  )}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>

      {filtered.length === 0 && tab === "upcoming" ? (
        <AgentPlaceholder {...upcomingPlaceholder} />
      ) : filtered.length === 0 && tab === "ended" ? (
        <AgentPlaceholder {...endedPlaceholder} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((agentStaticInfo) => {
              const agentOnChainData =
                agentStaticInfo.status === "deployed"
                  ? agentsOnChainDataByAddress[agentStaticInfo.address]
                  : undefined;
              const raisedAmount = agentOnChainData
                ? agentOnChainData.maxRaise - agentOnChainData.remainingCapacity
                : 0n;
              return (
                <Link href={agentStaticInfo.link} key={agentStaticInfo.id}>
                  <div className="border border-divider p-4 bg-white hover:shadow-lg transition duration-300 ease-in-out">
                    <div className="flex gap-4 items-start">
                      <Image
                        src={agentStaticInfo.image}
                        alt={agentStaticInfo.name}
                        width={80}
                        height={80}
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <Text
                            type="h2"
                            className="font-bold text-sm text-text-primary"
                          >
                            {agentStaticInfo.name}
                          </Text>
                          <Text
                            type="span"
                            className="text-sm font-medium text-text-secondary"
                          >
                            ${agentStaticInfo.symbol}
                          </Text>
                          <Image
                            src="/verified-icon.svg"
                            alt="Verified"
                            width={16}
                            height={16}
                          />
                        </div>
                        <Text
                          type="p"
                          className="text-xs text-text-primary line-clamp-3"
                        >
                          {agentStaticInfo.description}
                        </Text>
                      </div>
                    </div>

                    {agentOnChainData?.currentPhase ===
                      AgentPhase.Fundraising && (
                      <>
                        <div className="text-sm text-gray-600 flex justify-between items-center">
                          <span>Funding Goals</span>
                          <span>
                            {formatUnits(
                              raisedAmount,
                              agentOnChainData.underlyingAssetDetails.decimals
                            )}{" "}
                            /{" "}
                            {formatUnits(
                              agentOnChainData.maxRaise,
                              agentOnChainData.underlyingAssetDetails.decimals
                            )}{" "}
                            {agentOnChainData.underlyingAssetDetails.symbol}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-3  overflow-hidden">
                          <div
                            className="h-full bg-black"
                            style={{
                              width: `${(raisedAmount / agentOnChainData.maxRaise) * 100n}%`,
                            }}
                          />
                        </div>
                        <div className="bg-black text-white text-center py-2 text-sm ">
                          Ending in{" "}
                          {getFormattedTimeLeft(
                            agentOnChainData.fundraiseEndTime
                          )}
                        </div>
                      </>
                    )}

                    {agentStaticInfo.status === "upcoming" && (
                      <div className="bg-background-gray text-center py-3 text-sm font-medium text-black mt-4">
                        {agentStaticInfo.launchDate &&
                        new Date(agentStaticInfo.launchDate) > new Date()
                          ? `Starting in ${getFormattedTimeLeft(agentStaticInfo.launchDate)}`
                          : "Starting Soon"}
                      </div>
                    )}

                    {agentOnChainData?.currentPhase === AgentPhase.Ended && (
                      <>
                        <Text
                          type="p"
                          className={clsx(
                            "text-sm font-normal text-center py-2 mt-2",
                            agentOnChainData.remainingCapacity === 0n
                              ? "bg-background-green text-positive"
                              : "bg-background-red text-ngative"
                          )}
                        >
                          {agentOnChainData.remainingCapacity === 0n
                            ? "100% Funded"
                            : "Not Funded"}
                        </Text>
                        <Text
                          type="p"
                          className="bg-background-gray text-center font-normal py-2 text-sm"
                        >
                          {agentOnChainData.remainingCapacity === 0n
                            ? `Unlocking in ${getFormattedTimeLeft(agentOnChainData.operationalEndTime)}`
                            : "Refund Available"}
                        </Text>
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AgentCard;
