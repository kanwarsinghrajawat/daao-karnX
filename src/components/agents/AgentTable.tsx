"use client";

import { AgentOnChainData, DeployedAgentStaticInfo } from "@/types/agent";
import { truncateAddress } from "@/utils/address";
import { formatDate } from "@/utils/dateTime";
import { formatNumber } from "@/utils/number";
import { Bell, CheckCircle2, Copy, Handshake, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ComponentType, SVGProps, useState } from "react";
import { motion } from "framer-motion";
import ProductBanner from "./ProductBanner";
import Link from "next/link";

type Props = {
  agents: {
    agentBasicInfo: DeployedAgentStaticInfo;
    onChainData: AgentOnChainData;
  }[];
};

const AgentTable = ({ agents }: Props) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [selected, setSelected] = useState<SegmentKey>("all");

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 1500);
  };

  const router = useRouter();
  const handleRowClick = (slug: string) => {
    router.push(`/agent/${slug}`);
  };

  type SegmentKey = "all" | "pledging" | "upcoming" | "succeeded" | "failed";

  type IconType = ComponentType<SVGProps<SVGSVGElement>>;

  const segments: { key: SegmentKey; label: string; Icon?: IconType }[] = [
    { key: "all", label: "All" },
    { key: "pledging", label: "Pledging", Icon: Handshake },
    { key: "upcoming", label: "Upcoming", Icon: Bell },
    { key: "succeeded", label: "Succeeded", Icon: CheckCircle2 },
    { key: "failed", label: "Failed", Icon: XCircle },
  ];

  return (
    <div className="w-full overflow-x-auto  py-6 max-w-sm md:max-w-7xl md:mx-auto mx-6">
      <ProductBanner />

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
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
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
        >
          Create Project
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm text-slate-200 border-separate border-spacing-y-3">
          <thead className="bg-[#202020] text-slate-400">
            <tr className="text-left">
              <th className="p-3 font-normal font-mono rounded-l-lg">
                All Products
              </th>
              <th className="p-3 whitespace-nowrap font-normal font-mono">
                Born Date
              </th>
              <th className="p-3 whitespace-nowrap font-normal font-mono">
                TVL
              </th>
              <th className="p-3 whitespace-nowrap font-normal font-mono">
                24h Chg
              </th>
              <th className="p-3 whitespace-nowrap font-normal font-mono">
                24h Vol
              </th>
              <th className="p-3 whitespace-nowrap font-normal font-mono rounded-r-lg">
                Token Price
              </th>
            </tr>
          </thead>
          <tbody>
            {agents.map(({ agentBasicInfo, onChainData }) => (
              <tr
                key={agentBasicInfo.id}
                className="bg-[#1b1b1b] hover:bg-[#242424] transition-colors cursor-pointer rounded-lg ring-1 ring-slate-800/70"
                onClick={() => handleRowClick(agentBasicInfo.slug)}
              >
                <td className="p-4 flex items-center gap-4 whitespace-nowrap font-mono rounded-l-lg">
                  <Image
                    src={agentBasicInfo.image}
                    alt={agentBasicInfo.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold font-mono text-slate-100 flex items-center gap-1">
                      {agentBasicInfo.name}{" "}
                      <span className="text-xs text-slate-400">
                        ${agentBasicInfo.symbol}
                      </span>
                      <Image
                        src="/verified-icon.svg"
                        alt="Verified"
                        width={16}
                        height={16}
                      />
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-1 bg-[#222] rounded px-2 py-0.5 w-fit">
                      {truncateAddress(onChainData.address)}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(onChainData.address);
                        }}
                        className="opacity-70 hover:opacity-100 transition"
                      >
                        <Copy size={14} />
                      </button>
                      {copied === onChainData.address && (
                        <span className="text-emerald-400 text-xs ml-1">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap font-mono">
                  {formatDate(agentBasicInfo.bornDate)}
                </td>
                <td className="p-4 whitespace-nowrap font-mono">{`$${formatNumber(agentBasicInfo.marketData.tvl)}`}</td>
                <td className="p-4 text-emerald-400 whitespace-nowrap font-mono">{`$${formatNumber(agentBasicInfo.marketData.volume)}`}</td>
                <td className="p-4 whitespace-nowrap font-mono text-red-400">
                  -{`$${formatNumber(agentBasicInfo.marketData.volume)}`}
                </td>
                <td className="p-4 whitespace-nowrap font-mono rounded-r-lg">{`$${formatNumber(agentBasicInfo.marketData.price)}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentTable;
