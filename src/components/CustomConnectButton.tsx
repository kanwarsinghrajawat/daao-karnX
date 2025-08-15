import { ConnectButton } from '@rainbow-me/rainbowkit';

export function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        //  openChainModal,
        openConnectModal,
        openAccountModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            className={`transition-opacity duration-300 ${
              !ready ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'
            }`}
          >
            {!connected ? (
              <button
                onClick={openConnectModal}
                className="bg-black text-white text-sm px-4 py-3 font-medium transition-all duration-300 ease-in-out  hover:scale-[1.02] active:scale-[0.98]"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-stretch gap-2">
                {/* Chain Button */}
                {/* <button
                  onClick={openChainModal}
                  className="flex items-center bg-black text-white text-xs px-3 py-3 font-medium transition-all duration-300 ease-in-out   hover:scale-[1.02] active:scale-[0.98]"
                  type="button"
                >
                  {chain.hasIcon && (
                    <div
                      className="w-4 h-4 overflow-hidden bg-white mr-2"
                      style={{ backgroundColor: chain.iconBackground }}
                    >
                      <img
                        alt={chain.name ?? 'Chain icon'}
                        src={chain.iconUrl}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <span className="truncate">{chain.name}</span>
                </button> */}

                {/* Account + Balance */}
                <button
                  onClick={openAccountModal}
                  className="bg-black text-white font-mono text-xs px-4 py-3 flex items-center transition-all duration-300 ease-in-out  hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="truncate">{account.displayName}</span>
                  {account.displayBalance && <span className="ml-2 font-sans">• {account.displayBalance}</span>}
                </button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
