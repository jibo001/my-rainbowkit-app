// add 10%
export function calculateGasMargin(value: bigint, margin: bigint): bigint {
  return (value * (10000n + margin)) / 10000n
}