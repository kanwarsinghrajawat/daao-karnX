// import { uniswapV2RouterAbi } from '@/abi/uniswap/v2/router';
// import { contractAddresses } from '@/constants/addresses';
// import { supportedChainIds } from '@/constants/chains';
// import { getPublicClient } from '@/utils/publicClient';

// //   const [token0, token1]: [Hex, Hex] =
// //     tokenA.toLowerCase() < tokenB.toLowerCase() ? [tokenA, tokenB] : [tokenB, tokenA];

// //   const walletClient = getWalletClient(supportedChainIds.bsc, myPrivateKey);

// //   console.log('account:', walletClient.account!.address);

// //   const txnHash = await walletClient.writeContract({
// //     address: factoryAddress,
// //     abi: uniswapV2FactoryAbi,
// //     functionName: 'createPair',
// //     args: [token0, token1],
// //     account: walletClient.account!,
// //     chain: walletClient.chain,
// //     gasPrice: 1000000000n, // 1 Gwei
// //     gas: 3000000n, // Adjust gas limit as needed
// //   });

// //   console.log('Transaction Hash:', txnHash);

// //   //   console.dir({
// //   //     decodedData: decodeFunctionData({
// //   //       abi: uniswapV2FactoryAbi,
// //   //       data: '0xc9c653960000000000000000000000000ff5393387ad2f9f691fd6fd28e07e3969e27e63000000000000000000000000273cfa50190358639ea7ab3e6bf9c91252132338',
// //   //     }),
// //   //   });
// // };

// // const getPoolAddress = async () => {
// //   const poolAddress = await UniswapV2Factory.getPoolAddress({
// //     tokenA: '0x273cfA50190358639ea7ab3e6bF9c91252132338', // WETH
// //     tokenB: '0x0fF5393387ad2f9f691FD6Fd28e07E3969e27e63', // USDT
// //     factoryAddress: contractAddresses[supportedChainIds.bsc].v2Factory,
// //     chainId: supportedChainIds.bsc,
// //   });
// //   console.log('Pool Address:', poolAddress);
// // };

// // const addLiquidityEth = async () => {
// //   const walletClient = getWalletClient(supportedChainIds.bsc, myPrivateKey);
// //   const txnHash = await walletClient.writeContract({
// //     address: contractAddresses[supportedChainIds.bsc].v2Router,
// //     abi: uniswapV2RouterAbi,
// //     account: walletClient.account!,
// //     functionName: 'addLiquidityETH',
// //     args: [
// //       '0x0fF5393387ad2f9f691FD6Fd28e07E3969e27e63', // USDT
// //       1000000000000000000n, // 1 USDT
// //       0n, // amountTokenMin
// //       0n, // amountETHMin
// //       walletClient.account!.address, // to
// //       getDeadline(20), // deadline (20 minutes from now)
// //     ],
// //     value: 388111791058987n,
// //     chain: walletClient.chain,
// //   });

// //   console.log('Transaction Hash:', txnHash);
// // };

// const getQuoteForExactInput = async () => {
//   const publicClient = getPublicClient(supportedChainIds.bsc);
//   const quote = await publicClient.readContract({
//     address: contractAddresses[supportedChainIds.bsc].v2Router,
//     abi: uniswapV2RouterAbi,
//     functionName: 'getAmountsOut',
//     args: [
//       1000000000000000000n, // 0.00001 USDT
//       ['0x273cfA50190358639ea7ab3e6bF9c91252132338', '0x0fF5393387ad2f9f691FD6Fd28e07E3969e27e63'],
//     ],
//   });
//   console.log('Quote for Exact Input:', quote);
// };

// getQuoteForExactInput();
