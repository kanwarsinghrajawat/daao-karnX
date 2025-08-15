import { supportedDexes } from '@/constants/swap/dex';
import { SupportedDex } from '@/types/swap/dex';
import { Hex } from 'viem';
import { UniswapV3 } from '../dexes/uniswap/v3';

export const getQuotes = async (data: {
  tokenIn: Hex;
  tokenOut: Hex;
  fee: number;
  poolAddress: Hex;
  amount: bigint;
  sqrtPrice: bigint;
  zeroToOne: boolean;
  type: SupportedDex;
  chainId: number;
}) => {
  const handlers = {
    [supportedDexes.uniswapV3]: async () => {
      const uniswapDex = new UniswapV3(data.chainId);
      return await uniswapDex.fetchQuotes(data);
    },
  };
  const handler = handlers[data.type];

  if (!handler) {
    return 0n;
  }

  return await handler();
};
