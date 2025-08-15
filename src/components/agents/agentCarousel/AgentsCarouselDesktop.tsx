"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

import AddressLink from "@/components/ui/AddressLink";
import Text from "@/components/ui/Text";
import { AgentOnChainData, DeployedAgentStaticInfo } from "@/types/agent";
import { formatDate } from "@/utils/dateTime";
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
      left: el.scrollLeft > 0,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    });
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
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
    const handleScroll = () => updateScrollButtons();
    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const handleRowClick = (slug: string) => {
    router.push(`/agent/${slug}`);
  };

  return (
    <div className="relative">
      {/* scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 pb-3 pr-5"
      >
        {agents.map(({ agentBasicInfo, onChainData }) => (
          <div
            key={agentBasicInfo.id}
            onClick={() => handleRowClick(agentBasicInfo.slug)}
            className="snap-center bg-[#171717] hover:bg-[#1c1c1c] transition-colors
             rounded-2xl ring-1 ring-slate-800/70 shadow-[0_1px_0_0_rgba(0,0,0,.5)]
             pt-6 pb-5 px-5 flex flex-col cursor-pointer flex-shrink-0
             min-w-[88%] max-w-[88%] sm:min-w-[68%] sm:max-w-[68%]"
          >
            {/* top */}
            <div className="flex flex-row gap-5 items-start">
              <div className="w-[108px] aspect-square flex items-center justify-center rounded-xl overflow-hidden bg-[#1f1f1f] ring-1 ring-slate-800">
                <img
                  src={agentBasicInfo.image}
                  alt={agentBasicInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Text type="p" className="font-bold text-xl text-slate-100">
                    {agentBasicInfo.name}
                  </Text>
                  <Text type="p" className="font-bold text-xl text-slate-300">
                    ${agentBasicInfo.symbol}
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
                  className="text-sm text-slate-300/90 mt-2 leading-relaxed line-clamp-3"
                >
                  {agentBasicInfo.description}
                </Text>
              </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-2 mt-6 mb-5 text-center border-b border-slate-800/80 pb-5">
              <div>
                <Text
                  type="p"
                  className="text-[11px] tracking-wide text-slate-400 mb-1"
                >
                  Market Cap
                </Text>
                <Text type="p" className="text-lg text-slate-100 font-mono">
                  ${formatNumber(agentBasicInfo.marketData.marketCap)}
                </Text>
              </div>
              <div>
                <Text
                  type="p"
                  className="text-[11px] tracking-wide text-slate-400 mb-1"
                >
                  TVL
                </Text>
                <Text type="p" className="text-lg text-slate-100 font-mono">
                  ${formatNumber(agentBasicInfo.marketData.tvl)}
                </Text>
              </div>
              <div>
                <Text
                  type="p"
                  className="text-[11px] tracking-wide text-slate-400 mb-1"
                >
                  Volume
                </Text>
                <Text type="p" className="text-lg text-slate-100 font-mono">
                  ${formatNumber(agentBasicInfo.marketData.volume)}
                </Text>
              </div>
            </div>

            {/* meta */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Text type="p" className="text-xs text-slate-300">
                  Born Date
                </Text>
                <Text type="p" className="text-xs text-slate-400">
                  {formatDate(agentBasicInfo.bornDate)}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text type="p" className="text-xs text-slate-300">
                  Expiry Date
                </Text>
                <Text type="p" className="text-xs text-slate-400">
                  {formatDate(agentBasicInfo.expiryDate)}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text type="p" className="text-xs text-slate-300">
                  Agent contract
                </Text>
                <AddressLink
                  address={onChainData.address}
                  chainId={agentBasicInfo.chainId}
                />
              </div>
              <div className="flex items-center justify-between">
                <Text type="p" className="text-xs text-slate-300">
                  Creator
                </Text>
                <AddressLink
                  address={onChainData.creator}
                  chainId={agentBasicInfo.chainId}
                />
              </div>
              <div className="flex items-center justify-between">
                <Text type="p" className="text-xs text-slate-300">
                  Socials
                </Text>
                <SocialsList socials={agentBasicInfo.socials} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* edge fades to hide harsh ends */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#0f0f0f] to-transparent rounded-l-2xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#0f0f0f] to-transparent rounded-r-2xl" />

      {/* scroll buttons */}
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
