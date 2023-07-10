import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { ReactNode, useEffect } from 'react'
import { useChainId, useSwitchNetwork } from 'wagmi'
import styles from 'styles/AppWrapper.module.css'
import { env } from 'config/env'

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const chainId = useChainId()
  const { switchNetwork } = useSwitchNetwork()
  useEffect(() => {
    if (chainId !== env.chainId) {
      switchNetwork?.(env.chainId)
    }
  }, [chainId, switchNetwork])
  return (
    <div className={styles.container}>
      <ConnectButton />

      {children}
    </div>
  )
}
