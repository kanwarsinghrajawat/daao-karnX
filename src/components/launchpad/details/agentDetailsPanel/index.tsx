import {
  AgentOnChainData,
  AgentPhase,
  DeployedAgentStaticInfo,
  UpcomingAgentStaticInfo,
} from "@/types/agent";
import { getFormattedTimeLeft } from "@/utils/dateTime";
import { formatNumber } from "@/utils/number";
import { formatUnits } from "viem";
import {
  // Chart,
  Disclaimer,
  FundingCard,
  Header,
  HowToParticipate,
  MetaSection,
  ProjectDetailsPanel,
  Stat,
  StatItem,
  Status,
  TopHoldersTable,
} from "./sharedComponent";
import { exampleProjectDetails, howToParticipateSteps } from "@/content";
import TeamSection from "./teamSection";
import ProjectNav from "./projectNav";

export const AgentDetailsPanel = ({
  agentBasicInfo,
  agentOnChainData,
}: {
  agentBasicInfo: DeployedAgentStaticInfo;
  agentOnChainData: AgentOnChainData;
}) => {
  if (agentOnChainData.currentPhase === AgentPhase.Finalized)
    return (
      <VariantTwo
        agentBasicInfo={agentBasicInfo}
        agentOnChainData={agentOnChainData}
      />
    );
  if (agentOnChainData.currentPhase === AgentPhase.Ended)
    return (
      <VariantThree
        agentBasicInfo={agentBasicInfo}
        agentOnChainData={agentOnChainData}
      />
    );
  return (
    <VariantOne
      agentBasicInfo={agentBasicInfo}
      agentOnChainData={agentOnChainData}
    />
  );
};

export const UpcomingAgentDetailsPanel = ({
  agentBasicInfo,
}: {
  agentBasicInfo: UpcomingAgentStaticInfo;
}) => {
  return (
    <div className="max-w-4xl mx-auto py-6 ">
      <Header agentBasicInfo={agentBasicInfo} previewVideo="true" />
      <Status label="Upcoming" />
      <HowToParticipate steps={howToParticipateSteps} />
      <ProjectDetailsPanel data={exampleProjectDetails} />
      {/* {agentBasicInfo.holders?.length ? (
        <TopHoldersTable holders={agentBasicInfo.holders} />
      ) : null} */}
      <Disclaimer />
    </div>
  );
};

const VariantOne = ({
  agentBasicInfo,
  agentOnChainData,
}: {
  agentBasicInfo: DeployedAgentStaticInfo;
  agentOnChainData: AgentOnChainData;
}) => {
  const maxRaise = Number(
    formatUnits(
      agentOnChainData.maxRaise,
      agentOnChainData.underlyingAssetDetails.decimals
    )
  );
  const remaining = Number(
    formatUnits(
      agentOnChainData.remainingCapacity,
      agentOnChainData.underlyingAssetDetails.decimals
    )
  );
  const raised = maxRaise - remaining;
  const percent = ((raised / maxRaise) * 100).toFixed(1);

  const formattedTimeLeft = getFormattedTimeLeft(
    agentOnChainData.fundraiseEndTime
  );

  return (
    <div className="w-full py-6 ">
      <Header agentBasicInfo={agentBasicInfo} previewVideo="true" />
      <ProjectNav />
      <TeamSection
        members={[
          {
            id: "1",
            handle: "@0xFUDbuster",
            role: "Dev",
            avatar: "/team/fud.png",
            highlight: true,
            socials: {
              twitter: "https://x.com/...",
              telegram: "https://t.me/...",
              github: "https://github.com/...",
            },
          },
          {
            id: "2",
            handle: "@0xMamoru",
            role: "CEO",
            avatar: "/team/mamoru.jpg",
            socials: {
              twitter: "https://x.com/...",
              telegram: "https://t.me/...",
            },
          },
          {
            id: "3",
            handle: "@Thecaveweb3",
            role: "Marketing & Community",
            avatar: "/team/cave.png",
            socials: { twitter: "https://x.com/..." },
          },
        ]}
      />

      <Status label="Live" />
      <FundingCard
        raised={raised}
        goal={maxRaise}
        underlyingAssetDetails={agentOnChainData.underlyingAssetDetails}
        percent={percent}
        participants={Number(agentOnChainData.contributors)}
        timeLeft={formattedTimeLeft}
      />
      <MetaSection
        agentBasicInfo={agentBasicInfo}
        agentOnChainData={agentOnChainData}
      />
      <HowToParticipate steps={howToParticipateSteps} />
      <ProjectDetailsPanel data={exampleProjectDetails} />
      <TopHoldersTable holders={agentBasicInfo.holders} />
      <Disclaimer />
    </div>
  );
};

