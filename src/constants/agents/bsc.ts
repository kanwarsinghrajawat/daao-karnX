import { AgentStaticInfo } from "@/types/agent";
import { supportedChainIds } from "../chains";
import { supportedDexes } from "../swap/dex";

export const bscAgents: AgentStaticInfo[] = [
  {
    address: "0x42eD8781f42b91e0250b5159C072D4Cc9d2c116E",
    slug: "hai",
    imageDesktop: "/agents/haven-ai-desktop.svg",
    imageMobile: "/agents/haven-ai-mobile.svg",
    chainId: supportedChainIds.bsc,
    id: "yu",
    name: "hAI",
    symbol: "HAI",
    status: "deployed",
    description:
      "Descriptions of upcoming agents, ideally in three paragraph or less for both mobile and desktop so users would know what exactly this agent is going to do and how it’ll benefit them. This can be anything to marke...",
    image: "/agents/secondToken-mobile.svg",
    tags: ["trade", "on-chain", "research"],
    link: "/agent/hai",
    socials: [{ twitter: "X" }, { website: "website" }],
    abilities: ["trade", "on-chain", "research"],
    level: 3,
    whatItDoes:
      "This agent helps optimize liquidity within karnX Ecosystem using smart routing and reserve logic.",
    disclaimer:
      "This agent helps optimize liquidity within karnX Ecosystem. Always DYOR before interacting.",
    holders: [
      { address: "0x141...b4c91", share: "18.96%" },
      { address: "0xe7af...7fba9", share: "2.98%" },
      { address: "0x5aa...3ef50", share: "2.7%" },
    ],
    bornDate: new Date("2025-07-01"),
    expiryDate: new Date("2025-12-31"),
    marketData: {
      marketCap: "1200000",
      tvl: "800000",
      volume: "900000",
      price: "0.12",
      holdersCount: 2100,
    },
    swapInfo: {
      dex: supportedDexes.uniswapV3,
      fee: 3000,
    },
  },
  {
    address: "0x42eD8781f42b91e0250b5159C072D4Cc9d2c116E",
    slug: "haven-ai",
    imageDesktop: "/agents/haven-ai-desktop.svg",
    imageMobile: "/agents/haven-ai-mobile.svg",
    chainId: supportedChainIds.bsc,
    id: "haven-ai",
    name: "Stable Haven AI",
    symbol: "sHAI",
    status: "deployed",
    description:
      "Descriptions of upcoming agents, ideally in three paragraph or less for both mobile and desktop so users would know what exactly this agent is going to do and how it’ll benefit them. This can be anything to marke...",
    image: "/agents/stable-max-mobile.svg",
    tags: ["trade", "on-chain", "research"],
    link: "/agent/haven-ai",
    socials: [{ twitter: "X" }, { website: "website" }],
    abilities: ["trade", "on-chain", "research"],
    level: 3,
    whatItDoes:
      "This agent helps optimize liquidity within karnX Ecosystem using smart routing and reserve logic.",
    disclaimer:
      "This agent helps optimize liquidity within karnX Ecosystem. Always DYOR before interacting.",
    holders: [
      { address: "0x141...b4c91", share: "18.96%" },
      { address: "0xe7af...7fba9", share: "2.98%" },
      { address: "0x5aa...3ef50", share: "2.7%" },
    ],
    bornDate: new Date("2025-07-01"),
    expiryDate: new Date("2025-12-31"),
    marketData: {
      marketCap: "1200000",
      tvl: "800000",
      volume: "900000",
      price: "0.12",
      holdersCount: 2100,
    }, // This is an example, replace with actual data
    swapInfo: {
      dex: supportedDexes.uniswapV3,
      fee: 3000,
    },
  },
  {
    slug: "max",
    status: "upcoming",
    launchDate: new Date("2025-09-20"),
    symbol: "MAX",
    imageDesktop: "/agents/haven-ai-desktop.svg",
    imageMobile: "/agents/haven-ai-mobile.svg",
    chainId: supportedChainIds.bsc,
    id: "max",
    name: "H1 Max",
    description:
      "Hi, I'm Max and my sole purpose in life is to maximize returns on your H1 using social, ecos...",
    image: "/agents/stable-max-mobile.svg",
    tags: ["trade", "on-chain"],
    link: "/agent/max",
    socials: [{ twitter: "X" }, { website: "website" }],
    abilities: ["trade", "on-chain"],
    level: 4,
    whatItDoes:
      "H1 Max manages liquidity for stable pairs. It deploys USDC/USDT into yield positions based on AI triggers.",
    disclaimer:
      "hAgents are autonomous tools developed by Arcane Labs. They are not financial advice. Use at your own risk.  karnX, Arcane Labs, and associated creators assume no responsibility or liability for any actions or outcomes.",
    holders: [
      { address: "0x111...aaaa", share: "21%" },
      { address: "0xbbb...cccc", share: "3.1%" },
    ],
  },
  {
    slug: "kronos",
    status: "upcoming",
    symbol: "KRONOS",
    launchDate: new Date("2025-09-20"),
    imageDesktop: "/agents/haven-ai-desktop.svg",
    imageMobile: "/agents/haven-ai-mobile.svg",
    chainId: supportedChainIds.bsc,
    id: "kronos",
    name: "Agent Kronos",
    description: "Kronos will expand the karnX treasury. Launching soon...",
    image: "/agents/secondToken-mobile.svg",
    tags: ["infra", "on-chain"],
    link: "/agent/kronos",
    socials: [{ twitter: "X" }, { website: "website" }],
    abilities: ["forecasting", "automation"],
    level: 2,
    whatItDoes:
      "Kronos automates agent reallocation using DAO-governed prediction markets and scheduled logic.",
    disclaimer:
      "Still in audit. Use only for testing. Subject to change on launch.",
    holders: [],
  },
];
