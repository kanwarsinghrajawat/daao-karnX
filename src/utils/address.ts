import { chainsData } from '@/constants/chains';
import { isAddress, getAddress, checksumAddress, Hex } from 'viem';

export const isNativeToken = (address: string, chainId: number): boolean => {
  const checkSumAddress = isAddress(address) ? getAddress(address) : address;
  const chainInfo = chainsData[chainId];
  return chainInfo.nativeCurrency.address === checkSumAddress;
};

export const formatToken = (address: Hex) => {
  return checksumAddress(address);
};

export const generateExplorerLink = (chainId: number, address: string): string => {
  const chainExplorerUrl = chainsData[chainId].blockExplorer;
  return `${chainExplorerUrl}/address/${address}`;
};

export const truncateAddress = (address: string, length: number = 4): string => {
  if (address) {
    return `${address.slice(0, length)}...${address.slice(address.length - length)}`;
  }
  return '';
};
