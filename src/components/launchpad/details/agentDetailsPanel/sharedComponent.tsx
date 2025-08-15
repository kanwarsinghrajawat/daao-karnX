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

export const Header = ({
  agentBasicInfo,
}: {
  agentBasicInfo: AgentStaticInfo;
}) => (
  <div className="flex gap-4 items-start">
    <img src={agentBasicInfo.image} alt="Agent" className="w-40 h-24" />
    <div>
      <div className="flex gap-2 items-center">
        <Text
          type="p"
          className="text-base md:text-2xl font-bold text-text-primary"
        >
          {agentBasicInfo.name}
        </Text>
        <Text type="p" className="text-text-secondary font-medium">
          ${agentBasicInfo.symbol}
        </Text>
        <Image src="/verified-icon.svg" alt="Verified" width={16} height={16} />
      </div>
      <Text
        type="p"
        className="text-xs md:text-sm font-normal text-text-primary mt-1 line-clamp-3"
      >
        {agentBasicInfo.description}
      </Text>
      <Link
        href="#projectdetails"
        className="text-sm font-mono underline text-text-primary font-normal"
      >
        Read More
      </Link>
    </div>
  </div>
);

export const Status = ({ label }: { label: string }) => (
  <div className={`flex justify-between text-sm font-medium mt-4`}>
    <Text type="span" className="text-text-primary text-base font-bold">
      Status
    </Text>
    <div className="flex gap-2 items-center">
      <Image src="/live-dots.svg" alt="Live Dots" width={16} height={16} />
      <Text type="p" className="text-text-secondary font-medium text-base">
        {label}
      </Text>
    </div>
  </div>
);

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
  <div className="bg-white border-2 border-border-divider shadow-custom-soft p-4 my-4">
    <div className="flex justify-between text-xs md:text-sm text-gray-600 font-medium">
      <Text type="span" className="text-text-secondary text-sm font-normal">
        Funding Goals
      </Text>
      <div>
        <Text
          type="span"
          className="text-text-secondary text-xs md:text-sm font-medium mr-3"
        >
          {raised} / {goal} {underlyingAssetDetails.symbol}
        </Text>
        <span className="text-xs hidden md:block my-4 bg-background-green text-positive px-2 py-1 font-mono">
          {percent}% Funded
        </span>
      </div>
    </div>
    <div className="relative my-3 md:my-4 w-full h-1 bg-gray-200 ">
      <div
        className="absolute top-0 left-0 h-1 bg-[#02AF3E] "
        style={{ width: `${percent}%` }}
      />
    </div>
    <span className="text-xs md:hidden my-4 bg-background-green text-positive px-2 py-1 font-mono">
      {percent}% Funded
    </span>
    <div className="pt-2 text-gray-800 text-sm">
      <div>
        <Text
          type="p"
          className="text-text-secondary text-xs md:text-sm font-normal"
        >
          Participants:
        </Text>
        <Text
          type="p"
          className="text-text-primary font-normal text-sm md:text-2xl"
        >
          {participants}
        </Text>
      </div>
      <div className="mt-6">
        <Text
          type="p"
          className="text-text-secondary text-xs md:text-sm font-normal"
        >
          Ending In:
        </Text>
        <Text
          type="p"
          className="text-text-primary font-normal text-sm md:text-2xl"
        >
          {timeLeft}
        </Text>
      </div>
    </div>
  </div>
);

export const MetaSection = ({
  agentBasicInfo,
  agentOnChainData,
}: {
  agentBasicInfo: DeployedAgentStaticInfo;
  agentOnChainData: AgentOnChainData;
}) => (
  <div className="my-6 text-gray-500 flex flex-col gap-3">
    <div className="flex justify-between">
      <Text
        type="p"
        className="text-text-primary text-xs md:text-sm font-normal"
      >
        Agent contract
      </Text>
      <AddressLink
        address={agentOnChainData.address}
        chainId={agentBasicInfo.chainId}
      />
    </div>
    <div className="flex justify-between">
      <Text
        type="p"
        className="text-text-primary text-xs md:text-sm font-normal"
      >
        Creator
      </Text>
      <AddressLink
        address={agentOnChainData.creator}
        chainId={agentBasicInfo.chainId}
      />
    </div>
    <div className="flex justify-between">
      <Text
        type="p"
        className="text-text-primary text-xs md:text-sm font-normal"
      >
        Socials:
      </Text>
      <SocialsList socials={agentBasicInfo.socials} />
    </div>
  </div>
);

