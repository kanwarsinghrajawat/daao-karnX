import {
  ProjectOnChainData,
  ProjectPhase,
  DeployedProjectStaticInfo,
  UpcomingProjectStaticInfo,
} from "@/types/project";
import { getFormattedTimeLeft } from "@/utils/dateTime";
import { formatUnits } from "viem";
import {
  // Chart,
  Disclaimer,
  FundingCard,
  Header,
  // HowToParticipate,
  MetaSection,
  Status,
  TopHoldersTable,
} from "./sharedComponent";
import TeamSection from "./teamSection";
import ProjectNav from "./projectNav";
import { Target, Lightbulb, TrendingUp, Calendar, DollarSign } from "lucide-react";
import PitchSection from "./pitchSection";

export const ProjectDetailsPanel = ({
  projectBasicInfo,
  projectOnChainData,
}: {
  projectBasicInfo: DeployedProjectStaticInfo;
  projectOnChainData: ProjectOnChainData;
}) => {
  if (projectOnChainData.currentPhase === ProjectPhase.Finalized)
    return (
      <VariantTwo
        projectBasicInfo={projectBasicInfo}
        projectOnChainData={projectOnChainData}
      />
    );
  if (projectOnChainData.currentPhase === ProjectPhase.Ended)
    return (
      <VariantThree
        projectBasicInfo={projectBasicInfo}
        projectOnChainData={projectOnChainData}
      />
    );
  return (
    <VariantOne
      projectBasicInfo={projectBasicInfo}
      projectOnChainData={projectOnChainData}
    />
  );
};

export const UpcomingProjectDetailsPanel = ({
  projectBasicInfo,
}: {
  projectBasicInfo: UpcomingProjectStaticInfo;
}) => {
  return (
    <div className="max-w-4xl mx-auto py-6 ">
      <Header projectBasicInfo={projectBasicInfo} previewVideo="true" />
      <Status label="Upcoming" />
      {/* <HowToParticipate steps={howToParticipateSteps} /> */}
      <EnhancedProjectDetailsPanel projectBasicInfo={projectBasicInfo} />
      {projectBasicInfo.holders?.length ? (
        <TopHoldersTable holders={projectBasicInfo.holders} />
      ) : null}
      <Disclaimer />
    </div>
  );
};

const VariantOne = ({
  projectBasicInfo,
  projectOnChainData,
}: {
  projectBasicInfo: DeployedProjectStaticInfo;
  projectOnChainData: ProjectOnChainData;
}) => {
  const maxRaise = Number(
    formatUnits(
      projectOnChainData.maxRaise,
      projectOnChainData.underlyingAssetDetails.decimals
    )
  );
  const remaining = Number(
    formatUnits(
      projectOnChainData.remainingCapacity,
      projectOnChainData.underlyingAssetDetails.decimals
    )
  );
  const raised = maxRaise - remaining;
  const percent = ((raised / maxRaise) * 100).toFixed(1);

  const formattedTimeLeft = getFormattedTimeLeft(
    projectOnChainData.fundraiseEndTime
  );

  return (
    <div className="w-full py-6 ">
      <Header projectBasicInfo={projectBasicInfo} previewVideo="true" />
      <ProjectNav />
      <TeamSection
        members={projectBasicInfo.team.map((member, index) => ({
          id: index.toString(),
          handle: member.name,
          role: member.role,
          avatar: member.avatar,
          highlight: index === 0,
          socials: {
            ...(member.linkedIn && { linkedin: member.linkedIn }),
            ...(member.twitter && { twitter: member.twitter }),
          },
        }))}
      />

      <Status label="Live" />
      <FundingCard
        raised={raised}
        goal={maxRaise}
        underlyingAssetDetails={projectOnChainData.underlyingAssetDetails}
        percent={percent}
        participants={Number(projectOnChainData.contributors)}
        timeLeft={formattedTimeLeft}
      />
      <MetaSection
        projectBasicInfo={projectBasicInfo}
        projectOnChainData={projectOnChainData}
      />
      {/* <HowToParticipate steps={howToParticipateSteps} /> */}
      <EnhancedProjectDetailsPanel projectBasicInfo={projectBasicInfo} />
      <TopHoldersTable holders={projectBasicInfo.holders} />
      <Disclaimer />
    </div>
  );
};

const VariantTwo = ({
  projectBasicInfo,
  projectOnChainData,
}: {
  projectBasicInfo: DeployedProjectStaticInfo;
  projectOnChainData: ProjectOnChainData;
}) => {
  const maxRaise = Number(
    formatUnits(
      projectOnChainData.maxRaise,
      projectOnChainData.underlyingAssetDetails.decimals
    )
  );
  const remaining = Number(
    formatUnits(
      projectOnChainData.remainingCapacity,
      projectOnChainData.underlyingAssetDetails.decimals
    )
  );
  const raised = maxRaise - remaining;
  const percent = ((raised / maxRaise) * 100).toFixed(1);

  const formattedTimeLeft = getFormattedTimeLeft(
    projectOnChainData.operationalEndTime
  );
  return (
    <div className="max-w-4xl mx-auto py-6 ">
      <Header projectBasicInfo={projectBasicInfo} previewVideo="true" />
      <ProjectNav />

      <TeamSection
        members={projectBasicInfo.team.map((member, index) => ({
          id: index.toString(),
          handle: member.name,
          role: member.role,
          avatar: member.avatar,
          highlight: index === 0,
          socials: {
            ...(member.linkedIn && { linkedin: member.linkedIn }),
            ...(member.twitter && { twitter: member.twitter }),
          },
        }))}
      />

      <Status label="Campaign Ended" />
      <FundingCard
        raised={raised}
        goal={maxRaise}
        underlyingAssetDetails={projectOnChainData.underlyingAssetDetails}
        percent={percent}
        participants={Number(projectOnChainData.contributors)}
        timeLeft={formattedTimeLeft}
      />
      <MetaSection
        projectBasicInfo={projectBasicInfo}
        projectOnChainData={projectOnChainData}
      />
      {/* <HowToParticipate steps={howToParticipateSteps} /> */}
      <EnhancedProjectDetailsPanel projectBasicInfo={projectBasicInfo} />
      <TopHoldersTable holders={projectBasicInfo.holders} />
      <Disclaimer />
    </div>
  );
};

