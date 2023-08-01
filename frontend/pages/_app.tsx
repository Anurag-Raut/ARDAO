import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon,polygonMumbai,sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const sepoliaRpcUrl = 'YOUR_CUSTOM_SEPOLIA_RPC_URL';
const sepoliaCustomConfig = {
  id: 'custom-sepolia', // Unique ID for your custom chain
  network: 'custom-sepolia-network', // Unique network name for your custom chain
  name: 'Sepolia', // Replace with the name of your custom chain
  chainId: 12345, // Replace with the chain ID of your custom chain
  rpcUrls: [sepoliaRpcUrl],
  nativeCurrency: {
    name: 'Sepolia Token', // Replace with the name of your custom token
    symbol: 'ST', // Replace with the symbol of your custom token
    decimals: 18,
  },
  blockExplorerUrls: ['https://example-explorer.com'], // Replace with your custom block explorer URL
};
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    polygonMumbai,
    goerli,
    sepolia,
   
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: '5bffcdef2cf37b4ac148e868fb816e36',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    setReady(true);
  },[])
  return (
    <>
    {
      ready?
      <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
        <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        
        closeOnClick
        pauseOnHover
      />
      </RainbowKitProvider>
    </WagmiConfig>
    :null

    }
    </>
    
  );
}

export default MyApp;
