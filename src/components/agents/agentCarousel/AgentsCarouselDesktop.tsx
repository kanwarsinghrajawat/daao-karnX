'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import AddressLink from '@/components/ui/AddressLink';
import Text from '@/components/ui/Text';
import { AgentOnChainData, DeployedAgentStaticInfo } from '@/types/agent';
import { formatDate } from '@/utils/dateTime';
import { formatNumber } from '@/utils/number';

import { SocialsList } from '../SocialsList';

type AgentCarouselDesktopProps = {
  agents: {
    agentBasicInfo: DeployedAgentStaticInfo;
    onChainData: AgentOnChainData;
  }[];
};
const AgentsCarouselDesktop = ({ agents }: AgentCarouselDesktopProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScroll({
      left: el.scrollLeft > 0,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollTo({
      left: direction === 'left' ? el.scrollLeft - scrollAmount : el.scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => updateScrollButtons();
    el.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const router = useRouter();

  const handleRowClick = (slug: string) => {
    router.push(`/agent/${slug}`);
  };

  return (
    <div className="relative">
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-4 pr-4">
        {agents.map(({ agentBasicInfo, onChainData }) => (
          <div
            className="bg-white border border-divider p-3 md:p-6 flex flex-col cursor-pointer flex-shrink-0 min-w-[90%] max-w-[90%] md:min-w-[75%] md:max-w-[75%]"
            onClick={() => handleRowClick(agentBasicInfo.slug)}
            key={agentBasicInfo.id}
          >
            <div className="flex flex-row gap-6 items-start">
              <div className="w-[120px] aspect-square flex items-center justify-center bg-gray-50 overflow-hidden">
                <img src={agentBasicInfo.image} alt={agentBasicInfo.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Text type="p" className="font-bold text-sm md:text-2xl text-text-primary">
                    {agentBasicInfo.name}
                  </Text>
                  <Text type="p" className="font-bold text-sm md:text-2xl text-text-secondary">
                    ${agentBasicInfo.symbol}
                  </Text>
                  <Image src="/verified-icon.svg" alt="Verified" width={16} height={16} />
                </div>

                <Text type="p" className="text-xs md:text-sm font-normal text-text-primary mt-1 line-clamp-3">
                  {agentBasicInfo.description}
                </Text>

                <hr className="my-3 border-divider" />

                <div className="hidden md:block font-mono text-sm text-gray-800">
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-4 text-center border-b pb-4">
                    <div>
                      <Text type="p" className="text-xs font-normal text-text-secondary mb-1">
                        Market Cap
                      </Text>
                      <Text type="p" className="text-2xl text-text-primary font-normal">
                        ${formatNumber(agentBasicInfo.marketData.marketCap)}
                      </Text>
                    </div>
                    <div>
                      <Text type="p" className="text-xs font-normal text-text-secondary mb-1">
                        TVL
                      </Text>
                      <Text type="p" className="text-2xl text-text-primary font-normal">
                        ${formatNumber(agentBasicInfo.marketData.tvl)}
                      </Text>
                    </div>
                    <div>
                      <Text type="p" className="text-xs font-normal text-text-secondary mb-1">
                        Volume
                      </Text>
                      <Text type="p" className="text-2xl text-text-primary font-normal">
                        ${formatNumber(agentBasicInfo.marketData.volume)}
                      </Text>
                    </div>
                  </div>

                  {/* Metadata Section */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 w-full mt-4">
                    <Text type="p" className="text-xs text-text-primary font-normal">
                      Born Date
                    </Text>
                    <Text type="p" className="text-right text-xs text-text-secondary font-normal">
                      {formatDate(agentBasicInfo.bornDate)}
                    </Text>

                    <Text type="p" className="text-xs text-text-primary font-normal">
                      Expiry Date
                    </Text>
                    <Text type="p" className="text-right text-xs text-text-secondary font-normal">
                      {formatDate(agentBasicInfo.expiryDate)}
                    </Text>
                  </div>
                  <div className="flex flex-col w-full mt-2 gap-1">
                    <div className="flex items-center justify-between w-full">
                      <Text type="p" className="text-xs text-text-primary font-normal">
                        Agent contract
                      </Text>
                      <AddressLink address={onChainData.address} chainId={agentBasicInfo.chainId} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Text type="p" className="text-xs text-text-primary font-normal">
                        Creator
                      </Text>
                      <AddressLink address={onChainData.creator} chainId={agentBasicInfo.chainId} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Text type="p" className="text-xs text-text-primary font-normal">
                        Socials
                      </Text>
                      <SocialsList socials={agentBasicInfo.socials} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block md:hidden font-mono text-sm text-gray-800">
              {/* Top Stats Row */}
              <div className="grid grid-cols-3 my-4 text-center border-b pb-4">
                <div>
                  <Text type="p" className="text-xs font-normal text-text-secondary mb-1">
                    Market Cap
                  </Text>
                  <Text type="p" className="text-base text-text-primary font-normal">
                    ${formatNumber(agentBasicInfo.marketData.marketCap)}
                  </Text>
                </div>
                <div>
                  <Text type="p" className="text-xs font-normal text-text-secondary mb-1">
                    TVL
                  </Text>
                  <Text type="p" className="text-base text-text-primary font-normal">
                    ${formatNumber(agentBasicInfo.marketData.tvl)}
                  </Text>
                </div>
                <div>
                  <Text type="p" className="text-xs font-normal text-text-secondary mb-1">
                    Volume
                  </Text>
                  <Text type="p" className="text-base text-text-primary font-normal">
                    ${formatNumber(agentBasicInfo.marketData.volume)}
                  </Text>
                </div>
              </div>

              {/* Metadata Section */}

              <div className="flex flex-col w-full mt-2 gap-1">
                <div className="flex items-center justify-between w-full">
                  <Text type="p" className="text-xs text-text-primary font-normal">
                    Agent contract
                  </Text>
                  <AddressLink address={onChainData.address} chainId={agentBasicInfo.chainId} />
                </div>

                <div className="flex items-center justify-between">
                  <Text type="p" className="text-xs text-text-primary font-normal">
                    Creator
                  </Text>
                  <AddressLink address={onChainData.creator} chainId={agentBasicInfo.chainId} />
                </div>

                <div className="flex items-center justify-between">
                  <Text type="p" className="text-xs text-text-primary font-normal">
                    Socials
                  </Text>
                  <SocialsList socials={agentBasicInfo.socials} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {canScroll.left && (
        <button
          onClick={() => scroll('left')}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2  shadow"
        >
          <ChevronLeft />
        </button>
      )}
      {canScroll.right && (
        <button
          onClick={() => scroll('right')}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2  shadow"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
};

export default AgentsCarouselDesktop;
