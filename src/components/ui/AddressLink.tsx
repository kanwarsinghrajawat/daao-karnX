import { generateExplorerLink, truncateAddress } from '@/utils/address';
import Image from 'next/image';
import Link from 'next/link';

export default function AddressLink({ address, chainId }: { address: string; chainId: number }) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={generateExplorerLink(chainId, address)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="text-text-secondary text-sm font-normal font-mono"
      >
        {truncateAddress(address)}
      </Link>
      <Image src="/arrow-up-right.svg" alt="Open in explorer" width={16} height={16} className="inline-block" />
    </div>
  );
}
