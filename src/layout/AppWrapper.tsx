import React, { ReactNode, useEffect } from 'react'
import { useAccount, useSwitchNetwork, useWalletClient } from 'wagmi'
import styles from 'styles/AppWrapper.module.css'
import { env } from 'config/env'
import { useActiveChain } from 'hooks/useActiveChain'
import { CustomConnectButton } from 'components/CustomConnectButton/CustomConnectButton'
import { useLocal } from 'hooks/useLocal'
import useSign from 'hooks/useSign'
import ReactQueryWrapper from './ReactQueryWrapper'

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const { switchNetwork } = useSwitchNetwork({
    onSuccess: () => {},
  })
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()
  const activeChainId = useActiveChain()
  const { removeSign } = useSign()
  // 双语
  useLocal()
  // 切换网络
  useEffect(() => {
    if (activeChainId !== env.chainId && activeChainId !== 0) {
      removeSign()
      switchNetwork?.(env.chainId)
    }
  }, [activeChainId, removeSign, switchNetwork, walletClient])

  useEffect(() => {
    if (!address) removeSign()
  }, [address, removeSign])

  return (
    <div className={styles.container}>
      <CustomConnectButton />
      <ReactQueryWrapper>{children}</ReactQueryWrapper>
    </div>
  )
}
