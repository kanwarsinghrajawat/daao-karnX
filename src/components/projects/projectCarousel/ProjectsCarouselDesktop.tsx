"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, FileText, Users, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

import AddressLink from "@/components/ui/AddressLink";
import Text from "@/components/ui/Text";
import { ProjectOnChainData, DeployedProjectStaticInfo } from "@/types/project";
import { formatNumber } from "@/utils/number";
import { SocialsList } from "../SocialsList";

type ProjectCarouselProps = {
  projects: {
    projectBasicInfo: DeployedProjectStaticInfo;
    onChainData: ProjectOnChainData;
  }[];
};

const ProjectsCarousel = ({ projects }: ProjectCarouselProps) => {
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

  const handleRowClick = (slug: string) => router.push(`/project/${slug}`);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-5 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pr-4 md:pr-6"
      >
        {projects.map(({ projectBasicInfo, onChainData }) => (
          <article
            key={projectBasicInfo.id}
            onClick={() => handleRowClick(projectBasicInfo.slug)}
            className="
              snap-start select-none cursor-pointer
              bg-[#141414] rounded-2xl ring-1 ring-slate-800/70
              transition-all duration-300
              hover:-translate-y-0.5 hover:ring-orange-400/50 hover:shadow-[0_0_24px_rgba(251,146,60,0.12)]
              p-5 flex flex-col flex-shrink-0
              min-w-[85%] max-w-[85%] 
            "
          >
            {/* image on top with media preview */}
            <div className="relative w-full h-[200px] rounded-xl overflow-hidden bg-[#1b1b1b] ring-1 ring-slate-800">
              <img
                src={projectBasicInfo.imageDesktop}
                alt={projectBasicInfo.name}
                className="w-full h-full object-cover"
              />
              
              {/* Media preview overlay */}
              {projectBasicInfo.demoVideoUrl && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Play className="h-6 w-6 text-white" fill="white" />
                  </div>
                </div>
              )}
              
              {/* Category tag */}
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#121212]/90 ring-1 ring-slate-800 text-[10px] text-slate-300 font-medium">
                {projectBasicInfo.category}
              </span>
              
              {/* symbol pill */}
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#121212]/90 ring-1 ring-slate-800 text-[10px] text-slate-300 font-mono">
                ${projectBasicInfo.symbol}
              </span>
              
              {/* Funding progress */}
              {projectBasicInfo.status === 'deployed' && (
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-green-900/80 ring-1 ring-green-700 text-[10px] text-green-300 font-medium">
                  {projectBasicInfo.marketData.fundingProgress}% Funded
                </div>
              )}
            </div>

            {/* title + description */}
            <div className="mt-4">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Text type="p" className="font-bold text-xl text-slate-100">
                  {projectBasicInfo.name}
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
              
              {/* Tags */}
              <div className="flex gap-1 flex-wrap mb-3">
                {projectBasicInfo.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-[#1b1b1b] ring-1 ring-slate-800/70 text-[10px] text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-slate-300/90 leading-relaxed line-clamp-3">
                {projectBasicInfo.description}
              </p>
            </div>

            {/* Team avatars */}
            <div className="mt-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" />
              <div className="flex -space-x-2">
                {projectBasicInfo.team.slice(0, 3).map((member) => (
                  <div
                    key={member.name}
                    className="relative w-6 h-6 rounded-full ring-2 ring-[#141414] overflow-hidden bg-slate-700"
                    title={`${member.name} - ${member.role}`}
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=374151&color=fff&size=24`;
                      }}
                    />
                  </div>
                ))}
                {projectBasicInfo.team.length > 3 && (
                  <div className="w-6 h-6 rounded-full ring-2 ring-[#141414] bg-slate-700 flex items-center justify-center">
                    <span className="text-[8px] text-slate-300 font-medium">
                      +{projectBasicInfo.team.length - 3}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-xs text-slate-400 ml-2">
                {projectBasicInfo.team.length} team member{projectBasicInfo.team.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* stat chips in one row */}
            <div className="mt-4 mb-4 flex gap-2 flex-wrap">
              {projectBasicInfo.status === 'deployed' ? (
                <>
                  <StatChip
                    label="Market Cap"
                    value={`${formatNumber(projectBasicInfo.marketData.marketCap)}`}
                  />
                  <StatChip
                    label="TVL"
                    value={`${formatNumber(projectBasicInfo.marketData.tvl)}`}
                  />
                  <StatChip
                    label="24h Vol"
                    value={`${formatNumber(projectBasicInfo.marketData.volume)}`}
                  />
                </>
              ) : (
                <>
                  <StatChip
                    label="Goal"
                    value={`$${formatNumber(projectBasicInfo.fundingGoal)}`}
                  />
                  <StatChip
                    label="Launch"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    value={projectBasicInfo.status === 'upcoming' 
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ? new Date((projectBasicInfo as any).launchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      : new Date((projectBasicInfo as any).bornDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    }
                  />
                </>
              )}
            </div>

            {/* Media links */}
            <div className="flex gap-3 mb-4">
              {projectBasicInfo.demoVideoUrl && (
                <MediaLink
                  icon={<Play className="h-3 w-3" />}
                  label="Demo"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(projectBasicInfo.demoVideoUrl, '_blank');
                  }}
                />
              )}
              {projectBasicInfo.pitchDeckUrl && (
                <MediaLink
                  icon={<FileText className="h-3 w-3" />}
                  label="Pitch"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(projectBasicInfo.pitchDeckUrl, '_blank');
                  }}
                />
              )}
              {projectBasicInfo.websiteUrl && (
                <MediaLink
                  icon={<Target className="h-3 w-3" />}
                  label="Website"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(projectBasicInfo.websiteUrl, '_blank');
                  }}
                />
              )}
            </div>

            {/* meta rows */}
            <div className="flex flex-col gap-2">
              <Row
                label="Project contract"
                value={
                  <AddressLink
                    address={onChainData.address}
                    chainId={projectBasicInfo.chainId}
                  />
                }
              />
              <Row
                label="Creator"
                value={
                  <AddressLink
                    address={onChainData.creator}
                    chainId={projectBasicInfo.chainId}
                  />
                }
              />
              <Row
                label="Socials"
                value={<SocialsList socials={projectBasicInfo.socials} />}
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

export default ProjectsCarousel;

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

function MediaLink({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center gap-1.5 px-2 py-1 rounded
        bg-[#1b1b1b] hover:bg-[#252525] ring-1 ring-slate-800/70
        text-[11px] text-slate-300 hover:text-slate-200
        transition-colors
      "
    >
      {icon}
      {label}
    </button>
  );
}