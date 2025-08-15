import { supportedDexes } from '@/constants/swap/dex';
import { feeToTickSpacing } from '@/constants/swap/fee';
import { SupportedDex } from '@/types/swap/dex';
import { Hex } from 'viem';
import { UniswapV3 } from '../../swap/dexes/uniswap/v3';

export const getPoolAddress = async ({
  chainId,
  dex,
  token0,
  fee,
  token1,
}: {
  chainId: number;
  fee: number;
  dex: SupportedDex;
  token0: Hex;
  token1: Hex;
}): Promise<Hex> => {
  const handlers = {
    [supportedDexes.uniswapV3]: async () => {
      const uniswapDex = new UniswapV3(chainId);
      return await uniswapDex.getPoolAddress({
        fee,
        tickSpacing: feeToTickSpacing[fee],
        token0,
        token1,
      });
    },
  };
  const handler = handlers[dex];

  if (!handler) {
    throw new Error(`Unsupported dex: ${dex}`);
  }

  const poolAddress = await handler();

  return poolAddress;
};