const VariantTwo = ({
  agentBasicInfo,
  agentOnChainData,
}: {
  agentBasicInfo: DeployedAgentStaticInfo;
  agentOnChainData: AgentOnChainData;
}) => {
  const maxRaise = Number(
    formatUnits(
      agentOnChainData.maxRaise,
      agentOnChainData.underlyingAssetDetails.decimals
    )
  );
  const remaining = Number(
    formatUnits(
      agentOnChainData.remainingCapacity,
      agentOnChainData.underlyingAssetDetails.decimals
    )
  );
  const raised = maxRaise - remaining;
  const percent = ((raised / maxRaise) * 100).toFixed(1);

  const formattedTimeLeft = getFormattedTimeLeft(
    agentOnChainData.operationalEndTime
  );
  return (
    <div className="max-w-4xl mx-auto py-6 ">
      <Header agentBasicInfo={agentBasicInfo} previewVideo="true" />
      <ProjectNav />

      <TeamSection
        members={[
          {
            id: "1",
            handle: "@0xFUDbuster",
            role: "Dev",
            avatar: "/team/fud.png",
            highlight: true,
            socials: {
              twitter: "https://x.com/...",
              telegram: "https://t.me/...",
              github: "https://github.com/...",
            },
          },
          {
            id: "2",
            handle: "@0xMamoru",
            role: "CEO",
            avatar: "/team/mamoru.jpg",
            socials: {
              twitter: "https://x.com/...",
              telegram: "https://t.me/...",
            },
          },
          {
            id: "3",
            handle: "@Thecaveweb3",
            role: "Marketing & Community",
            avatar: "/team/cave.png",
            socials: { twitter: "https://x.com/..." },
          },
        ]}
      />

      <Status label="Campaign Ended" />
      <FundingCard
        raised={raised}
        goal={maxRaise}
        underlyingAssetDetails={agentOnChainData.underlyingAssetDetails}
        percent={percent}
        participants={Number(agentOnChainData.contributors)}
        timeLeft={formattedTimeLeft}
      />
      <MetaSection
        agentBasicInfo={agentBasicInfo}
        agentOnChainData={agentOnChainData}
      />
      <HowToParticipate steps={howToParticipateSteps} />
      <ProjectDetailsPanel data={exampleProjectDetails} />
      <TopHoldersTable holders={agentBasicInfo.holders} />
      <Disclaimer />
    </div>
  );
};

const VariantThree = ({
  agentBasicInfo,
  agentOnChainData,
}: {
  agentBasicInfo: DeployedAgentStaticInfo;
  agentOnChainData: AgentOnChainData;
}) => {
  const maxRaise = Number(
    formatUnits(
      agentOnChainData.maxRaise,
      agentOnChainData.underlyingAssetDetails.decimals
    )
  );
  const remaining = Number(
    formatUnits(
      agentOnChainData.remainingCapacity,
      agentOnChainData.underlyingAssetDetails.decimals
    )
  );
  const raised = maxRaise - remaining;
  const percent = ((raised / maxRaise) * 100).toFixed(1);

  const formattedTimeLeft = getFormattedTimeLeft(
    agentOnChainData.operationalEndTime
  );

  return (
    <div className="max-w-5xl mx-auto md:py-8 ">
      <Header
        agentBasicInfo={agentBasicInfo}
        previewVideo="true"
        marketStats={{
          marketCap: agentBasicInfo.marketData.marketCap,
          tvl: agentBasicInfo.marketData.tvl,
          volume: agentBasicInfo.marketData.volume,
        }}
      />
      <ProjectNav />

      <TeamSection
        members={[
          {
            id: "1",
            handle: "@0xFUDbuster",
            role: "Dev",
            avatar: "/team/fud.png",
            highlight: true,
            socials: {
              twitter: "https://x.com/...",
              telegram: "https://t.me/...",
              github: "https://github.com/...",
            },
          },
          {
            id: "2",
            handle: "@0xMamoru",
            role: "CEO",
            avatar: "/team/mamoru.jpg",
            socials: {
              twitter: "https://x.com/...",
              telegram: "https://t.me/...",
            },
          },
          {
            id: "3",
            handle: "@Thecaveweb3",
            role: "Marketing & Community",
            avatar: "/team/cave.png",
            socials: { twitter: "https://x.com/..." },
          },
        ]}
      />

      <Status label="live" />
      <FundingCard
        raised={raised}
        goal={maxRaise}
        underlyingAssetDetails={agentOnChainData.underlyingAssetDetails}
        percent={percent}
        participants={Number(agentOnChainData.contributors)}
        timeLeft={formattedTimeLeft}
      />
      {/* <Chart /> */}
      <MetaSection
        agentBasicInfo={agentBasicInfo}
        agentOnChainData={agentOnChainData}
      />
      <HowToParticipate steps={howToParticipateSteps} />
      <ProjectDetailsPanel data={exampleProjectDetails} />
      {/* {agentBasicInfo.holders?.length ? (
        <TopHoldersTable holders={agentBasicInfo.holders} />
      ) : null} */}
      <Disclaimer />
    </div>
  );
};
