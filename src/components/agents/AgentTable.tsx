'use client';

import { AgentOnChainData, DeployedAgentStaticInfo } from '@/types/agent';
import { truncateAddress } from '@/utils/address';
import { formatDate } from '@/utils/dateTime';
import { formatNumber } from '@/utils/number';
import { Copy } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Text from '../ui/Text';

type Props = {
  agents: {
    agentBasicInfo: DeployedAgentStaticInfo;
    onChainData: AgentOnChainData;
  }[];
};

const AgentTable = ({ agents }: Props) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 1500);
  };

  const router = useRouter();
  const handleRowClick = (slug: string) => {
    router.push(`/agent/${slug}`);
  };

  return (
    <div className="w-full overflow-x-auto max-w-7xl md:mx-auto py-4 mx-6">
      <Text type="p" className="text-base md:text-2xl font-bold mb-4">
        All Agents
      </Text>
      <div className="">
        <table className="min-w-[800px] w-full text-sm border border-divider">
          <thead>
            <tr className="text-left text-gray-500 border border-divider">
              <th className="p-3 font-normal font-mono">AI Agents</th>
              <th className="p-3 whitespace-nowrap font-normal font-mono">Born Date</th>
              <th className="p-3 whitespace-nowrap font-normal font-mono">TVL</th>
              <th className="p-3 whitespace-nowrap font-normal font-mono">24h Chg</th>
              <th className="p-3 whitespace-nowrap font-normal font-mono">24h Vol</th>
              <th className="p-3 whitespace-nowrap font-normal font-mono">Token Price</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(({ agentBasicInfo, onChainData }) => (
              <tr
                key={agentBasicInfo.id}
                className="bg-white border border-divider-b hover:bg-gray-50 transition cursor-pointer"
                onClick={() => handleRowClick(agentBasicInfo.slug)}
              >
                <td className="p-4 flex items-center gap-4 whitespace-nowrap font-mono">
                  <Image
                    src={agentBasicInfo.image}
                    alt={agentBasicInfo.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold font-mono text-gray-800 flex items-center gap-1">
                      {agentBasicInfo.name} <span className="text-xs text-gray-500">${agentBasicInfo.symbol}</span>
                      <Image src="/verified-icon.svg" alt="Verified" width={16} height={16} />
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1 border border-divider p-1 w-fit">
                      {truncateAddress(onChainData.address)}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(onChainData.address);
                        }}
                        className="text-gray-400 hover:text-black transition"
                      >
                        <Copy size={14} />
                      </button>
                      {copied === onChainData.address && <span className="text-green-500 text-xs ml-1">Copied!</span>}
                    </div>
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap font-mono">{formatDate(agentBasicInfo.bornDate)}</td>
                <td className="p-4 whitespace-nowrap font-mono">{`$${formatNumber(agentBasicInfo.marketData.tvl)}`}</td>
                <td className="p-4 text-green-500 whitespace-nowrap font-mono">{`$${formatNumber(agentBasicInfo.marketData.volume)}`}</td>
                <td className="p-4 whitespace-nowrap font-mono">
                  -{`$${formatNumber(agentBasicInfo.marketData.volume)}`}
                </td>
                <td className="p-4 whitespace-nowrap font-mono">{`$${formatNumber(agentBasicInfo.marketData.price)}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentTable;
