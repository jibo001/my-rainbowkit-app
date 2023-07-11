import type { NextPage } from 'next'
import { Address, useContractRead, useWalletClient } from 'wagmi'
import { getErc20Contract, getIdoStakeContract } from 'utils/contractHelpers'
import useTokenApprovalStatus from 'hooks/useTokenApprovalStatus'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { MaxUint256 } from 'ethers'
import { Button } from 'antd-mobile'
import useCatchTxError from 'hooks/useCatchTxError'
import BigNumber from 'bignumber.js'
import { useTranslation } from "react-i18next";
import i18n from 'i18next';

const Home: NextPage = () => {
  const { data: walletClient } = useWalletClient()
  const { t } = useTranslation(["claim"]);

  const idoStakeContract = getIdoStakeContract(walletClient)
  const ido = useContractRead({
    ...idoStakeContract,
    functionName: 'SBTC',
  })

  const PoolInfo = () => {
    const { isVaultApproved } = useTokenApprovalStatus(ido.data as Address, idoStakeContract.address)
    const { fetchWithCatchTxError, loading: isApproving } = useCatchTxError()
    const { callWithGasPrice } = useCallWithGasPrice()
    const sbtcContract = getErc20Contract(ido.data!, walletClient!)

    const handleApprove = async () => {
      const receipt = await fetchWithCatchTxError(() => {
        return callWithGasPrice(sbtcContract, 'approve', [idoStakeContract.address, MaxUint256])
      })
      console.log(receipt)
    }

    const handleDeposit = async () => {
      const receipt = await fetchWithCatchTxError(() => {
        return callWithGasPrice(idoStakeContract, 'deposit', [1, new BigNumber(1000), false])
      })
      console.log(receipt)
    }


    const toggleI18n = () => {
      let lang = i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN';
      i18n.changeLanguage(lang);
      localStorage.setItem("decert.lang", lang)
  }

    if (ido.isFetching) {
      return <div>Loading...</div>
    } else if (ido.isSuccess) {
      return (
        <div>
          <Button
            type="ghost"
            ghost
            className='lang custom-btn'
            id='hover-btn-line'
            onClick={() => toggleI18n()}
          >
            {i18n.language === 'zh-CN' ? "CN" : "EN"}
          </Button>
          <div>address:{ido.data}</div>
          <Button color="primary" fill="solid" loading={isApproving} onClick={handleApprove}>
            授权
            {t("pass")}
          </Button>
          <Button onClick={handleDeposit}>质押</Button>
        </div>
      )
    }
  }

  return (
    <>
      <div>
        <div></div>
        <div className="text-red-500">{PoolInfo()}</div>
      </div>
    </>
  )
}

export default Home
