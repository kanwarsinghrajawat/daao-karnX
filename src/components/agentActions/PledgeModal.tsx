'use client';

import { getFormattedTimeLeft } from '@/utils/dateTime';
import Text from '../ui/Text';
import Image from 'next/image';

export default function PledgeModal({ launchDate }: { launchDate: Date }) {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <Text type="p" className="text-2xl text-left text-text-primary font-bold">
          Pledge
        </Text>
      </div>

      <div className="border border-divider p-6 bg-white">
        <div className="text-center mb-6">
          <div className="flex flex-col gap-3 justify-center items-center">
            <Image src="/comingSoon.svg" alt="" width={80} height={80} />
            <Text type="h3" className="text-base font-bold text-text-primary mb-2">
              Genesis Launch Starts Soon
            </Text>
            <Text type="p" className="text-text-secondary text-sm font-normal leading-relaxed">
              The pledge period will open when the sale goes live.
            </Text>
          </div>
        </div>
        <div className="bg-background-gray p-3 text-center">
          <Text type="p" className="text-base font-normal text-text-primary">
            Starting in {getFormattedTimeLeft(launchDate)}
          </Text>
        </div>
      </div>
    </div>
  );
}
