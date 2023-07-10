import { ChainId } from 'config/constants/chainId'
import addresses from 'config/constants/contracts'
import { env } from 'config/env';

export interface Addresses {
  [chainId: number]: `0x${string}`
}

export const getAddressFromMap = (address: Addresses, chainId: number = env.chainId): `0x${string}` => {
  return address[chainId] ? address[chainId] : address[ChainId.BSC]
}

export const getIdoStakeAddress = (chainId: number = env.chainId) => {
  return getAddressFromMap(addresses.idoStake, chainId)
}
