import { Chain } from 'viem'
import {
  bsc,
  bscTestnet,
  mainnet,
  arbitrum,
  arbitrumGoerli
} from 'wagmi/chains'


export const chainMap: Record<number, Chain> = {
  56: bsc,
  97: bscTestnet,
  1: mainnet,
  42161: arbitrum,
  421613: arbitrumGoerli
}

