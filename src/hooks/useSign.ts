import { useCallback, useEffect, useState } from "react"
import { hashMessage } from "viem"
import { useAccount, useConnect, useSignMessage } from "wagmi"
import useCatchTxError from "./useCatchTxError"


export default function useSign() {
  const [sign, setSign] = useState({
    address: '',
    message: '',
    signature: ''
  })
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const rawMessage = Math.random().toString(36).slice(-8)
  const { handleError } = useCatchTxError()
  const { isLoading, signMessageAsync } = useSignMessage({
    message: rawMessage,
    onSuccess: (result) => {
      const message = hashMessage(rawMessage)
      const signature = result
      localStorage.setItem('address', address)
      localStorage.setItem('message', message)
      localStorage.setItem('signature', signature)
      setSign({
        address,
        message,
        signature
      })
    }
  })

  useEffect(() => {
    setSign({
      address: localStorage.getItem('address') || '',
      message: localStorage.getItem('message') || '',
      signature: localStorage.getItem('signature') || ''
    })
  }, [])
  const removeSign = () => {
    localStorage.removeItem('address')
    localStorage.removeItem('message')
    localStorage.removeItem('signature')
  }

  const signAsync = useCallback(async () => {
    try {
      if (!isConnected) connect()
      await signMessageAsync()
    } catch (error) {
      handleError(error)
      return false
    }
    return true
  }, [connect, handleError, isConnected, signMessageAsync])
  return {
    signLoading: isLoading,
    sign,
    signAsync,
    removeSign
  }
}