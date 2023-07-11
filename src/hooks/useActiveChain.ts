import { useEffect, useState } from "react"
import { fromHex } from "viem"

/**
 * @return 获取当前链的 chainId
 */
export const useActiveChain = () => {
  const [chainId, setChainId] = useState<number>()
  useEffect(() => {
    setChainId(fromHex(window.ethereum.chainId, 'number'))
  }, [])
  return chainId
}