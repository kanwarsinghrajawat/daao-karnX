import { AgentOnChainData, DeployedAgentStaticInfo } from "@/types/agent";
import AgentsCarouselDesktop from "./AgentsCarouselDesktop";
import ProductShowcase from "../productShowcase";

type AgentCarouselProps = {
  agents: {
    agentBasicInfo: DeployedAgentStaticInfo;
    onChainData: AgentOnChainData;
  }[];
};

const AgentCarousel = ({ agents }: AgentCarouselProps) => {
  return (
    <div className="py-6 max-w-sm md:max-w-7xl md:mx-auto mx-auto">
      <ProductShowcase
        trending={[
          {
            id: "1",
            name: "ArAIstotle",
            subtitle: "AI Agents",
            avatar: "/image-1.png",
            tag: { label: "24d", type: "lock" },
            price: "$7.38m",
            changePct: 120.86,
          },
          {
            id: "2",
            name: "Backroom",
            avatar: "/image-3.png",
            tag: { label: "DYOR", type: "dyor" },
            price: "$6.82m",
            changePct: 25.91,
          },
          {
            id: "3",
            name: "Backroom",
            avatar: "/image-4.png",
            tag: { label: "DYOR", type: "dyor" },
            price: "$6.82m",
            changePct: 25.91,
          },
          {
            id: "4",
            name: "Backroom",
            avatar: "/image-5.png",
            tag: { label: "DYOR", type: "dyor" },
            price: "$6.82m",
            changePct: 25.91,
          },
          // ...
        ]}
        spotlight={{
          name: "Cybercentry",
          avatar: "/image-6.png",
          badge: "Genesis",
          fdv: "$382k",
          fdvChangePct: 10.28,
          category: "Autonomous Onchain Commerce",
          transactions: 10943,
          interactedWith: [],
          description:
            "$CENTRY, a Virtuals Hackathon finalist, is the world’s first AI-Powered Cyber Security agent...",
        }}
        carousel={<AgentsCarouselDesktop agents={agents} />}
      />{" "}
      {/* <AgentsCarouselDesktop agents={agents} /> */}
    </div>
  );
};

export default AgentCarousel;
