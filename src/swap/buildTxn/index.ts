import { supportedDexes } from '@/constants/swap/dex';
import { SupportedDex } from '@/types/swap/dex';
import { Hex } from 'viem';
import { UniswapV3 } from '../dexes/uniswap/v3';

export const generateSwapTxnData = (data: {
  tokenIn: Hex;
  tokenOut: Hex;
  fee: number;
  recipient: Hex;
  poolAddress: Hex;
  amountIn: bigint;
  sqrtPrice: bigint;
  deadline: bigint;
  minAmountOut: bigint;
  zeroToOne: boolean;
  type: SupportedDex;
  chainId: number;
}) => {
  const handlers = {
    [supportedDexes.uniswapV3]: async () => {
      const uniswapDex = new UniswapV3(data.chainId);
      return uniswapDex.generateSwapData(data);
    },
  };
  const handler = handlers[data.type];

  if (!handler) {
    throw new Error('Unsupported dex type');
  }

  return handler();
};
