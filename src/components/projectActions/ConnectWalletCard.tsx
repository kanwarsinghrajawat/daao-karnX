"use client";
import Image from "next/image";
import Text from "../ui/Text";
import { CustomConnectButton } from "../CustomConnectButton";
type ConnectWalletCardProps = {
  word: string;
};

const ConnectWalletCard = ({ word }: ConnectWalletCardProps) => {
  return (
    <div className="border border-divider p-6 bg-[#141414] w-full max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <Image
          src="/connect-wallet.svg"
          alt="connect-icon"
          width={40}
          height={40}
        />
      </div>
      <Text
        type="p"
        className="text-center text-text-primary font-bold text-base"
      >
        Connect Wallet
      </Text>
      <Text type="p" className="text-center text-text-secondary text-sm mt-2">
        Connect your wallet to {word}
      </Text>
      <div className="mt-4"></div>
      <CustomConnectButton fullWidth />
    </div>
  );
};
export default ConnectWalletCard;
