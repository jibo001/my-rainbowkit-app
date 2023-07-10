import { env } from "config/env"
import { useCallback } from "react"
import { TransactionReceipt } from "viem"
import { WaitForTransactionArgs, waitForTransaction } from 'wagmi/actions'

export function usePublicNodeWaitForTransaction() {
  const chainId = env.chainId
  const waitForTransaction_ = useCallback(
    async (opts: WaitForTransactionArgs): Promise<TransactionReceipt> => {
      return waitForTransaction({ ...opts, chainId })
    },
    [chainId],
  )

  return {
    waitForTransaction: waitForTransaction_,
  }
}
