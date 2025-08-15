import { ConnectButton } from "@rainbow-me/rainbowkit";

export function CustomConnectButton() {
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
                className="px-4 py-2.5 rounded-lg bg-[#141414] text-slate-200 font-mono text-sm ring-1 ring-slate-800/70 shadow-sm transition-all duration-300 hover:ring-orange-400/50 hover:shadow-[0_0_10px_rgba(251,146,60,0.15)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-stretch gap-2">
                <button
                  onClick={openAccountModal}
                  className="px-4 py-2.5 rounded-lg bg-[#141414] text-slate-200 font-mono text-xs ring-1 ring-slate-800/70 shadow-sm flex items-center transition-all duration-300 hover:ring-orange-400/50 hover:shadow-[0_0_10px_rgba(251,146,60,0.15)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="truncate">{account.displayName}</span>
                  {account.displayBalance && (
                    <span className="ml-2 font-sans text-slate-400">
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
