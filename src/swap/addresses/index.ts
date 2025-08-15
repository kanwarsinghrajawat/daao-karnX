import { supportedChainIds } from '@/constants/chains';
import { supportedDexes } from '@/constants/swap/dex';
import { uniswapV3Addresses } from '../dexes/uniswap/v3/addresses';
import { SupportedDex } from '@/types/swap/dex';
import { Hex } from 'viem';

export const dexAddresses: {
  [chainId: number]: {
    [dexType in SupportedDex]: {
      factory: Hex;
      quoter: Hex;
      router: Hex;
    };
  };
} = {
  [supportedChainIds.bsc]: {
    [supportedDexes.uniswapV3]: uniswapV3Addresses[supportedChainIds.bsc],
  },
};
