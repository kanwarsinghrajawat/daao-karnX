"use client";

import { projectsBySlug } from "@/constants/projects";
import { supportedChainIds } from "@/constants/chains";
import { Tabs, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";
import { ProjectOnChainData, ProjectPhase, ProjectStaticInfo } from "@/types/project";
import { getFormattedTimeLeft } from "@/utils/dateTime";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatUnits } from "viem";
import Text from "../ui/Text";
import ProjectPlaceholder from "../ProjectPlaceholder";
import { endedPlaceholder, upcomingPlaceholder } from "@/content";

interface ProjectCardProps {
  projectsOnChainDataByAddress: Record<string, ProjectOnChainData | null>;
}

const tabs = ["live", "upcoming", "ended"] as const;
type AvailableTabs = (typeof tabs)[number];

const ProjectCard = ({ projectsOnChainDataByAddress }: ProjectCardProps) => {
  const chainId = supportedChainIds.bsc;
  const projects = Object.values(projectsBySlug[chainId]);

  const liveProjects: ProjectStaticInfo[] = [];
  const endedProjects: ProjectStaticInfo[] = [];
  const upcomingProjects: ProjectStaticInfo[] = [];

  // Categorize projects first
  projects.forEach((project) => {
    if (project.status === "deployed") {
      const onChainData = projectsOnChainDataByAddress[project.address];
      if (onChainData?.currentPhase === ProjectPhase.Fundraising) {
        liveProjects.push(project);
      } else if (
        onChainData?.currentPhase === ProjectPhase.Ended ||
        onChainData?.currentPhase === ProjectPhase.Finalized
      ) {
        endedProjects.push(project);
      }
    } else if (project.status === "upcoming") {
      upcomingProjects.push(project);
    }
  });

  const getInitialTab = (): AvailableTabs => {
    if (liveProjects.length > 0) return "live";
    if (upcomingProjects.length > 0) return "upcoming";
    return "ended";
  };

  const [tab, setTab] = useState<AvailableTabs>(getInitialTab());
  const filtered =
    tab === "live"
      ? liveProjects
      : tab === "upcoming"
        ? upcomingProjects
        : endedProjects;

  return (
    <div className="max-w-xs md:max-w-7xl mx-auto py-6">
      <Text type="h3" className="text-2xl text-text-primary font-bold">
        Launch Pad
      </Text>
      <div className="border border-form-outline py-1 w-full md:w-1/3 my-4">
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as AvailableTabs)}
          className="w-full"
        >
          <div className="relative">
            <TabsList className="grid grid-cols-3 w-full overflow-hidden bg-[#171717]">
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
        <ProjectPlaceholder {...upcomingPlaceholder} />
      ) : filtered.length === 0 && tab === "ended" ? (
        <ProjectPlaceholder {...endedPlaceholder} />
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
            {filtered.map((projectStaticInfo) => {
              const projectOnChainData =
                projectStaticInfo.status === "deployed"
                  ? projectsOnChainDataByAddress[projectStaticInfo.address]
                  : undefined;
              const raisedAmount = projectOnChainData
                ? projectOnChainData.maxRaise - projectOnChainData.remainingCapacity
                : 0n;
              return (
                <Link href={projectStaticInfo.link} key={projectStaticInfo.id}>
                  <div className="border border-divider p-4 bg-[#171717] hover:shadow-lg transition duration-300 ease-in-out">
                    <div className="flex gap-4 items-start">
                      <Image
                        src={projectStaticInfo.imageDesktop}
                        alt={projectStaticInfo.name}
                        width={80}
                        height={80}
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <Text
                            type="h2"
                            className="font-bold text-sm text-text-primary"
                          >
                            {projectStaticInfo.name}
                          </Text>
                          <Text
                            type="span"
                            className="text-sm font-medium text-text-secondary"
                          >
                            ${projectStaticInfo.symbol}
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
                          {projectStaticInfo.description}
                        </Text>
                      </div>
                    </div>

                    {projectOnChainData?.currentPhase ===
                      ProjectPhase.Fundraising && (
                      <>
                        <div className="text-sm text-gray-600 flex justify-between items-center">
                          <span>Funding Goals</span>
                          <span>
                            {formatUnits(
                              raisedAmount,
                              projectOnChainData.underlyingAssetDetails.decimals
                            )}{" "}
                            /{" "}
                            {formatUnits(
                              projectOnChainData.maxRaise,
                              projectOnChainData.underlyingAssetDetails.decimals
                            )}{" "}
                            {projectOnChainData.underlyingAssetDetails.symbol}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-3  overflow-hidden">
                          <div
                            className="h-full bg-black"
                            style={{
                              width: `${(raisedAmount / projectOnChainData.maxRaise) * 100n}%`,
                            }}
                          />
                        </div>
                        <div className="bg-black text-white text-center py-2 text-sm ">
                          Ending in{" "}
                          {getFormattedTimeLeft(
                            projectOnChainData.fundraiseEndTime
                          )}
                        </div>
                      </>
                    )}

                    {projectStaticInfo.status === "upcoming" && (
                      <div className="bg-background-gray text-center py-3 text-sm font-medium text-black mt-4">
                        {projectStaticInfo.launchDate &&
                        new Date(projectStaticInfo.launchDate) > new Date()
                          ? `Starting in ${getFormattedTimeLeft(projectStaticInfo.launchDate)}`
                          : "Starting Soon"}
                      </div>
                    )}

                    {projectOnChainData?.currentPhase === ProjectPhase.Ended && (
                      <>
                        <Text
                          type="p"
                          className={clsx(
                            "text-sm font-normal text-center py-2 mt-2",
                            projectOnChainData.remainingCapacity === 0n
                              ? "bg-background-green text-positive"
                              : "bg-background-red text-ngative"
                          )}
                        >
                          {projectOnChainData.remainingCapacity === 0n
                            ? "100% Funded"
                            : "Not Funded"}
                        </Text>
                        <Text
                          type="p"
                          className="bg-background-gray text-center font-normal py-2 text-sm"
                        >
                          {projectOnChainData.remainingCapacity === 0n
                            ? `Unlocking in ${getFormattedTimeLeft(projectOnChainData.operationalEndTime)}`
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

export default ProjectCard;
