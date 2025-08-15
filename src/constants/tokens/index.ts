import { supportedChainIds } from '@/constants/chains';
import { Token } from '@/types/tokens';
import { Hex } from 'viem';
import { bscTokens } from './bsc';

export const tokensByChainId: { [chainId: number]: { [address: Hex]: Token } } = {
  [supportedChainIds.bsc]: bscTokens,
};