const VariantThree = ({
  projectBasicInfo,
  projectOnChainData,
}: {
  projectBasicInfo: DeployedProjectStaticInfo;
  projectOnChainData: ProjectOnChainData;
}) => {
  const maxRaise = Number(
    formatUnits(
      projectOnChainData.maxRaise,
      projectOnChainData.underlyingAssetDetails.decimals
    )
  );
  const remaining = Number(
    formatUnits(
      projectOnChainData.remainingCapacity,
      projectOnChainData.underlyingAssetDetails.decimals
    )
  );
  const raised = maxRaise - remaining;
  const percent = ((raised / maxRaise) * 100).toFixed(1);

  const formattedTimeLeft = getFormattedTimeLeft(
    projectOnChainData.operationalEndTime
  );

  return (
    <div className="max-w-5xl mx-auto md:py-8 ">
      <Header
        projectBasicInfo={projectBasicInfo}
        previewVideo="true"
        marketStats={{
          marketCap: projectBasicInfo.marketData.marketCap,
          tvl: projectBasicInfo.marketData.tvl,
          volume: projectBasicInfo.marketData.volume,
        }}
      />
      <ProjectNav />

      <TeamSection
        members={projectBasicInfo.team.map((member, index) => ({
          id: index.toString(),
          handle: member.name,
          role: member.role,
          avatar: member.avatar,
          highlight: index === 0,
          socials: {
            ...(member.linkedIn && { linkedin: member.linkedIn }),
            ...(member.twitter && { twitter: member.twitter }),
          },
        }))}
      />

      <Status label="live" />
      <FundingCard
        raised={raised}
        goal={maxRaise}
        underlyingAssetDetails={projectOnChainData.underlyingAssetDetails}
        percent={percent}
        participants={Number(projectOnChainData.contributors)}
        timeLeft={formattedTimeLeft}
      />
      {/* <Chart /> */}
      <MetaSection
        projectBasicInfo={projectBasicInfo}
        projectOnChainData={projectOnChainData}
      />
      {/* <HowToParticipate steps={howToParticipateSteps} /> */}
      <EnhancedProjectDetailsPanel projectBasicInfo={projectBasicInfo} />
      {projectBasicInfo.holders?.length ? (
        <TopHoldersTable holders={projectBasicInfo.holders} />
      ) : null}
      <Disclaimer />
    </div>
  );
};

// Enhanced Project Details Panel with comprehensive project information
const EnhancedProjectDetailsPanel = ({
  projectBasicInfo,
}: {
  projectBasicInfo: DeployedProjectStaticInfo | UpcomingProjectStaticInfo;
}) => {
  return (
    <div className="space-y-8">
      {/* Pitch Materials Section */}
      <PitchSection projectBasicInfo={projectBasicInfo} />
      
      {/* Problem Statement & Solution */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 ring-1 ring-slate-800/70">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-semibold text-slate-100">Problem Statement</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {projectBasicInfo.problemStatement}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-slate-100">Our Solution</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {projectBasicInfo.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Overview */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 ring-1 ring-slate-800/70">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Project Overview</h3>
        <p className="text-slate-300 leading-relaxed">
          {projectBasicInfo.detailedOverview}
        </p>
      </div>

      {/* Target Market */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 ring-1 ring-slate-800/70">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-green-400" />
          <h3 className="text-lg font-semibold text-slate-100">Target Market</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">
          {projectBasicInfo.targetMarket}
        </p>
      </div>

      {/* Use of Funds */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 ring-1 ring-slate-800/70">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="h-5 w-5 text-green-400" />
          <h3 className="text-lg font-semibold text-slate-100">Use of Funds</h3>
        </div>
        <div className="grid gap-4">
          {projectBasicInfo.useOfFunds.map((fund, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-[#141414] rounded-lg ring-1 ring-slate-800/50">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-200">{fund.category}</span>
                  <span className="text-sm font-mono text-slate-300">{fund.percentage}%</span>
                </div>
                <p className="text-sm text-slate-400">{fund.description}</p>
              </div>
              <div className="ml-4 w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  style={{ width: `${fund.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 ring-1 ring-slate-800/70">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-slate-100">Project Milestones</h3>
        </div>
        <div className="space-y-4">
          {projectBasicInfo.milestones.map((milestone, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-[#141414] rounded-lg ring-1 ring-slate-800/50">
              <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                milestone.completed ? 'bg-green-500' : 'bg-slate-600'
              }`} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-200">{milestone.title}</h4>
                  <span className="text-sm text-slate-400">
                    {new Date(milestone.targetDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{milestone.description}</p>
                {milestone.completed && (
                  <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full bg-green-900/30 text-green-400 text-xs">
                    ✓ Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};