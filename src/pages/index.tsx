import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useContractRead } from 'wagmi'
import { getIdoStakeContract } from 'utils/contractHelpers'

const Home: NextPage = () => {
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
