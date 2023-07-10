import { useCallback } from 'react'
import {
  Abi,
  Account,
  Address,
  CallParameters,
  Chain,
  GetFunctionArgs,
  Hash,
  InferFunctionName,
  WriteContractParameters,
  zeroAddress,
} from 'viem'
import { EstimateContractGasParameters } from 'viem/dist/types/actions/public/estimateContractGas'
import { useWalletClient } from 'wagmi'
import { SendTransactionResult } from 'wagmi/actions'
import { calculateGasMargin } from 'utils'
import { publicClient } from 'config/wagmi'
import { env } from 'config/env'
import { Toast } from 'antd-mobile'

export function useCallWithGasPrice() {
  const chainId = env.chainId
  const { data: walletClient } = useWalletClient()
  const callWithGasPriceWithSimulate = useCallback(
    async <
      TAbi extends Abi | unknown[],
      TFunctionName extends string = string,
      _FunctionName = InferFunctionName<TAbi, TFunctionName>,
      Args = TFunctionName extends string
      ? GetFunctionArgs<TAbi, TFunctionName>['args']
      : _FunctionName extends string
      ? GetFunctionArgs<TAbi, _FunctionName>['args']
      : never,
    >(
      contract: { abi: TAbi; account: Account; chain: Chain; address: Address },
      functionName: InferFunctionName<TAbi, TFunctionName>,
      methodArgs?: Args extends never ? undefined : Args,
      overrides?: Omit<CallParameters, 'chain' | 'to' | 'data'>,
    ): Promise<SendTransactionResult> => {
      const gas = await publicClient({ chainId }).estimateContractGas({
        abi: contract.abi,
        address: contract.address,
        account: walletClient!.account,
        functionName: functionName,
        args: methodArgs,
        value: 0n,
        ...overrides,
      } as unknown as EstimateContractGasParameters)
      let res: Hash = zeroAddress
      try {
        res = await walletClient!.writeContract({
          abi: contract.abi,
          address: contract.address,
          account: walletClient!.account,
          functionName: functionName,
          args: methodArgs,
          gas: calculateGasMargin(gas),
          value: 0n,
          ...overrides,
        } as unknown as WriteContractParameters)
      } catch (e) {
        console.log(e);

        // Toast(e.message)
      }

      const hash = res

      return {
        hash,
      }
    },
    [chainId, walletClient],
  )

  return { callWithGasPrice: callWithGasPriceWithSimulate }
}
