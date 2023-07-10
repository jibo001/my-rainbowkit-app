import { env } from 'config/env'
import React, { ReactNode, useEffect } from 'react'
import { useChainId, useNetwork, useSwitchNetwork } from 'wagmi'

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const chainId = useChainId()
  const { switchNetwork } = useSwitchNetwork()
  useEffect(() => {
    console.log(env)

    if (chainId !== env.chainId) {
      switchNetwork?.(env.chainId)
    }
  }, [chainId, switchNetwork])
  return <div>{children}</div>
}
