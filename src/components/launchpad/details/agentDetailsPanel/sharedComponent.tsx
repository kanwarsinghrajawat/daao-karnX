import { SocialsList } from "@/components/agents/SocialsList";
import AddressLink from "@/components/ui/AddressLink";
import Text from "@/components/ui/Text";
import {
  AgentOnChainData,
  AgentStaticInfo,
  DeployedAgentStaticInfo,
} from "@/types/agent";
import { Token } from "@/types/tokens";
import Image from "next/image";
import Link from "next/link";

/* ---------- Header ---------- */
export const Header = ({
  agentBasicInfo,
}: {
  agentBasicInfo: AgentStaticInfo;
}) => (
  <div className="flex gap-5 items-start">
    <div className="w-28 h-28 rounded-xl overflow-hidden bg-[#1f1f1f] ring-1 ring-slate-800/70">
      <img
        src={agentBasicInfo.image}
        alt="Agent"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="flex-1">
      <div className="flex gap-2 items-center">
        <Text type="p" className="text-xl md:text-2xl font-bold text-slate-100">
          {agentBasicInfo.name}
        </Text>
        <Text type="p" className="text-slate-300 font-semibold">
          ${agentBasicInfo.symbol}
        </Text>
        <Image src="/verified-icon.svg" alt="Verified" width={16} height={16} />
      </div>

      <Text
        type="p"
        className="text-sm md:text-base text-slate-300/90 mt-2 leading-relaxed line-clamp-3"
      >
        {agentBasicInfo.description}
      </Text>

      <Link
        href="#projectdetails"
        className="inline-block mt-2 text-sm font-mono underline text-slate-200 hover:text-slate-100"
      >
        Read More
      </Link>
    </div>
  </div>
);

/* ---------- Status ---------- */
export const Status = ({ label }: { label: string }) => (
  <div className="flex justify-between items-center text-sm mt-5">
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
  agentBasicInfo,
  agentOnChainData,
}: {
  agentBasicInfo: DeployedAgentStaticInfo;
  agentOnChainData: AgentOnChainData;
}) => (
  <div className="my-6 text-slate-300 flex flex-col gap-3">
    <div className="flex justify-between">
      <Text type="p" className="text-slate-300 text-sm">
        Agent contract
      </Text>
      <AddressLink
        address={agentOnChainData.address}
        chainId={agentBasicInfo.chainId}
      />
    </div>
    <div className="flex justify-between">
      <Text type="p" className="text-slate-300 text-sm">
        Creator
      </Text>
      <AddressLink
        address={agentOnChainData.creator}
        chainId={agentBasicInfo.chainId}
      />
    </div>
    <div className="flex justify-between">
      <Text type="p" className="text-slate-300 text-sm">
        Socials
      </Text>
      <SocialsList socials={agentBasicInfo.socials} />
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
    <hr className="my-8 border-slate-800/70" />
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
    <hr className="my-8 border-slate-800/70" />
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
export const Disclaimer = ({
  agentBasicInfo,
}: {
  agentBasicInfo: AgentStaticInfo;
}) => {
  if (!agentBasicInfo.disclaimer) return null;
  return (
    <div className="my-6">
      <hr className="my-8 border-slate-800/70" />
      <Text type="p" className="text-slate-200 font-semibold text-base">
        Disclaimer
      </Text>
      <Text type="p" className="text-slate-400 text-sm mt-3">
        hAgents are autonomous tools developed by
        <Link
          href="https://arcane.build/"
          target="_blank"
          className="px-2 underline font-mono text-slate-200"
        >
          Arcane Labs
        </Link>
        They are not financial advice. Use at your own risk.
        <Link
          href="https://haven1.org/"
          target="_blank"
          className="underline font-mono text-slate-200 pl-1"
        >
          Haven1
        </Link>
        ,
        <Link
          href="https://arcane.build/"
          target="_blank"
          className="px-2 underline font-mono text-slate-200"
        >
          Arcane Labs
        </Link>
        and associated creators assume no responsibility or liability for any
        actions or outcomes.
      </Text>
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
    <hr className="my-8 border-slate-800/70" />

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

    <Section title="Strategy Objectives">
      <Text type="p" className="text-slate-400 text-sm mb-3">
        {data.strategyObjectives.description}
      </Text>
      <List items={data.strategyObjectives.bullets} />
    </Section>

    <Section title="Key Constraints">
      <Text type="p" className="text-slate-400 text-sm mb-3">
        {data.keyConstraints.description}
      </Text>
      <List items={data.keyConstraints.bullets} />
    </Section>
  </div>
);
