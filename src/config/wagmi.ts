import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import {
  bsc,
  bscTestnet
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { env } from './env'

const defaultChain = env.chainId === 56 ? bsc : bscTestnet

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [defaultChain],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'template',
  projectId: env.projectId!,
  chains
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  // webSocketPublicClient
})