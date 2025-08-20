"use client";

import SelectTokenCard from "@/components/projectActions/SelectTokenCard";
import { fetchTokenBalance } from "@/helper/token";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { useSwap } from "@/hooks/useSwap";
import { Button } from "@/shadcn/components/ui/button";
import { ProjectOnChainData, DeployedProjectStaticInfo } from "@/types/project";
import { Token } from "@/types/tokens";
import { getDeadline } from "@/utils/deadline";
import { getTxnStateText } from "@/utils/txn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import Text from "../ui/Text";
import { SettingsModal } from "./SettingsModal";

interface SwapModalProps {
  token0: Token;
  token1: Token;
  projectBasicInfo: DeployedProjectStaticInfo;
  projectOnChainData: ProjectOnChainData;
}

export default function SwapModal({
  token0,
  token1,
  projectBasicInfo,
  projectOnChainData,
}: SwapModalProps) {
  const [srcToken, setSrcToken] = useState<Token>(token0);
  const [destToken, setDestToken] = useState<Token>(token1);
  const [srcAmount, setSrcAmount] = useState("");
  const [destAmount, setDestAmount] = useState("");
  const [srcBalance, setSrcBalance] = useState<bigint>(0n);
  const [destBalance, setDestBalance] = useState<bigint>(0n);
  const [quoteLoading, setQuoteLoading] = useState(false);

  const [{ slippagePercent, deadline }, setSettings] = useState({
    slippagePercent: 3,
    deadline: 5,
  });

  const { chainId, address: projectAddress } = projectBasicInfo;
  const { swap, getQuote, txnState } = useSwap({ chainId });
  const { address: account } = useAccount();

  const fetchQuote = async () => {
    if (!account || !srcToken || !destToken) return;
    setQuoteLoading(true);
    if (!isNaN(Number(srcAmount)) && Number(srcAmount)) {
      try {
        const parsedSrcAmount = parseUnits(srcAmount, srcToken.decimals);
        const destAmount = await getQuote({
          project: projectAddress,
          tokenIn: srcToken,
          tokenOut: destToken,
          amount: parsedSrcAmount,
          chainId,
          fee: projectBasicInfo.swapInfo.fee,
          zeroToOne:
            token0.address.toLowerCase() === srcToken.address.toLowerCase(),
          poolAddress: projectOnChainData.poolAddress,
        });
        const formatted = formatUnits(destAmount, destToken.decimals);
        setDestAmount(formatted);
        setQuoteLoading(false);
      } catch (e) {
        console.error("Quote fetch error:", e);
        setDestAmount("");
        setQuoteLoading(false);
      }
    } else {
      setDestAmount("");
      setQuoteLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!account || !srcToken || !destToken) return;
    try {
      const parsedSrcAmount = parseUnits(srcAmount, srcToken.decimals);
      await swap({
        project: projectAddress,
        tokenIn: srcToken,
        amountIn: parsedSrcAmount,
        tokenOut: destToken,
        deadline: getDeadline(60 * deadline),
        slippage: slippagePercent,
        recipient: account,
        zeroToOne:
          token0.address.toLowerCase() === srcToken.address.toLowerCase(),
        poolAddress: projectOnChainData.poolAddress,
      });
      fetchBalances();
      setSrcAmount("0");
      setDestAmount("0");
    } catch (e) {
      console.error("Swap error:", e);
    }
  };

  const handleToggle = () => {
    if (!srcToken && !destToken) return;
    const temp = srcToken;
    setSrcToken(destToken);
    setDestToken(temp);
    setSrcBalance(0n);
    setDestBalance(0n);
    setSrcAmount("0");
    setDestAmount("0");
  };

  const fetchBalances = async () => {
    if (account) {
      const srcBalance = srcToken
        ? await fetchTokenBalance({ token: srcToken.address, account, chainId })
        : 0n;
      setSrcBalance(srcBalance);

      const destBalance = destToken
        ? await fetchTokenBalance({
            token: destToken.address,
            account,
            chainId,
          })
        : 0n;
      setDestBalance(destBalance);
    }
  };

  const debouncedFetchQuote = useDebouncedCallback(fetchQuote, 400);

  // useEffects

  useEffect(() => {
    fetchBalances();
  }, [srcToken.address, destToken.address]);

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
    BigInt(parseUnits(srcAmount || "0", srcToken.decimals)) >
      BigInt(srcBalance) ||
    BigInt(parseUnits(srcAmount || "0", srcToken.decimals)) <= 0n ||
    BigInt(parseUnits(destAmount || "0", destToken.decimals)) <= 0n;

  return (
    <div className="w-full max-w-xl mx-auto text-slate-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 py-2">
        <h3 className="font-semibold text-lg text-slate-100">
          Interact with hAI
        </h3>
        <div className="flex justify-end">
          <SettingsModal
            slippage={slippagePercent}
            setSlippage={(slippagePercent) => {
              setSettings((prev) => ({ ...prev, slippagePercent }));
            }}
            deadline={deadline}
            setDeadline={(deadline) => {
              setSettings((prev) => ({ ...prev, deadline }));
            }}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-[#1f1f1f]"
              >
                <Image
                  src="/gear-icon.svg"
                  width={20}
                  height={20}
                  alt="settings image"
                  className="transition-transform duration-500 group-hover:rotate-[360deg]"
                />
              </Button>
            }
          />
        </div>
      </div>

      {/* From Card */}
      <div className="bg-[#171717] ring-1 ring-slate-800/70 overflow-hidden">
        <SelectTokenCard
          title="From"
          token={srcToken}
          amount={srcAmount}
          setAmount={(val: string) =>
            setSrcAmount(isNaN(Number(val)) ? "" : val)
          }
          onTokenClick={() => {}}
          balance={srcBalance}
          showPercentageButtons={true}
          showDropdown={false}
          hideBottomBorder
        />
      </div>

      <div className="relative z-10 flex items-center justify-center my-[-12px]">
        <div className="w-full flex items-center relative group">
          <div className="border-t border-slate-800 w-1/2" />
          <div className="z-20 px-2">
            <button
              onClick={handleToggle}
              aria-label="Switch tokens"
              className="bg-[#1f1f1f] p-2  ring-1 ring-slate-800/70 hover:bg-[#242424] transition-colors"
            >
              <Image
                src="/transaction.svg"
                alt="transaction icon"
                width={20}
                height={20}
                className={`transition-transform duration-300 ${
                  srcToken && destToken ? "rotate-0 group-hover:rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <div className="border-t border-slate-800 w-1/2" />
        </div>
      </div>

      {/* To Card */}
      <div className="bg-[#171717] ring-1 ring-slate-800/70 overflow-hidden">
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

      {/* Slippage Info */}
      <div className="mt-6 p-4 bg-[#1b1b1b]  ring-1 ring-slate-800/70 flex justify-between items-center">
        <Text type="p" className="text-slate-300 text-sm font-medium">
          Slippage Tolerance
        </Text>
        <Text type="p" className="text-slate-100 text-sm font-medium">
          {slippagePercent}%
        </Text>
      </div>

      <button
        onClick={handleSwap}
        disabled={isButtonDisabled}
        className={`
        w-full 
        bg-emerald-600 hover:bg-emerald-500
        text-white font-semibold text-base
        px-6 py-4 mt-6
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
        active:scale-[0.97]
      `}
      >
        {getTxnStateText(
          txnState,
          `Swap ${srcToken.symbol} to ${destToken.symbol}`
        )}
      </button>
    </div>
  );
}
