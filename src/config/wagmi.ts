import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { env } from './env'
import { chainMap } from './constants/chainId'





export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [chainMap[env.chainId]],
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