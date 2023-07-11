import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig, useChainId, useSwitchNetwork } from 'wagmi'
import type { AppProps } from 'next/app'
import { chains, wagmiConfig } from '../config/wagmi'
import { AppWrapper } from 'layout/AppWrapper'
import { env } from 'config/env'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} initialChain={env.chainId}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
