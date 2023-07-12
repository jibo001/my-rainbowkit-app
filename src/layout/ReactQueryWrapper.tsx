import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import useSign from 'hooks/useSign'

// Create a client

const ReactQueryWrapper = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount()
  const { sign } = useSign()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: !address || !sign.signature,
      },
    },
  })
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryWrapper
