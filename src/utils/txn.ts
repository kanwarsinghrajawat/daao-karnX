import { TxnState } from '@/types/txn';

export const getTxnStateText = (txnState: TxnState | null, defaultText: string): string => {
  switch (txnState) {
    case null:
      return defaultText;
    case 'checkingForApproval':
      return 'Checking Approval...';
    case 'waitingForApprovalWalletConfirmation':
      return 'Waiting for Approval Confirmation...';
    case 'confirmingApprovalOnChain':
      return 'Confirming Approval on Chain...';
    case 'waitingForTxnWalletConfirmation':
      return 'Waiting for Transaction Confirmation...';
    case 'confirmingOnChain':
      return 'Confirming Transaction on Chain...';
    default:
      return defaultText;
  }
};
