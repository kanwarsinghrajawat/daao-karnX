import { zeroAddress } from 'viem';
import * as viemChains from 'viem/chains';
import { ChainsConfig } from '../types/chains';

export const supportedChainIds = {
  bsc: 56,
};

export const viemChainsById: Record<number, viemChains.Chain> = [...Object.values(viemChains)].reduce(
  (acc, chainData) => {
    return chainData.id
      ? {
          ...acc,
          [chainData.id]: chainData,
        }
      : acc;
  },
  {},
);

export const chainsData: {
  [key: number]: ChainsConfig;
} = {
  [supportedChainIds.bsc]: {
    slug: 'bsc',
    name: 'Binance Smart Chain',
    rpcUrls: ['https://bsc-rpc.publicnode.com', 'https://bsc.drpc.org', 'https://bsc-pokt.nodies.app'],
    blockExplorer: 'https://bscscan.com',
    networkType: 'mainnet',
    logo: 'https://icons.llamao.fi/icons/chains/rsz_binance.jpg',
    wnativeToken: {
      address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
      decimals: 18,
      symbol: 'WBNB',
      name: 'Wrapped BNB',
    },
    nativeCurrency: {
      address: zeroAddress,
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    geckoId: 'binance-smart-chain',
  },
};

export const chainIdToChainSlugMap: {
  [key: number]: string;
} = Object.fromEntries(Object.entries(chainsData).map(([key, value]) => [Number(key), value.slug]));

export const chainSlugToChainIdMap: {
  [key: string]: number;
} = Object.fromEntries(Object.entries(chainsData).map(([key, value]) => [value.slug, Number(key)]));
