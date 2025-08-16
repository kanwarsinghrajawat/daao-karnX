import { ProjectDetailsData } from "@/components/launchpad/details/projectDetailsPanel/sharedComponent";

export const exampleProjectDetails: ProjectDetailsData = {
  overview:
    "Hi, I'm Max and I'm LONG H1. My sole purpose in life is to maximize returns on your H1 using social, ecosystem and capital-flow alpha, 24/7 for you on Haven1.",

  about: {
    description:
      "Max will leverage social signals as well as yield signals to maximize the returns on H1 in the Haven1 ecosystem.",
    bullets: [
      "Accepts funding with H1, wH1, hUSDC, hETH, hcbBTC",
      "Minimum funding threshold of 10,000 USD equivalent",
      "Mints a unique ERC-20 token, hMAX, for each user deposit",
      "Token is only tradable during the project lifespan",
      "hMAX is redeemable for H1 at lifespan expiry via mint/burn mechanism",
      "This is a LONG H1 project, meaning, you will receive H1 on redemption even if you deposit a different asset.",
    ],
  },

  strategyObjectives: {
    description: "Maximize yield on H1 through:",
    bullets: [
      "hEarn Single-Sided ALM",
      "Flexible staking",
      "Opportunistic asset allocation (e.g. ETH, BTC, H1) using AI-driven social signals and reward optimization",
      "hSwap arbitrage between assets such as USDC ⇔ ETH and USDC ⇔ BTC",
      "Yield rewards can be sold into USDC and/or used for further staking and liquidity provisioning",
    ],
  },

  keyConstraints: {
    description: "Maximize yield on H1 through:",
    bullets: [
      "No bridging of user funds by the AI Project",
      "No strategy upgrades during the project's lifecycle",
      "Creator must be KYB'ed",
    ],
  },
};

export const howToParticipateSteps = [
  {
    title: "Connect: Connect Wallet",
    description:
      "Connect your wallet and make sure you are on the Haven1 network.",
  },
  {
    title: "Pledge: Fund the Project",
    description:
      "Select the amount of the asset you want to fund the Project with.",
  },
  {
    title: "Share: Spread the Word",
    description:
      "Projects must meet the minimum funding thresholds to initiate. Share to your network to get it funded.",
  },
  {
    title: "Redeem: Collect your Funds",
    description:
      "At the end of the project lifespan, you can redeem the Project token for your initial deposit asset.",
  },
];

export const upcomingPlaceholder = {
  image: "/soon.svg",
  title: "More Projects Coming Soon",
  description:
    "We're working closely with other creators to bring in more projects, in the meantime check out Hi Max's Genesis Launch.",
  buttonText: "Genesis Launch",
  buttonLink: "/genesis-launch",
};

export const endedPlaceholder = {
  image: "/ended.svg",
  title: "Ended Campaign",
  description:
    "Once campaign ended, they will start showing up here and you'll be able to claim or refund depending on the success of the campaign.",
};
