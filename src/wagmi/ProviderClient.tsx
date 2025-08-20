"use client";
import { supportedChainIds } from "@/constants/chains";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useMemo } from "react";
import { Provider as ReduxProvider } from "react-redux";
// import 'react-toastify/dist/ReactToastify.css';
import { cookieToInitialState, WagmiProvider } from "wagmi";
import { getWagmiConfig } from ".";
import { initializeStore } from "../../store";

// Create a stable QueryClient instance outside the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

interface ProviderClientProps {
  wagmiCookie: string | null;
  children: ReactNode;
}

const ProviderClient = ({ wagmiCookie, children }: ProviderClientProps) => {
  const wagmiConfig = useMemo(() => getWagmiConfig(), []);
  const initialWagmiState = useMemo(
    () => cookieToInitialState(wagmiConfig, wagmiCookie),
    [wagmiConfig, wagmiCookie]
  );

  return (
    <ReduxProvider store={initializeStore()}>
      <WagmiProvider config={wagmiConfig} initialState={initialWagmiState}>
        {/* <SessionProvider session={pageProps.session}> */}
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            initialChain={Object.values(supportedChainIds)[0]}
          >
            {/* <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false} // Changed to false to prevent initial flicker
              forcedTheme="dark" // Force dark theme
              disableTransitionOnChange
            > */}
            {/* <Layout font={'fontChoice'}> */}
            {children}
            {/* <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" // or "light"
              /> */}
            {/* </Layout> */}
            {/* </ThemeProvider> */}
          </RainbowKitProvider>
        </QueryClientProvider>
        {/* </SessionProvider> */}
      </WagmiProvider>
    </ReduxProvider>
  );
};

export default ProviderClient;
