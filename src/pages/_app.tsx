import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig, useChainId, useSwitchNetwork } from 'wagmi'
import type { AppProps } from 'next/app'
import { chains, wagmiConfig } from '../config/wagmi'
import { AppWrapper } from 'layout/AppWrapper'
import { env } from 'config/env'
import i18n from 'i18next';
import { useEffect } from 'react'
import "../assets/locales/config"


function MyApp({ Component, pageProps }: AppProps) {
  // 语种初始化 && cache
  useEffect(() => {
    let lang
    if (localStorage.getItem("decert.lang")) {
      lang = localStorage.getItem("decert.lang");
    }else{
      lang = navigator.language !== 'zh-CN' ? 'en-US' : 'zh-CN';
      localStorage.setItem("decert.lang",lang)
    }
    i18n.changeLanguage(lang);
    !localStorage.getItem("decert.cache") && localStorage.setItem("decert.cache", JSON.stringify({}))
  },[])
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
