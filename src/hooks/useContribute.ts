import { projectAbi } from '@/abi/project';
import { chainsData } from '@/constants/chains';
import { txnStates } from '@/constants/txn';
import { fetchTokenBalance } from '@/helper/token';
import { Token } from '@/types/tokens';
import { TxnState } from '@/types/txn';
import { getPublicClient } from '@/utils/publicClient';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { erc20Abi, Hex } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';

export const useContribute = ({
  chainId,
  projectAddress,
  underlyingAsset,
}: {
  chainId: number;
  projectAddress: Hex;
  underlyingAsset: Token;
}) => {
  const { address: account } = useAccount();
  const publicClient = getPublicClient(chainId);
  const { nativeCurrency } = chainsData[chainId];

  const { writeContractAsync } = useWriteContract();
  // states
  const [balances, setBalances] = useState<{ [key: string]: bigint }>({});

  const [txnState, setTxnState] = useState<TxnState | null>(null);
  const fetchBalance = async () => {
    if (!account) return;
    try {
      const underlyingAssetBalance = await fetchTokenBalance({
        token: underlyingAsset.address,
        account,
        chainId,
      });
      setBalances((prev) => ({
        ...prev,
        [underlyingAsset.address]: underlyingAssetBalance,
      }));
    } catch {}
  };

  const approveIfNeeded = async ({ amount, token, spender }: { amount: bigint; token: Hex; spender: Hex }) => {
    if (!account || token === nativeCurrency.address) return;
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
    const txnHash = await writeContractAsync({
      address: token,
      abi: erc20Abi,
      functionName: 'approve',
      args: [spender, amount],
    });
    setTxnState(txnStates.confirmingApprovalOnChain);
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txnHash });

    if (receipt.status !== 'success') {
      throw new Error('Approval failed');
    }
  };

  const contribute = async (amount: bigint) => {
    if (!account) return;
    const underlyingAssetBalance = balances[underlyingAsset.address] || 0n;
    try {
      if (underlyingAssetBalance < amount) {
        return toast.error('Insufficient balance');
      }
      await approveIfNeeded({
        token: underlyingAsset.address,
        amount,
        spender: projectAddress,
      });
      setTxnState(txnStates.waitingForTxnWalletConfirmation);
      const txnHash = await writeContractAsync({
        address: projectAddress,
        abi: projectAbi,
        functionName: 'contribute',
        args: [amount],
      });
      setTxnState(txnStates.confirmingOnChain);
      const receipt = await publicClient.waitForTransactionReceipt({ hash: txnHash });

      if (receipt.status !== 'success') {
        throw new Error('Approval failed');
      }

      toast.success('Contribution Successful');
    } catch (error) {
      console.error('Error contributing:', error);
      toast.error('Contribution failed');
    } finally {
      setTxnState(null);
      fetchBalance();
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [account, chainId, underlyingAsset.address]);

  return {
    balances,
    fetchBalance,
    txnState,
    contribute,
  };
};
