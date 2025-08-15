import { chainsData, viemChainsById } from '@/constants/chains';
import { Hex, WalletClient, createWalletClient, fallback, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

export const getWalletClient = (chainId: number, privateKey: Hex): WalletClient => {
  const rpcs = chainsData[chainId]?.rpcUrls || [];
  const account = privateKeyToAccount(privateKey);
  return createWalletClient({
    account,
    transport: fallback(rpcs.map((rpc) => http(rpc, { batch: { wait: 100 }, retryDelay: 400 }))),
    chain: viemChainsById[chainId],
  });
};
