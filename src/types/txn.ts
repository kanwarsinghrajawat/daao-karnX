import { txnStates } from '@/constants/txn';

export type TxnState = keyof typeof txnStates;
