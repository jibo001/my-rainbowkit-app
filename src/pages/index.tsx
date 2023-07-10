import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { Address, useContractRead, useWalletClient } from 'wagmi'
import { getErc20Contract, getIdoStakeContract } from 'utils/contractHelpers'
import useTokenApprovalStatus from 'hooks/useTokenApprovalStatus'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { MaxUint256 } from 'ethers'
import { Button } from 'antd-mobile'
import useCatchTxError from 'hooks/useCatchTxError'

const Home: NextPage = () => {
  const { data: walletClient } = useWalletClient()

  const idoStakeContract = getIdoStakeContract(walletClient)
  const ido = useContractRead({
    ...idoStakeContract,
    functionName: 'SBTC'
  })

  const PoolInfo = () => {
    const { isVaultApproved } = useTokenApprovalStatus(
      ido.data as Address,
      idoStakeContract.address
    )
    const { fetchWithCatchTxError, loading: isApproving } = useCatchTxError()
    const { callWithGasPrice } = useCallWithGasPrice()
    const sbtcContract = getErc20Contract(ido.data!, walletClient!)

    const handleApprove = async () => {
      const receipt = await fetchWithCatchTxError(() => {
        return callWithGasPrice(sbtcContract, 'approve', [
          idoStakeContract.address,
          MaxUint256
        ])
      })
      console.log(receipt)
    }

    if (ido.isFetching) {
      return <div>Loading...</div>
    } else if (ido.isSuccess) {
      return (
        <div>
          <div>address:{ido.data}</div>
          {isVaultApproved ? (
            <div>已授权</div>
          ) : (
            <Button
              color="primary"
              fill="solid"
              loading={isApproving}
              onClick={handleApprove}>
              授权
            </Button>
          )}
        </div>
      )
    }
  }

  return (
    <>
      <div>
        <div className="text-red-500">{PoolInfo()}</div>
      </div>
    </>
  )
}

export default Home
