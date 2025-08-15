"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

import AddressLink from "@/components/ui/AddressLink";
import Text from "@/components/ui/Text";
import { AgentOnChainData, DeployedAgentStaticInfo } from "@/types/agent";
import { formatNumber } from "@/utils/number";
import { SocialsList } from "../SocialsList";

type AgentCarouselProps = {
  agents: {
    agentBasicInfo: DeployedAgentStaticInfo;
    onChainData: AgentOnChainData;
  }[];
};

const AgentsCarousel = ({ agents }: AgentCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const router = useRouter();

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScroll({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.85;
    el.scrollTo({
      left:
        direction === "left"
          ? el.scrollLeft - scrollAmount
          : el.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateScrollButtons();
    el.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const handleRowClick = (slug: string) => router.push(`/agent/${slug}`);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-5 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pr-4 md:pr-6"
      >
        {agents.map(({ agentBasicInfo, onChainData }) => (
          <article
            key={agentBasicInfo.id}
            onClick={() => handleRowClick(agentBasicInfo.slug)}
            className="
              snap-start select-none cursor-pointer
              bg-[#141414] rounded-2xl ring-1 ring-slate-800/70
              transition-all duration-300
              hover:-translate-y-0.5 hover:ring-orange-400/50 hover:shadow-[0_0_24px_rgba(251,146,60,0.12)]
              p-5 flex flex-col flex-shrink-0
              min-w-[85%] max-w-[85%] 
            "
          >
            {/* image on top */}
            <div className="relative w-full h-[200px] rounded-xl overflow-hidden bg-[#1b1b1b] ring-1 ring-slate-800">
              <img
                src={agentBasicInfo.image}
                alt={agentBasicInfo.name}
                className="w-full h-full object-cover"
              />
              {/* symbol pill */}
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#121212] ring-1 ring-slate-800 text-[10px] text-slate-300 font-mono">
                ${agentBasicInfo.symbol}
              </span>
            </div>

            {/* title + description */}
            <div className="mt-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Text type="p" className="font-bold text-xl text-slate-100">
                  {agentBasicInfo.name}
                </Text>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#112229] text-cyan-300 text-[11px] ring-1 ring-slate-800/70">
                  <Image
                    src="/verified-icon.svg"
                    alt="Verified"
                    width={14}
                    height={14}
                  />
                  Verified
                </span>
              </div>
              <p className="text-sm text-slate-300/90 mt-2 leading-relaxed line-clamp-3">
                {agentBasicInfo.description}
              </p>
            </div>

            {/* stat chips in one row */}
            <div className="mt-4 mb-4 flex gap-2 flex-wrap">
              <StatChip
                label="Market Cap"
                value={`$${formatNumber(agentBasicInfo.marketData.marketCap)}`}
              />
              <StatChip
                label="TVL"
                value={`$${formatNumber(agentBasicInfo.marketData.tvl)}`}
              />
              <StatChip
                label="24h Vol"
                value={`$${formatNumber(agentBasicInfo.marketData.volume)}`}
              />
            </div>

            {/* meta rows */}
            <div className="flex flex-col gap-2">
              <Row
                label="Agent contract"
                value={
                  <AddressLink
                    address={onChainData.address}
                    chainId={agentBasicInfo.chainId}
                  />
                }
              />
              <Row
                label="Creator"
                value={
                  <AddressLink
                    address={onChainData.creator}
                    chainId={agentBasicInfo.chainId}
                  />
                }
              />
              <Row
                label="Socials"
                value={<SocialsList socials={agentBasicInfo.socials} />}
              />
            </div>
          </article>
        ))}
      </div>

      {/* paddles */}
      {canScroll.left && (
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full
                     bg-[#121212]/90 hover:bg-[#1b1b1b] transition-colors
                     ring-1 ring-slate-800/70 shadow-lg backdrop-blur-sm"
        >
          <ChevronLeft className="h-5 w-5 text-slate-200" />
        </button>
      )}
      {canScroll.right && (
        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full
                     bg-[#121212]/90 hover:bg-[#1b1b1b] transition-colors
                     ring-1 ring-slate-800/70 shadow-lg backdrop-blur-sm"
        >
          <ChevronRight className="h-5 w-5 text-slate-200" />
        </button>
      )}
    </div>
  );
};

export default AgentsCarousel;

/* ---- helpers ---- */
function StatChip({ label, value }: { label: string; value: string | number }) {
  return (
    <span
      className="
        inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full
        bg-[#1b1b1b] ring-1 ring-slate-800/70
        text-[10px] text-slate-300 font-mono
      "
    >
      <span className="text-slate-400">{label}:</span>
      <span className="text-slate-100">{value}</span>
    </span>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode | string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-300">{label}</span>
      <span className="text-xs text-slate-400">{value}</span>
    </div>
  );
}
