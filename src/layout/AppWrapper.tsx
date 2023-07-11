import React, { ReactNode, useEffect } from 'react'
import { useSwitchNetwork, useWalletClient } from 'wagmi'
import styles from 'styles/AppWrapper.module.css'
import { env } from 'config/env'
import { useActiveChain } from 'hooks/useActiveChain'
import { CustomConnectButton } from 'components/CustomConnectButton/CustomConnectButton'

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const { switchNetwork } = useSwitchNetwork()
  const { data: walletClient } = useWalletClient()
  const activeChainId = useActiveChain()
  useEffect(() => {
    if (activeChainId !== env.chainId) {
      switchNetwork?.(env.chainId)
    }
  }, [activeChainId, switchNetwork, walletClient])
  return (
    <div className={styles.container}>
      <CustomConnectButton />

      {children}
    </div>
  )
}
