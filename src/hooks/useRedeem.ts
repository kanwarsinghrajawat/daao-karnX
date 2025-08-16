import { toast } from 'react-toastify';
import { Hex } from 'viem';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';

import { projectAbi } from '@/abi/project';
import { getPublicClient } from '@/utils/publicClient';
import { useState } from 'react';
import { TxnState } from '@/types/txn';
import { txnStates } from '@/constants/txn';

export const useRedeem = ({ chainId, projectAddress }: { chainId: number; projectAddress: Hex }) => {
  const { address: account, chainId: walletChainId } = useAccount();
  const [txnState, setTxnState] = useState<TxnState | null>(null); // Placeholder for transaction state if needed
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();

  const getRedeemAmount = async ({ amountIn }: { amountIn: bigint }) => {
    try {
      const publicClient = getPublicClient(chainId);
      const quote = await publicClient.readContract({
        address: projectAddress,
        abi: projectAbi,
        functionName: 'previewRedemption',
        args: [amountIn],
      });

      return BigInt(quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
      return 0n;
    }
  };

  const redeem = async ({ amountIn }: { amountIn: bigint }) => {
    try {
      if (!account) throw new Error('Wallet not connected');
      if (walletChainId !== chainId) {
        await switchChainAsync({ chainId });
      }
      setTxnState(txnStates.waitingForTxnWalletConfirmation);
      const hash = await writeContractAsync({
        account,
        abi: projectAbi,
        address: projectAddress,
        functionName: 'redeemTokens',
        args: [amountIn],
      });

      setTxnState(txnStates.confirmingOnChain);

      const receipt = await getPublicClient(chainId).waitForTransactionReceipt({ hash });
      if (receipt.status !== 'success') throw new Error('Redeem failed');
      toast.success('Redeem successful');
    } catch (err) {
      console.error(err);
      toast.error('Redeem failed');
    } finally {
      setTxnState(null);
    }
  };

  return {
    redeem,
    getRedeemAmount,
    txnState,
  };
};
