import { chainsData } from '@/constants/chains';
import { txnStates } from '@/constants/txn';
import { dexAddresses } from '@/swap/addresses';
import { generateSwapTxnData } from '@/swap/buildTxn';
import { getQuotes } from '@/swap/quotes';
import type { Token } from '@/types/tokens';
import { TxnState } from '@/types/txn';
import { getAgentStaticInfoByAddress } from '@/utils/agent';
import { getPublicClient } from '@/utils/publicClient';
import { getMinAmount } from '@/utils/slippage';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { erc20Abi, Hex, parseUnits } from 'viem';
import { useAccount, useSendTransaction, useSwitchChain, useWriteContract } from 'wagmi';

export const useSwap = ({ chainId }: { chainId: number }) => {
  const { address: account, chainId: walletChainId } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { sendTransactionAsync } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();
  const [txnState, setTxnState] = useState<TxnState | null>(null);

  const minSqrtPrice = 4295128750n;
  const maxSqrtPrice = 1461446703485210103287273052203988822378723970300n;

  const approveIfNeeded = async ({ amount, token, spender }: { amount: bigint; token: Hex; spender: Hex }) => {
    if (!account || token === chainsData[chainId].nativeCurrency.address) return;
    setTxnState(txnStates.checkingForApproval);
    const publicClient = getPublicClient(chainId);
    const allowance = await publicClient.readContract({
      address: token,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [account, spender],
    });
    if (BigInt(allowance) >= amount) return;
    setTxnState(txnStates.waitingForApprovalWalletConfirmation);
    const hash = await writeContractAsync({
      address: token,
      abi: erc20Abi,
      functionName: 'approve',
      args: [spender, amount],
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    if (receipt.status !== 'success') {
      throw new Error('Approval failed');
    }

    setTxnState(txnStates.confirmingApprovalOnChain);
  };

  const getQuote = async ({
    tokenIn,
    tokenOut,
    fee,
    amount,
    zeroToOne,
    chainId,
    agent,
    poolAddress,
  }: {
    tokenIn: Token;
    tokenOut: Token;
    fee: number;
    amount: bigint;
    zeroToOne: boolean;
    chainId: number;
    agent: Hex;
    poolAddress: Hex;
  }) => {
    const agentStaticInfo = getAgentStaticInfoByAddress({ address: agent, chainId });
    if (!agentStaticInfo) throw new Error('Agent not found');
    const res = await getQuotes({
      tokenIn: tokenIn.address,
      tokenOut: tokenOut.address,
      fee,
      amount: parseUnits(amount.toString(), tokenIn.decimals),
      sqrtPrice: zeroToOne ? minSqrtPrice : maxSqrtPrice,
      zeroToOne,
      type: agentStaticInfo.swapInfo.dex,
      chainId,
      poolAddress,
    });
    if (!res) return 0n;
    return res;
  };

  const swap = async ({
    tokenIn,
    tokenOut,
    amountIn,
    slippage,
    recipient,
    zeroToOne,
    agent,
    poolAddress,
    deadline,
  }: {
    tokenIn: Token;
    tokenOut: Token;
    amountIn: bigint;
    slippage: number;
    zeroToOne: boolean;
    recipient: Hex;
    agent: Hex;
    poolAddress: Hex;
    deadline: bigint;
  }) => {
    try {
      if (!account) throw new Error('Wallet not connected');
      if (walletChainId !== chainId) {
        await switchChainAsync({ chainId });
      }

      const agentStaticInfo = getAgentStaticInfoByAddress({ address: agent, chainId });
      if (!agentStaticInfo) throw new Error('Agent not found');

      const { router } = dexAddresses[chainId][agentStaticInfo.swapInfo.dex];

      await approveIfNeeded({
        amount: amountIn,
        token: tokenIn.address,
        spender: router,
      });

      const amountOut = await getQuote({
        tokenIn,
        tokenOut,
        fee: agentStaticInfo.swapInfo.fee,
        amount: amountIn,
        zeroToOne,
        chainId,
        agent,
        poolAddress,
      });

      const minAmountOut = getMinAmount(amountOut, slippage);

      const { callData, to, value } = await generateSwapTxnData({
        tokenIn: tokenIn.address,
        tokenOut: tokenOut.address,
        fee: agentStaticInfo.swapInfo.fee,
        recipient,
        poolAddress,
        amountIn,
        sqrtPrice: zeroToOne ? minSqrtPrice : maxSqrtPrice,
        deadline,
        minAmountOut,
        zeroToOne,
        type: agentStaticInfo.swapInfo.dex,
        chainId,
      });

      setTxnState(txnStates.waitingForTxnWalletConfirmation);

      const hash = await sendTransactionAsync({
        account,
        to,
        data: callData,
        value: BigInt(value),
        chainId,
      });

      setTxnState(txnStates.confirmingOnChain);

      const receipt = await getPublicClient(chainId).waitForTransactionReceipt({ hash });
      if (receipt.status !== 'success') throw new Error('Swap failed');

      toast.success('Swap successful');
    } catch (err) {
      console.error(err);
      toast.error('Swap failed');
    } finally {
      setTxnState(null);
    }
  };

  return {
    swap,
    getQuote,
    txnState,
  };
};