export const TopHoldersTable = ({
  holders,
}: {
  holders: { address: string; share: string }[];
}) => (
  <div>
    <hr className="my-8 border-divider"></hr>

    <h2 className="font-bold text-sm md:text-base mb-2">
      Top {holders.length} Holders
    </h2>
    <div className="overflow-x-auto border border-divider">
      <table className="w-full text-xs text-left">
        <thead className="">
          <tr className="border-b border-divider">
            <th className="p-2 text-text-secondary text-sm font-mono font-normal">
              Holders
            </th>
            <th className="p-2 text-text-secondary text-sm font-mono font-normal">
              Shares
            </th>
          </tr>
        </thead>
        <tbody>
          {holders.map((h, i) => (
            <tr key={i} className="">
              <td className="p-2 text-text-primary text-xs md:text-sm font-mono font-normal">{`${i + 1}. ${h.address}`}</td>
              <td className="p-2 text-text-primary text-xs md:text-sm font-mono font-normal">
                {h.share}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const HowToParticipate = ({
  steps,
}: {
  steps: { title: string; description: string }[];
}) => (
  <div className="">
    <hr className="my-6 border-divider"></hr>
    <Text
      type="h2"
      className="font-bold text-sm md:text-base text-text-primary"
    >
      How to Participate
    </Text>
    {steps.map((step, idx) => (
      <div key={idx}>
        <Text
          type="p"
          className="text-xs md:text-sm font-normal text-text-primary mt-4 mb-2"
        >
          {step.title}
        </Text>
        <Text
          type="p"
          className="text-xs md:text-sm text-text-secondary font-normal"
        >
          {step.description}
        </Text>
      </div>
    ))}
  </div>
);

export const Disclaimer = ({
  agentBasicInfo,
}: {
  agentBasicInfo: AgentStaticInfo;
}) => {
  if (!agentBasicInfo.disclaimer) return null;
  return (
    <div className=" my-4">
      <hr className="my-8 border-divider"></hr>

      <Text
        type="p"
        className="text-text-primary font-bold text-sm md:text-base"
      >
        Disclaimer
      </Text>
      <Text type="p" className="text-text-secondary font-normal text-xs mt-4">
        karnX Projects are autonomous tools developed by They are not financial
        advice. Use at your own risk.
        <Link
          href="https://karnx.ai/"
          target="_blank"
          className="underline font-mono text-text-primary pl-1"
        >
          karnX AI
        </Link>
        and associated creators assume no responsibility or liability for any
        actions or outcomes.
      </Text>
    </div>
  );
};

export const Stat = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <Text
      type="p"
      className="text-text-secondary text-xs md:text-sm font-normal"
    >
      {label}
    </Text>
    <Text
      type="p"
      className="text-text-primary font-normal text-base md:text-2xl"
    >
      {value || "—"}
    </Text>
  </div>
);

export const Chart = () => (
  <div className="w-full h-64 border rounded-md flex items-center justify-center font-mono text-sm text-gray-500">
    Chart Not Available
    <br />
    Try again later or reload your browser.
  </div>
);

export type ProjectDetailsData = {
  overview: string;
  about: {
    description: string;
    bullets: string[];
  };
  strategyObjectives: {
    description: string;
    bullets: string[];
  };
  keyConstraints: {
    description: string;
    bullets: string[];
  };
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <Text
      type="h2"
      className="font-medium text-xs md:text-sm text-text-primary mb-2"
    >
      {title}
    </Text>
    {children}
  </div>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-5 space-y-1">
    {items.map((item, idx) => (
      <li
        key={idx}
        className="text-xs font-mono md:text-sm text-text-secondary font-normal"
      >
        {item}
      </li>
    ))}
  </ul>
);

export const ProjectDetailsPanel = ({ data }: { data: ProjectDetailsData }) => (
  <div className="my-4" id="projectdetails">
    <hr className="my-8 border-divider"></hr>

    <Text
      type="h1"
      className="font-bold text-sm md:text-base text-text-primary mb-4"
    >
      Project Details
    </Text>

    <Section title="Overview">
      <Text
        type="p"
        className="text-xs md:text-sm text-text-secondary font-normal"
      >
        {data.overview}
      </Text>
    </Section>

    <Section title="About">
      <Text
        type="p"
        className="text-xs md:text-sm text-text-secondary font-normal mb-3"
      >
        {data.about.description}
      </Text>
      <List items={data.about.bullets} />
    </Section>

    <Section title="Strategy Objectives">
      <Text
        type="p"
        className="text-xs md:text-sm text-text-secondary font-normal mb-3"
      >
        {data.strategyObjectives.description}
      </Text>
      <List items={data.strategyObjectives.bullets} />
    </Section>

    <Section title="Key Constraints">
      <Text
        type="p"
        className="text-xs md:text-sm text-text-secondary font-normal mb-3"
      >
        {data.keyConstraints.description}
      </Text>
      <List items={data.keyConstraints.bullets} />
    </Section>
  </div>
);
