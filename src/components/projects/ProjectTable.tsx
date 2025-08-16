"use client";

import { ProjectOnChainData, ProjectStaticInfo } from "@/types/project";
import { truncateAddress } from "@/utils/address";
import { formatDate } from "@/utils/dateTime";
import { formatNumber } from "@/utils/number";
import { Bell, CheckCircle2, Copy, Search, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ComponentType, SVGProps, useState } from "react";
import { motion } from "framer-motion";
import ProductBanner from "./ProductBanner";
import Link from "next/link";

type Props = {
  projects: {
    projectBasicInfo: ProjectStaticInfo;
    onChainData: ProjectOnChainData | null;
  }[];
};

const ProjectTable = ({ projects }: Props) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [selected, setSelected] = useState<SegmentKey>("all");

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 1500);
  };

  const router = useRouter();
  const handleRowClick = (slug: string) => {
    router.push(`/project/${slug}`);
  };

  type SegmentKey = "all" | "deployed" | "upcoming";

  type IconType = ComponentType<SVGProps<SVGSVGElement>>;

  const segments: { key: SegmentKey; label: string; Icon?: IconType }[] = [
    { key: "all", label: "All" },
    { key: "deployed", label: "Live", Icon: CheckCircle2 },
    { key: "upcoming", label: "Upcoming", Icon: Bell },
  ];

  // Filter projects based on selected segment using static data
  const filteredProjects = projects.filter(({ projectBasicInfo }) => {
    switch (selected) {
      case "all":
        return true;
      case "deployed":
        return projectBasicInfo.status === "deployed";
      case "upcoming":
        return projectBasicInfo.status === "upcoming";
      default:
        return true;
    }
  });

  return (
    <>
      <ProductBanner />

      <div className="w-full overflow-x-auto  py-6 max-w-sm md:max-w-7xl md:mx-auto mx-6">
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* tabs */}
          <div
            role="tablist"
            aria-label="Filter"
            className="
      inline-flex w-full md:w-auto items-center bg-[#1f1f1f]
      ring-1 ring-slate-800/70 rounded-lg p-1 shadow-sm
      overflow-x-auto snap-x snap-mandatory gap-1
    "
          >
            {segments.map(({ key, label, Icon }) => {
              const active = selected === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelected(key)}
                  className={[
                    "relative isolate shrink-0 snap-center flex items-center gap-2",
                    "px-4 md:px-5 py-2 text-sm font-semibold rounded-md font-mono",
                    "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50",
                    active
                      ? "text-slate-100"
                      : "text-slate-300 hover:text-slate-100",
                  ].join(" ")}
                >
                  {active && (
                    <motion.div
                      layoutId="segmented-pill"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                      }}
                      className="absolute inset-0 rounded-md bg-[#2a2a2a] ring-1 ring-slate-700/50"
                    />
                  )}

                  {Icon && <Icon className="h-5 w-5 relative z-10" />}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>

          <Link
            href="https://forms.gle/rofCendPEAkgJs4VA"
            className="w-full md:w-auto px-4 py-2 rounded-md bg-[#2a2a2a] text-slate-200 
               ring-1 ring-slate-800/70 shadow-sm 
               hover:bg-[#333333] hover:ring-slate-700 
               transition-colors font-mono text-sm"
            target="_blank"
          >
            Create Project
          </Link>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center ring-1 ring-slate-700/50">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-slate-200 mb-2">
              No {selected === "all" ? "projects" : selected === "deployed" ? "live projects" : "upcoming projects"} found
            </h3>
            
            <p className="text-slate-400 text-center max-w-md mb-6">
              {selected === "upcoming" 
                ? "We're working on bringing exciting new projects to the platform. Check back soon for upcoming launches!"
                : selected === "deployed"
                ? "All projects are currently in development. New live projects will appear here once they're deployed."
                : "No projects match your current filter. Try selecting a different category or check back later."
              }
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setSelected("all")}
                className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-slate-200 rounded-lg transition-colors text-sm font-medium"
              >
                View All Projects
              </button>
              <Link
                href="https://forms.gle/rofCendPEAkgJs4VA"
                target="_blank"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Submit Your Project
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full text-sm text-slate-200 border-separate border-spacing-y-3">
              <thead className="bg-[#202020] text-slate-400">
                <tr className="text-left">
                  <th className="p-3 font-normal font-mono rounded-l-lg">
                    All Products
                  </th>
                  <th className="p-3 whitespace-nowrap font-normal font-mono">
                    Launch Date
                  </th>
                  <th className="p-3 whitespace-nowrap font-normal font-mono">
                    Funding Goal
                  </th>
                  <th className="p-3 whitespace-nowrap font-normal font-mono">
                    Category
                  </th>
                  <th className="p-3 whitespace-nowrap font-normal font-mono">
                    Status
                  </th>
                  <th className="p-3 whitespace-nowrap font-normal font-mono rounded-r-lg">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(({ projectBasicInfo, onChainData }) => (
                <tr
                  key={projectBasicInfo.id}
                  className="bg-[#1b1b1b] hover:bg-[#242424] transition-colors cursor-pointer rounded-lg ring-1 ring-slate-800/70"
                  onClick={() => handleRowClick(projectBasicInfo.slug)}
                >
                  <td className="p-4 flex items-center gap-4 whitespace-nowrap font-mono rounded-l-lg">
                    <Image
                      src={projectBasicInfo.imageDesktop}
                      alt={projectBasicInfo.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold font-mono text-slate-100 flex items-center gap-1">
                        {projectBasicInfo.name}{" "}
                        <span className="text-xs text-slate-400">
                          ${projectBasicInfo.symbol}
                        </span>
                        <Image
                          src="/verified-icon.svg"
                          alt="Verified"
                          width={16}
                          height={16}
                        />
                      </div>
                      {projectBasicInfo.status === "deployed" && (
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-1 bg-[#222] rounded px-2 py-0.5 w-fit">
                          {truncateAddress(projectBasicInfo.address)}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(projectBasicInfo.address);
                            }}
                            className="opacity-70 hover:opacity-100 transition"
                          >
                            <Copy size={14} />
                          </button>
                          {copied === projectBasicInfo.address && (
                            <span className="text-emerald-400 text-xs ml-1">
                              Copied!
                            </span>
                          )}
                        </div>
                      )}
                      {projectBasicInfo.status === "upcoming" && (
                        <div className="text-xs text-slate-400 mt-1 bg-[#222] rounded px-2 py-0.5 w-fit">
                          Coming Soon
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap font-mono">
                    {projectBasicInfo.status === "deployed" 
                      ? formatDate(projectBasicInfo.bornDate)
                      : formatDate(projectBasicInfo.launchDate)
                    }
                  </td>
                  <td className="p-4 whitespace-nowrap font-mono">
                    {projectBasicInfo.status === "deployed" 
                      ? `$${formatNumber(projectBasicInfo.marketData.totalFunded)}`
                      : `$${formatNumber(projectBasicInfo.fundingGoal)}`
                    }
                  </td>
                  <td className="p-4 whitespace-nowrap font-mono">
                    <span className="px-2 py-1 bg-slate-800/50 rounded-md text-xs">
                      {projectBasicInfo.category}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap font-mono">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      projectBasicInfo.status === "deployed" 
                        ? "bg-emerald-900/30 text-emerald-400 ring-1 ring-emerald-500/20"
                        : "bg-blue-900/30 text-blue-400 ring-1 ring-blue-500/20"
                    }`}>
                      {projectBasicInfo.status === "deployed" ? "Live" : "Coming Soon"}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap font-mono rounded-r-lg">
                    {projectBasicInfo.status === "deployed" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
                            style={{ width: `${Math.min(projectBasicInfo.marketData.fundingProgress, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">
                          {projectBasicInfo.marketData.fundingProgress}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </>
  );
};

export default ProjectTable;