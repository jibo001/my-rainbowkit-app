import { Contract, ContractInterface } from "@ethersproject/contracts";
import { ChainId } from "config/constants/chainId";
import { Providers } from "config/providers";
import { useMemo } from "react";
import { getIdoStakeContract } from "utils/contractHelpers";
import { WalletClient, useWalletClient } from "wagmi";




export const useBunnyFactory = () => {
  const { data: signer } = useWalletClient()
  return useMemo(() => getIdoStakeContract(signer as WalletClient), [signer])
}

