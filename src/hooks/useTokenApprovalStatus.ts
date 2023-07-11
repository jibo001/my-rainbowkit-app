import BigNumber from 'bignumber.js'
import { env } from 'config/env'
import { getErc20Contract } from 'utils/contractHelpers'
import { Address, useAccount, useContractRead } from 'wagmi'

/**
 * @params token erc20 token address
 * @params spender spender address
 * @return isVaultApproved 是否授权
 * @return allowance 授权额度
 * @return setLastUpdated 更新授权额度
 */
export const useTokenApprovalStatus = (token: Address, spender: Address) => {
  const { address: account } = useAccount()
  const chainId = env.chainId

  const { data, refetch } = useContractRead({
    chainId,
    ...getErc20Contract(token),
    enabled: Boolean(account && spender && token),
    functionName: 'allowance',
    args: [account!, spender],
    watch: true,
  })

  return {
    isVaultApproved: data! > 0,
    allowance: new BigNumber(data!?.toString()),
    setLastUpdated: refetch,
  }
}

export default useTokenApprovalStatus
