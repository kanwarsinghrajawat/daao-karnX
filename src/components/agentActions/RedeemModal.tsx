'use client';

import SelectTokenCard from '@/components/agentActions/SelectTokenCard';
import { fetchTokenBalance } from '@/helper/token';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { useRedeem } from '@/hooks/useRedeem';
import { DeployedAgentStaticInfo } from '@/types/agent';
import { Token } from '@/types/tokens';
import { getTxnStateText } from '@/utils/txn';
import { useEffect, useState } from 'react';
import { formatUnits, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import Text from '../ui/Text';

interface RedeemProps {
  srcToken: Token;
  destToken: Token;
  agentBasicInfo: DeployedAgentStaticInfo;
}

export default function RedeemModal({ srcToken, destToken, agentBasicInfo }: RedeemProps) {
  const [srcAmount, setSrcAmount] = useState('');
  const [destAmount, setDestAmount] = useState('');
  const [srcBalance, setSrcBalance] = useState<bigint>(0n);
  const [destBalance, setDestBalance] = useState<bigint>(0n);
  const [quoteLoading, setQuoteLoading] = useState(false);

  const { chainId, address: agentAddress } = agentBasicInfo;
  const { redeem, getRedeemAmount, txnState } = useRedeem({ chainId, agentAddress });
  const { address: account } = useAccount();

  const fetchQuote = async () => {
    if (!account || !srcToken || !destToken) return;
    setQuoteLoading(true);
    if (!isNaN(Number(srcAmount)) && Number(srcAmount)) {
      try {
        const quoted = await getRedeemAmount({
          amountIn: parseUnits(srcAmount, srcToken.decimals),
        });

        const formatted = formatUnits(quoted, destToken.decimals);
        setDestAmount(formatted);
        setQuoteLoading(false);
      } catch (e) {
        console.error('Quote fetch error:', e);
        setDestAmount('');
        setQuoteLoading(false);
      }
    } else {
      setDestAmount('');
      setQuoteLoading(false);
    }
  };

  const handleRedeem = async () => {
    if (!account || !srcToken || !destToken) return;
    try {
      await redeem({
        amountIn: parseUnits(srcAmount, srcToken.decimals),
      });
      fetchBalances();
      setSrcAmount('0');
      setDestAmount('0');
    } catch (e) {
      console.error('Swap error:', e);
    }
  };

  const fetchBalances = async () => {
    if (account) {
      const srcBalance = srcToken ? await fetchTokenBalance({ token: srcToken.address, account, chainId }) : 0n;
      setSrcBalance(srcBalance);

      const destBalance = destToken ? await fetchTokenBalance({ token: destToken.address, account, chainId }) : 0n;
      setDestBalance(destBalance);
    }
  };

  // useEffects

  const debouncedFetchQuote = useDebouncedCallback(fetchQuote, 400);

  useEffect(() => {
    debouncedFetchQuote();
  }, [srcAmount]);

  useEffect(() => {
    if (!account) return;
    fetchBalances();
  }, [account]);

  const isButtonDisabled =
    txnState !== null ||
    !srcToken ||
    !destToken ||
    BigInt(parseUnits(srcAmount || '0', srcToken.decimals)) > BigInt(srcBalance) ||
    BigInt(parseUnits(srcAmount || '0', srcToken.decimals)) <= 0n ||
    BigInt(parseUnits(destAmount || '0', destToken.decimals)) <= 0n;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className=" text-white flex justify-between items-center mb-2 py-2">
        <Text type="h3" className="font-semibold text-lg text-black">
          Interact with hAI
        </Text>
      </div>

      <div className="relative">
        <SelectTokenCard
          title="From"
          token={srcToken}
          amount={srcAmount}
          isDisabled
          setAmount={(val: string) => setSrcAmount(isNaN(Number(val)) ? '' : val)}
          onTokenClick={() => {}}
          balance={srcBalance}
          showPercentageButtons={true}
          showDropdown={false}
        />

        <SelectTokenCard
          title="To"
          token={destToken}
          amount={destAmount}
          setAmount={() => {}}
          isDisabled
          onTokenClick={() => {}}
          balance={destBalance}
          showPercentageButtons={false}
          isLoading={quoteLoading}
          showDropdown={false}
          hideTopBorder
        />
      </div>

      <button
        onClick={handleRedeem}
        disabled={isButtonDisabled}
        className={`
            w-full 
          bg-black
            text-white 
            text-base 
            leading-none
            px-6 py-4 
            disabled:cursor-not-allowed 
            transition-all duration-300
            active:scale-[0.97] 
            flex items-center justify-center mt-6
            
        `}
      >
        {getTxnStateText(txnState, `Redeem ${destToken.symbol} for ${srcToken.symbol}`)}
      </button>
    </div>
  );
}
