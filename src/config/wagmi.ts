import { env } from 'config/env';
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { chainMap } from './constants/chainId'
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
  trustWallet
} from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [chainMap[env.chainId]],
  [publicProvider()]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains, projectId: env.projectId }),
      injectedWallet({ chains }),
      walletConnectWallet({ projectId: env.projectId, chains }),
      trustWallet({ chains, projectId: env.projectId })
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  // webSocketPublicClient
})