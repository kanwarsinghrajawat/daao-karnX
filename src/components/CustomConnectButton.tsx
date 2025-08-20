// CustomConnectButton.tsx
import { ConnectButton } from "@rainbow-me/rainbowkit";

type CustomConnectButtonProps = {
  fullWidth?: boolean;
};

export function CustomConnectButton({
  fullWidth = false,
}: CustomConnectButtonProps) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        openAccountModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            className={`transition-opacity duration-300 ${
              !ready
                ? "opacity-0 pointer-events-none select-none"
                : "opacity-100"
            }`}
          >
            {!connected ? (
              <button
                onClick={openConnectModal}
                className={`
                  bg-black text-white text-sm py-3 font-medium rounded-xl
                  transition-all duration-300 ease-in-out 
                  hover:scale-[1.02] active:scale-[0.98]
                  ${fullWidth ? "w-full" : "px-4"}
                `}
              >
                Connect Wallet
              </button>
            ) : (
              <div
                className={`flex items-stretch gap-2 ${fullWidth ? "w-full" : ""}`}
              >
                <button
                  onClick={openAccountModal}
                  className={`
                    bg-black text-white font-mono text-xs py-3 flex items-center justify-center
                    transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98]
                    ${fullWidth ? "w-full" : "px-4"}
                  `}
                >
                  <span className="truncate">{account.displayName}</span>
                  {account.displayBalance && (
                    <span className="ml-2 font-sans">
                      • {account.displayBalance}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
