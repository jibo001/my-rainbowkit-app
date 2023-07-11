export interface ExtendEthereum extends WindowProvider {
  isSafePal?: true
  isCoin98?: true
  isBlocto?: true
  isMathWallet?: true
  isTrustWallet?: true
  isBlocto?: true
  chainId: `0x${string}`
  isMetaMask?: boolean
  isTrust?: boolean
  isCoinbaseWallet?: boolean
  isTokenPocket?: boolean
  request: (args: { method: string; params?: unknown }) => Promise<unknown>

}

declare global {
  interface Window {
    ethereum?: ExtendEthereum
  }
}
