import { Toast } from "antd-mobile"
import { useCallback, useMemo, useState } from "react"
import { BaseError, Hash, UnknownRpcError, TransactionExecutionError, ContractFunctionExecutionError, UserRejectedRequestError } from "viem"
import { SendTransactionResult, WaitForTransactionResult, waitForTransaction } from "wagmi/actions"

export type CatchTxErrorReturn = {
  fetchWithCatchTxError: (fn: () => Promise<SendTransactionResult | Hash>) => Promise<WaitForTransactionResult>
  fetchTxResponse: (fn: () => Promise<SendTransactionResult | Hash>) => Promise<SendTransactionResult>
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

  const handleNormalError = useCallback(
    (error: any) => {
      const err = parseError(error)
      if (err) {
        Toast.show(error.message)
      } else {
        Toast.show('Please try again. Confirm the transaction and make sure you are paying enough gas!')
      }
    },
    [],
  )

  const handleTxError = useCallback(
    (error: any, hash: Hash) => {
      const err = parseError(error)
      Toast.show(err.message)
    },
    [],
  )

  const possibleRejectMessage = useMemo(() => ['Cancelled by User', 'User rejected the request', 'cancel', 'Transaction was rejected'], [])

  const isUserRejected = useCallback((err: any): boolean => {
    if (err instanceof TransactionExecutionError) {
      return possibleRejectMessage.some((msg) => err.message.includes(msg))
    }
    // fallback for raw rpc error code
    if (typeof err === 'object') {
      if (
        ('code' in err && (err.code === 4001 || err.code === 'ACTION_REJECTED')) ||
        ('cause' in err && 'code' in err.cause && err.cause.code === 4001)
      ) {
        return true
      }

      if ('cause' in err) {
        return isUserRejected(err.cause)
      }
    }
    return false
  }, [possibleRejectMessage])

  const fetchTxResponse = useCallback(
    async (callTx: () => Promise<SendTransactionResult | Hash>): Promise<SendTransactionResult> => {
      let tx: SendTransactionResult | Hash = null

      try {
        setTxResponseLoading(true)
        /**
         * https://github.com/vercel/swr/pull/1450
         *
         * wait for useSWRMutation finished, so we could apply SWR in case manually trigger tx call
         */
        tx = await callTx()
        const hash = typeof tx === 'string' ? tx : tx.hash
        Toast.show('Transaction Submitted')
        return { hash }
      } catch (error: any) {
        if (!isUserRejected(error)) {
          if (!tx) {
            handleNormalError(error)
          } else {
            handleTxError(error, typeof tx === 'string' ? tx : tx.hash)
          }
        }
      } finally {
        setTxResponseLoading(false)
      }

      return null
    },
    [handleNormalError, handleTxError, isUserRejected],
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
        Toast.show('Transaction Submitted')
        const receipt = await waitForTransaction({
          hash,
        })
        return receipt
      } catch (error: any) {
        console.log(error);

        console.log(new BaseError(error).cause);
        console.log(new BaseError(error).details);
        if (!isUserRejected(error)) {
          if (!tx) {
            handleNormalError(error)
          } else {
            handleTxError(error, typeof tx === 'string' ? tx : tx.hash)
          }
        } else {
          Toast.show('User rejected the request')
        }
      } finally {
        setLoading(false)
      }

      return null
    },
    [isUserRejected, handleNormalError, handleTxError],
  )

  return {
    fetchWithCatchTxError,
    fetchTxResponse,
    loading,
    txResponseLoading,
  }
}