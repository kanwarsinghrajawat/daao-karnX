// import { Button } from '@/shadcn/components/ui/button';
import { Token } from "@/types/tokens";
import { truncateNumber } from "@/utils/number";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { formatUnits } from "viem";
import Text from "../ui/Text";
import BalancePercentageButtons from "../ui/BalancePercentageButtons";
import { toast } from "react-toastify";

type SelectTokenCardProps = {
  title?: string;
  token: Token | null;
  amount: string;
  setAmount: (value: string) => void;
  onTokenClick: () => void;
  balance?: bigint;
  isDisabled?: boolean;
  isLoading?: boolean;
  showDropdown?: boolean;
  showPercentageButtons?: boolean;
  hideTopBorder?: boolean;
  hideBottomBorder?: boolean;
};

export default function SelectTokenCard({
  title,
  token,
  amount,
  setAmount,
  onTokenClick,
  balance,
  isDisabled = false,
  isLoading = false,
  showDropdown = true,
  showPercentageButtons = true,
  hideTopBorder,
  hideBottomBorder,
}: SelectTokenCardProps) {
  return (
    <div
      className={`group border border-form-outline p-4 transition-colors 
    ${hideTopBorder ? "border-t-0" : ""} 
    ${hideBottomBorder ? "border-b-0" : ""}`}
    >
      <div className="flex justify-between items-center mb-3">
        <Text type="span" className="text-zinc-400 text-sm font-medium">
          {title}
        </Text>

        {Boolean(showPercentageButtons && balance) && (
          <div
            className="
       opacity-100 translate-y-0
       md:opacity-0 md:-translate-y-2
       md:group-hover:opacity-100 md:group-hover:translate-y-0
       transition-all duration-200
     "
          >
            <BalancePercentageButtons
              balance={balance || 0n}
              decimals={token?.decimals || 18}
              setAmount={setAmount}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between items-start mb-3">
        <div className="flex align-end flex-col justify-end">
          {isLoading ? (
            <div className="w-36 h-10 bg-stroke animate-pulse rounded-md text-black" />
          ) : (
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (isNaN(Number(value))) return;

                // Allow empty string for clearing
                if (value === "") {
                  setAmount("");
                  return;
                }

                // Split into whole and decimal
                const [, decimal] = value.split(".");

                if (!decimal) {
                  setAmount(value);
                  return;
                }

                // Find the index of the first non-zero digit in the decimal part
                const firstNonZero = decimal.search(/[1-9]/);

                // If there is a non-zero digit and it is after the 5th index (6th decimal place), block it and show toast
                if (firstNonZero > 5) {
                  toast.error(
                    "First non-zero digit must be within the first 6 decimal places."
                  );
                  return;
                }

                setAmount(value);
              }}
              disabled={isDisabled}
              placeholder="0"
              className={`text-3xl font-light bg-transparent  outline-none placeholder-grey-2 w-36 ${Number(formatUnits(balance ?? 0n, token?.decimals || 18)) < Number(amount || 0) ? "text-red-500" : "text-black"}`}
            />
          )}
        </div>
        <div>
          <div className="w-full flex justify-end">
            <button
              onClick={onTokenClick}
              className={`flex items-center cursor-pointer gap-2 px-3 py-2 font-bold  w-fit bg-none text-gray-400 rounded-full border-form-outline border
            ${token?.symbol || token?.logo ? "bg-none" : "bg-none"}
       
            duration-300`}
            >
              {token?.logo && (
                <Image
                  src={token.logo}
                  alt={`${token.symbol} logo`}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full"
                />
              )}
              {token?.symbol || "Select Token"}
              {showDropdown ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <div className="w-2" />
              )}
            </button>
          </div>

          <div className="flex justify-between items-center mt-4">
            {/* <Text type="span" className="text-grey text-sm">
              $0.00
            </Text> */}
            <Text type="span" className="text-text-secondary text-xs">
              {balance !== undefined && balance !== null && token?.symbol
                ? `Balance: ${truncateNumber(formatUnits(balance ?? 0n, token.decimals || 18))} ${token.symbol}`
                : ""}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
