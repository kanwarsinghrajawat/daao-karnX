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
  Chart,
  Disclaimer,
  FundingCard,
  Header,
  HowToParticipate,
  MetaSection,
  ProjectDetailsPanel,
  Stat,
  Status,
  TopHoldersTable,
} from "./sharedComponent";
import { exampleProjectDetails, howToParticipateSteps } from "@/content";

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
      <Header agentBasicInfo={agentBasicInfo} />
      <Status label="Upcoming" />
      <HowToParticipate steps={howToParticipateSteps} />
      <ProjectDetailsPanel data={exampleProjectDetails} />
      {agentBasicInfo.holders?.length ? (
        <TopHoldersTable holders={agentBasicInfo.holders} />
      ) : null}
      <Disclaimer agentBasicInfo={agentBasicInfo} />
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
      <Header agentBasicInfo={agentBasicInfo} />
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
      <Disclaimer agentBasicInfo={agentBasicInfo} />
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
      <Header agentBasicInfo={agentBasicInfo} />
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
      <Disclaimer agentBasicInfo={agentBasicInfo} />
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
      <Header agentBasicInfo={agentBasicInfo} />
      <div className="grid grid-cols-4 gap-2 md:gap-4 text-center text-sm font-medium my-8">
        <Stat
          label="Market Cap"
          value={`$${formatNumber(agentBasicInfo.marketData.marketCap)}`}
        />
        <Stat
          label="TVL"
          value={`$${formatNumber(agentBasicInfo.marketData.tvl)}`}
        />
        <Stat
          label="Volume"
          value={`$${formatNumber(agentBasicInfo.marketData.volume)}`}
        />
        <Stat
          label="Holders"
          value={formatNumber(agentBasicInfo.holders.length)}
        />
      </div>
      <Status label="live" />
      <FundingCard
        raised={raised}
        goal={maxRaise}
        underlyingAssetDetails={agentOnChainData.underlyingAssetDetails}
        percent={percent}
        participants={Number(agentOnChainData.contributors)}
        timeLeft={formattedTimeLeft}
      />
      <Chart />
      <MetaSection
        agentBasicInfo={agentBasicInfo}
        agentOnChainData={agentOnChainData}
      />
      <HowToParticipate steps={howToParticipateSteps} />
      <ProjectDetailsPanel data={exampleProjectDetails} />
      {agentBasicInfo.holders?.length ? (
        <TopHoldersTable holders={agentBasicInfo.holders} />
      ) : null}
      <Disclaimer agentBasicInfo={agentBasicInfo} />
    </div>
  );
};
