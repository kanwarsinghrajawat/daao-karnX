import { SocialsList } from "@/components/projects/SocialsList";
import AddressLink from "@/components/ui/AddressLink";
import Text from "@/components/ui/Text";
import {
  ProjectOnChainData,
  ProjectStaticInfo,
  DeployedProjectStaticInfo,
} from "@/types/project";
import { Token } from "@/types/tokens";
import Image from "next/image";
import Link from "next/link";

import { formatNumber } from "@/utils/number";

type MarketStats = {
  marketCap: string | number;
  tvl: string | number;
  volume: string | number;
};

export const Header = ({
  projectBasicInfo,
  previewVideo, // optional: "/videos/project-preview.webm"
  marketStats, // <-- optional
}: {
  projectBasicInfo: ProjectStaticInfo;
  previewVideo?: string;
  marketStats?: MarketStats;
}) => (
  <div className="flex gap-5 items-start">
    {/* Media: video (if provided) with image fallback */}
    <div className="relative">
      <div className="w-28 h-28 rounded-2xl overflow-hidden bg-[#0f0f0f] ring-1 ring-slate-800/70 shadow-[0_8px_24px_rgba(0,0,0,.35)]">
        {previewVideo ? (
          <>
            <video
              className="h-full w-full object-cover hidden motion-safe:block"
              autoPlay
              muted
              loop
              playsInline
              poster={projectBasicInfo.imageDesktop}
            >
              <source src={previewVideo} type="video/webm" />
              <source src={previewVideo} type="video/mp4" />
            </video>
            {/* Reduced-motion fallback image */}
            <img
              src={projectBasicInfo.imageDesktop}
              alt={projectBasicInfo.name}
              className="h-full w-full object-cover block motion-safe:hidden"
            />
          </>
        ) : (
          <img
            src={projectBasicInfo.imageDesktop}
            alt={projectBasicInfo.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* symbol pill */}
      <span className="absolute -bottom-2 left-1.5 px-2 py-0.5 rounded-md bg-[#1a1a1a] ring-1 ring-slate-800/70 text-slate-300 text-[10px] font-mono">
        ${projectBasicInfo.symbol}
      </span>
    </div>

    {/* Right side */}
    <div className="flex-1">
      {/* title row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
          {projectBasicInfo.name}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#112229] text-cyan-300 text-[11px] ring-1 ring-slate-800/70">
          <Image
            src="/verified-icon.svg"
            alt="Verified"
            width={14}
            height={14}
          />
          Verified
        </span>
      </div>

      {marketStats ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <StatChip
            label="Market Cap"
            value={`$${formatNumber(marketStats.marketCap)}`}
          />
          <StatChip label="TVL" value={`$${formatNumber(marketStats.tvl)}`} />
          <StatChip
            label="24h Vol"
            value={`$${formatNumber(marketStats.volume)}`}
          />
        </div>
      ) : null}

      <p className="mt-3 text-sm md:text-base text-slate-300/90 leading-relaxed line-clamp-3">
        {projectBasicInfo.description}
      </p>
    </div>
  </div>
);

function StatChip({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#141414] ring-1 ring-slate-800/70">
      <span className="text-[11px] text-slate-400">{label}</span>
      <span className="text-xs font-mono text-slate-100">{value}</span>
    </span>
  );
}

/* ---------- Status ---------- */
export const Status = ({ label }: { label: string }) => (
  <div className="flex justify-between items-center text-sm mt-5" id="#status">
    <Text type="span" className="text-slate-200 text-base font-bold">
      Status
    </Text>
    <div className="flex gap-2 items-center">
      <Image src="/live-dots.svg" alt="Live Dots" width={16} height={16} />
      <Text type="p" className="text-slate-300 text-base">
        {label}
      </Text>
    </div>
  </div>
);

/* ---------- Funding Card ---------- */
export const FundingCard = ({
  raised,
  goal,
  underlyingAssetDetails,
  percent,
  participants,
  timeLeft,
}: {
  raised: number;
  goal: number;
  underlyingAssetDetails: Token;
  percent: string | number;
  participants: number;
  timeLeft: string;
}) => (
  <div className="bg-[#171717] rounded-2xl ring-1 ring-slate-800/70 shadow-sm p-5 my-5 text-slate-200">
    <div className="flex justify-between items-center text-xs md:text-sm">
      <Text type="span" className="text-slate-400">
        Funding Goals
      </Text>
      <div className="flex items-center gap-3">
        <Text type="span" className="text-slate-300">
          {raised} / {goal} {underlyingAssetDetails.symbol}
        </Text>
        <span className="hidden md:inline-block text-xs bg-[#103f2a] text-emerald-300 px-2 py-1 rounded font-mono">
          {percent}% Funded
        </span>
      </div>
    </div>

    <div className="relative my-4 w-full h-2 rounded bg-[#232323]">
      <div
        className="absolute top-0 left-0 h-2 rounded bg-emerald-500"
        style={{ width: `${percent}%` }}
      />
    </div>

    <span className="md:hidden inline-block text-xs bg-[#103f2a] text-emerald-300 px-2 py-1 rounded font-mono">
      {percent}% Funded
    </span>

    <div className="grid grid-cols-2 gap-6 pt-4 text-sm">
      <div>
        <Text type="p" className="text-slate-400">
          Participants:
        </Text>
        <Text type="p" className="text-slate-100 text-2xl font-normal">
          {participants}
        </Text>
      </div>
      <div>
        <Text type="p" className="text-slate-400">
          Ending In:
        </Text>
        <Text type="p" className="text-slate-100 text-2xl font-normal">
          {timeLeft}
        </Text>
      </div>
    </div>
  </div>
);

/* ---------- Meta Section ---------- */
export const MetaSection = ({
  projectBasicInfo,
  projectOnChainData,
}: {
  projectBasicInfo: DeployedProjectStaticInfo;
  projectOnChainData: ProjectOnChainData;
}) => (
  <div className="my-6 text-slate-300 flex flex-col gap-3">
    <div className="flex justify-between">
      <Text type="p" className="text-slate-300 text-sm">
        Project contract
      </Text>
      <AddressLink
        address={projectOnChainData.address}
        chainId={projectBasicInfo.chainId}
      />
    </div>
    <div className="flex justify-between">
      <Text type="p" className="text-slate-300 text-sm">
        Creator
      </Text>
      <AddressLink
        address={projectOnChainData.creator}
        chainId={projectBasicInfo.chainId}
      />
    </div>
    <div className="flex justify-between">
      <Text type="p" className="text-slate-300 text-sm">
        Socials
      </Text>
      <SocialsList socials={projectBasicInfo.socials} />
    </div>
  </div>
);

/* ---------- Top Holders Table ---------- */
export const TopHoldersTable = ({
  holders,
}: {
  holders: { address: string; share: string }[];
}) => (
  <div>
    <h2 className="font-semibold text-slate-200 text-base mb-3">
      Top {holders.length} Holders
    </h2>

    <div className="overflow-x-auto">
      <table className="w-full text-left text-slate-200 border-separate border-spacing-y-2">
        <thead>
          <tr className="text-slate-400">
            <th className="px-3 py-2 font-mono font-normal">Holders</th>
            <th className="px-3 py-2 font-mono font-normal">Shares</th>
          </tr>
        </thead>
        <tbody>
          {holders.map((h, i) => (
            <tr
              key={i}
              className="bg-[#1b1b1b] rounded-lg ring-1 ring-slate-800/70 hover:bg-[#222] transition-colors"
            >
              <td className="px-3 py-2 font-mono text-sm rounded-l-lg">{`${i + 1}. ${h.address}`}</td>
              <td className="px-3 py-2 font-mono text-sm rounded-r-lg">
                {h.share}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ---------- How To Participate ---------- */
export const HowToParticipate = ({
  steps,
}: {
  steps: { title: string; description: string }[];
}) => (
  <div>
    <Text type="h2" className="font-semibold text-base text-slate-200">
      How to Participate
    </Text>
    {steps.map((step, idx) => (
      <div key={idx}>
        <Text type="p" className="text-sm text-slate-200 mt-4 mb-1">
          {step.title}
        </Text>
        <Text type="p" className="text-sm text-slate-400">
          {step.description}
        </Text>
      </div>
    ))}
  </div>
);

/* ---------- Disclaimer ---------- */
import { AlertTriangle } from "lucide-react";

export const Disclaimer = () => {
  return (
    <div className="mt-8">
      <div className="flex items-start gap-3 rounded-xl bg-[#1b1b1b] ring-1 ring-slate-800/70 p-4 md:p-5">
        {/* Icon */}
        <div className="shrink-0 text-orange-400 mt-0.5">
          <AlertTriangle className="h-5 w-5" />
        </div>

        {/* Content */}
        <div>
          <p className="text-slate-200 font-semibold text-base mb-2">
            Disclaimer
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            <span className="font-semibold text-slate-200">
              karnX AI&apos;s daaoKarnX
            </span>{" "}
            are autonomous tools developed by{" "}
            <Link
              href="https://karnx.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-mono text-slate-200 hover:text-orange-400"
            >
              karnX AI
            </Link>
            . These tools are provided for informational purposes only and do
            not constitute financial advice. Use them at your own risk.{" "}
            <span className="font-semibold text-slate-200">karnX AI</span> and
            all associated creators assume no responsibility or liability for
            any actions, transactions, or outcomes resulting from their use.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ---------- Stat ---------- */
export const Stat = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <Text type="p" className="text-slate-400 text-sm">
      {label}
    </Text>
    <Text type="p" className="text-slate-100 text-2xl font-normal">
      {value || "—"}
    </Text>
  </div>
);

/* ---------- Chart Placeholder ---------- */
export const Chart = () => (
  <div className="w-full h-64 bg-[#171717] rounded-xl ring-1 ring-slate-800/70 flex items-center justify-center font-mono text-sm text-slate-500">
    Chart Not Available
    <br />
    Try again later or reload your browser.
  </div>
);

/* ---------- Project Details ---------- */
export type ProjectDetailsData = {
  overview: string;
  about: { description: string; bullets: string[] };
  strategyObjectives: { description: string; bullets: string[] };
  keyConstraints: { description: string; bullets: string[] };
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <Text type="h2" className="text-slate-200 text-sm font-medium mb-2">
      {title}
    </Text>
    {children}
  </div>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-5 space-y-1">
    {items.map((item, idx) => (
      <li key={idx} className="text-sm font-mono text-slate-400">
        {item}
      </li>
    ))}
  </ul>
);

export const ProjectDetailsPanel = ({ data }: { data: ProjectDetailsData }) => (
  <div className="my-6" id="projectdetails">
    <Text type="h1" className="text-slate-200 font-bold text-base mb-4">
      Project Details
    </Text>

    <Section title="Overview">
      <Text type="p" className="text-slate-400 text-sm">
        {data.overview}
      </Text>
    </Section>

    <Section title="About">
      <Text type="p" className="text-slate-400 text-sm mb-3">
        {data.about.description}
      </Text>
      <List items={data.about.bullets} />
    </Section>
  </div>
);

// drop this near your component file
export const StatItem = ({
  label,
  value,
  highlight = false,
  hideDivider = false,
  hideDividerOnMd = true,
}: {
  label: string;
  value?: string | number;
  highlight?: boolean;
  hideDivider?: boolean;
  hideDividerOnMd?: boolean;
}) => (
  <div className="relative px-3 py-2">
    {/* vertical divider */}
    {!hideDivider && (
      <div
        className={[
          "absolute top-1/2 -translate-y-1/2 right-0 h-8 w-px bg-slate-800/70",
          hideDividerOnMd ? "hidden md:block" : "",
        ].join(" ")}
      />
    )}

    <div className="text-slate-400 text-xs md:text-sm mb-1 tracking-wide">
      {label}
    </div>
    <div
      className={[
        "text-slate-100 font-mono",
        "text-lg md:text-2xl",
        highlight ? "text-slate-100" : "text-slate-200",
      ].join(" ")}
    >
      {value ?? "—"}
    </div>
  </div>
);
