import { uniswapV3FactoryAbi } from '@/abi/uniswap/v3/factory';
import { uniswapV3PoolAbi } from '@/abi/uniswap/v3/pool';
import { uniswapV3QuoterAbi } from '@/abi/uniswap/v3/quoter';
import { uniswapV3RouterAbi } from '@/abi/uniswap/v3/router';
import { supportedDexes } from '@/constants/swap/dex';
import { multicallForSameContract } from '@/helper/multicall';
import { dexAddresses } from '@/swap/addresses';
import { IDexProtocol, PoolAddressRequest, QuotesRequest, SupportedDex, SwapDataRequest } from '@/types/swap/dex';
import { getPublicClient } from '@/utils/publicClient';
import { encodeFunctionData, Hex, PublicClient } from 'viem';

export class UniswapV3 implements IDexProtocol {
  factoryAddress: Hex;
  swapRouterAddress: Hex;
  quoterAddress: Hex;
  publicClient: PublicClient;
  chainId: number;

  id = supportedDexes.uniswapV3;

  constructor(chainId: number, type: SupportedDex = supportedDexes.uniswapV3) {
    this.chainId = chainId;
    const dexDetails = dexAddresses[chainId][type];
    this.factoryAddress = dexDetails.factory;
    this.swapRouterAddress = dexDetails.router;
    this.quoterAddress = dexDetails.quoter;
    this.publicClient = getPublicClient(chainId);
  }

  getPoolAddress = async ({ token0, token1, fee }: PoolAddressRequest) => {
    return await this.publicClient.readContract({
      abi: uniswapV3FactoryAbi,
      functionName: 'getPool',
      args: [token0, token1, fee],
      address: this.factoryAddress,
    });
  };

  getV3PoolDetails = async (address: Hex) => {
    const multicallRes = (await multicallForSameContract({
      abi: uniswapV3PoolAbi,
      address,
      chainId: this.chainId,
      functionNames: ['token0', 'token1'],
      params: [[], []],
    })) as [Hex, Hex];

    return {
      token0: multicallRes[0],
      token1: multicallRes[1],
    };
  };

  fetchQuotes = async ({ tokenIn, tokenOut, fee, amount, sqrtPrice }: QuotesRequest) => {
    const res = (
      await this.publicClient.simulateContract({
        address: this.quoterAddress,
        abi: uniswapV3QuoterAbi,
        functionName: 'quoteExactInputSingle',
        args: [
          {
            amountIn: amount,
            tokenIn,
            tokenOut,
            fee,
            sqrtPriceLimitX96: sqrtPrice,
          },
        ],
      })
    ).result;

    return res[0];
  };

  generateSwapData = ({ amountIn, minAmountOut, recipient, fee, sqrtPrice, tokenIn, tokenOut }: SwapDataRequest) => {
    const callData = encodeFunctionData({
      abi: uniswapV3RouterAbi,
      args: [
        {
          amountIn,
          amountOutMinimum: minAmountOut,
          recipient,
          fee,
          sqrtPriceLimitX96: sqrtPrice,
          tokenIn,
          tokenOut,
        },
      ],
      functionName: 'exactInputSingle',
    });

    return {
      callData,
      to: this.swapRouterAddress,
      value: 0n,
    };
  };
}
