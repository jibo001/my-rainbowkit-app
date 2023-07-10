import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import {
  bsc,
  bscTestnet
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { env } from './env'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    bsc,
    bscTestnet
  ],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: env.projectId!,
  chains
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
})