import { Button } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { Connector, useConnect } from 'wagmi'

export function ConnectButton() {
  const [myConnectots, setMyConnectors] = useState<Connector<any, any>[]>([])
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  useEffect(() => {
    setMyConnectors(connectors)
  }, [connectors])
  return (
    <div>
      {myConnectots.map((connector) => (
        <Button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
        </Button>
      ))}
      {error && <div>{error.message}</div>}
    </div>
  )
}
