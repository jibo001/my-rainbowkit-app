import { ChainId } from "config/constants/chainId"
import { useEffect, useState } from "react"
import { fromHex } from "viem"

export const useActiveChain = () => {
  const [chainId, setChainId] = useState<ChainId>()
  useEffect(() => {
    setChainId(fromHex(window.ethereum.chainId, 'number'))
  }, [])
  return chainId
}