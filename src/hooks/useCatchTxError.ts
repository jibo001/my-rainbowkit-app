import { Toast } from "antd-mobile"
import { useCallback, useEffect, useState } from "react"
import { BaseError, Hash, UnknownRpcError } from "viem"
import { SendTransactionResult, WaitForTransactionResult, waitForTransaction } from "wagmi/actions"

/**
 * @description 捕获交易错误 可拿到hash
 */
export type CatchTxErrorReturn = {
  fetchWithCatchTxError: (fn: () => Promise<SendTransactionResult | Hash>) => Promise<WaitForTransactionResult>
  fetchTxResponse: (fn: () => Promise<SendTransactionResult | Hash>) => Promise<SendTransactionResult>
  handleError: (error: any) => void
  loading: boolean
  txResponseLoading: boolean
}

/// only show corrected parsed viem error
export function parseError<TError>(err: TError): BaseError | null {
  if (err instanceof BaseError) {
    return err
  }
  if (typeof err === 'string') {
    return new UnknownRpcError(new Error(err))
  }
  if (err instanceof Error) {
    return new UnknownRpcError(err)
  }
  return null
}
export default function useCatchTxError(): CatchTxErrorReturn {
  const [loading, setLoading] = useState(false)
  const [txResponseLoading, setTxResponseLoading] = useState(false)

  const handleError = (error: any) => {
    if (!localStorage.getItem('wagmi.connected')) return Toast.show('Please connect wallet first')
    error = JSON.parse(JSON.stringify(error))
    Toast.show(error.cause.reason || error.shortMessage)
  }


  const fetchTxResponse = useCallback(
    async (callTx: () => Promise<SendTransactionResult | Hash>): Promise<SendTransactionResult> => {
      let tx: SendTransactionResult | Hash = null

      try {
        setTxResponseLoading(true)
        tx = await callTx()
        const hash = typeof tx === 'string' ? tx : tx.hash
        Toast.show('Transaction Submitted')
        return { hash }
      } catch (error: any) {
        handleError(error)
      } finally {
        setTxResponseLoading(false)
      }

      return null
    },
    [],
  )


  const fetchWithCatchTxError = useCallback(
    async (callTx: () => Promise<SendTransactionResult | Hash>): Promise<WaitForTransactionResult | null> => {
      let tx: SendTransactionResult | Hash = null
      try {
        setLoading(true)
        /**
         * https://github.com/vercel/swr/pull/1450
         *
         * wait for useSWRMutation finished, so we could apply SWR in case manually trigger tx call
         */
        tx = await callTx()

        const hash = typeof tx === 'string' ? tx : tx.hash
        // Toast.show('Transaction Submitted')
        const receipt = await waitForTransaction({
          hash,
        })
        return receipt
      } catch (error: any) {
        handleError(error)
      } finally {
        setLoading(false)
      }

      return null
    },
    [],
  )

  return {
    fetchWithCatchTxError,
    fetchTxResponse,
    handleError,
    loading,
    txResponseLoading,
  }
}