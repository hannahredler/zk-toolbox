import { Point } from "@zk-kit/baby-jubjub"

export const abs = (num: bigint) => (num < 0 ? -num : num)

export function formatLargeNumber(num: bigint): string {
  if (num === 0n) return "0"

  const absVal = abs(num)

  let exponent = 0
  let base = absVal

  while (base >= 1000n) {
    base /= 10n
    exponent++
  }

  // Format to a fixed precision (e.g., 2 decimal places)
  const baseFixed = Number(base) / 100
  exponent += 2

  return `${baseFixed} × 10^${exponent}`
}

export function formatPoint(point: Point): string {
  const formattedX =
    BigInt(point[0]) > 1000n ? formatLargeNumber(BigInt(point[0])) : point[0]
  const formattedY =
    BigInt(point[1]) > 1000n ? formatLargeNumber(BigInt(point[1])) : point[1]

  return `[${formattedX}, ${formattedY}]`
}
