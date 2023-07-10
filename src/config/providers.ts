import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { ChainId } from "./constants/chainId";
import { RPC } from "./constants/rpc";
import { env } from "./env";
export class Providers {
  private static _providerCache = {} as Record<ChainId, StaticJsonRpcProvider>;

  /**
   * Returns a provider url for a given network
   */
  public static getProviderUrl(chainId: ChainId = env.chainId) {
    const [url] = RPC.getNodeUrls(chainId) as string[];
    return url;
  }

  /**
   * Returns a static provider for a given network
   */
  public static getStaticProvider(chainId: ChainId) {
    if (!this._providerCache[chainId])
      this._providerCache[chainId] = new StaticJsonRpcProvider(this.getProviderUrl(chainId));

    return this._providerCache[chainId];
  }
}
