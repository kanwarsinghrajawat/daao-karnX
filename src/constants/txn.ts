export const txnStates = {
  checkingForApproval: 'checkingForApproval',
  waitingForApprovalWalletConfirmation: 'waitingForApprovalWalletConfirmation',
  confirmingApprovalOnChain: 'confirmingApprovalOnChain',
  waitingForTxnWalletConfirmation: 'waitingForTxnWalletConfirmation',
  confirmingOnChain: 'confirmingOnChain',
  completed: 'completed',
  failed: 'failed',
} as const;
