// add gas 10%
export function calculateGasMargin(value: bigint, margin: bigint): bigint {
  return (value * (10000n + margin)) / 10000n
}

/**
 * @return {number} current time in seconds
 */
export const getNow = (): number => Math.floor(Date.now() / 1000)