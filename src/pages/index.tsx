import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
  useAccount,
  useChainId,
  useContractRead,
  useSwitchNetwork
} from 'wagmi'
import { useEffect, useState } from 'react'
import { getIdoStakeContract } from 'utils/contractHelpers'
import { env } from 'config/env'

const Home: NextPage = () => {
  const { address, isConnected } = useAccount()
  const [usdt, setUsdt] = useState('')
  const idoStakeContract = getIdoStakeContract()

  const ido = useContractRead({
    address: idoStakeContract.address,
    abi: idoStakeContract.abi,
    functionName: 'SBTC'
  })

  const PoolInfo = () => {
    if (ido.isFetching) {
      return <div>Loading...</div>
    } else if (ido.isSuccess) {
      return <div>{ido.data}</div>
    }
  }

  return (
    <>
      <div className={styles.container}>
        <ConnectButton />
        {PoolInfo()}
      </div>
    </>
  )
}

export default Home
