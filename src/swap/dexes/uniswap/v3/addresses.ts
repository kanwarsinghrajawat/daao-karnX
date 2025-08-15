import { supportedChainIds } from '@/constants/chains';

export const uniswapV3Addresses = {
  [supportedChainIds.bsc]: {
    factory: '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7',
    quoter: '0x78D78E420Da98ad378D7799bE8f4AF69033EB077',
    router: '0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2',
  },
} as const;
