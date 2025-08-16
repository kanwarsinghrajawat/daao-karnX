import { projectAbi } from '@/abi/project';
import { txnStates } from '@/constants/txn';
import { TxnState } from '@/types/txn';
import { getPublicClient } from '@/utils/publicClient';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Hex } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';

export const useClaim = ({ chainId, projectAddress }: { chainId: number; projectAddress: Hex }) => {
  const { address: account } = useAccount();
  const publicClient = getPublicClient(chainId);
  const { writeContractAsync } = useWriteContract();

  const [txnState, setTxnState] = useState<TxnState | null>(null);

  const claimTokens = async () => {
    if (!account) return;

    try {
      setTxnState(txnStates.waitingForTxnWalletConfirmation);
      const txnHash = await writeContractAsync({
        address: projectAddress,
        abi: projectAbi,
        functionName: 'claimTokens',
        args: [],
      });

      setTxnState(txnStates.confirmingOnChain);
      const receipt = await publicClient.waitForTransactionReceipt({ hash: txnHash });

      if (receipt.status !== 'success') {
        throw new Error('Claim failed');
      }

      toast.success('Tokens claimed successfully!');
      return true;
    } catch (error) {
      console.error('Error claiming tokens:', error);
      toast.error('Failed to claim tokens');
      return false;
    } finally {
      setTxnState(null);
    }
  };

  return {
    txnState,
    claimTokens,
  };
};
