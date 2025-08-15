'use client';
import {
  metaMaskWallet,
  trustWallet,
  frontierWallet,
  safepalWallet,
  phantomWallet,
  walletConnectWallet,
  okxWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { POLLING_INTERVAL } from '@/constants/app/wagmi';
import { supportedChainIds, viemChainsById } from '@/constants/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { Transport } from 'viem';
import { cookieStorage, createConfig, createStorage, http } from 'wagmi';

const getConnectors = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  return connectorsForWallets(
    [
      {
        groupName: 'Recommended',
        wallets: [
          metaMaskWallet,
          trustWallet,
          frontierWallet,
          safepalWallet,
          phantomWallet,
          okxWallet,
          walletConnectWallet,
        ],
      },
    ],
    { appName: 'Haven AI', projectId: '762399822f3c6326e60b27c2c2085d52' },
  );
};

const supportedChains = Object.values(supportedChainIds).map((chainId) => {
  return viemChainsById[chainId];
});

export const getWagmiConfig = () => {
  return createConfig({
    chains: [supportedChains[0], ...supportedChains.slice(1)],
    storage: createStorage({
      storage: cookieStorage,
    }),
    pollingInterval: POLLING_INTERVAL.ms1500,
    syncConnectedChain: true,
    transports: supportedChains.reduce(
      (acc, chain) => {
        acc[chain.id] = http();
        return acc;
      },
      {} as Record<number, Transport>,
    ),
    ssr: true,
    connectors: getConnectors(),
  });
};
