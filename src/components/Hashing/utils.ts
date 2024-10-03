import Blake2b from "./Blake2b/Blake2b"
import Blake2s from "./Blake2s/Blake2s"

export enum SupportedAlgorithm {
  Blake2b = "Blake2b",
  Blake2s = "Blake2s",
}

export function toHex(bytes: Uint8Array) {
  return Array.prototype.map
    .call(bytes, function (n) {
      return (n < 16 ? "0" : "") + n.toString(16)
    })
    .join("")
}

export const hashInput = (input: string, algorithm: SupportedAlgorithm) => {
  if (!input || input.length < 2) return
  let engine

  if (algorithm === "Blake2b") {
    engine = new Blake2b()
  } else {
    engine = new Blake2s()
  }

  engine.update(stringToUint8Array(input))
  return engine.digest()
}

export const stringToUint8Array = (str: string) => {
  const encoder = new TextEncoder()
  return Uint8Array.from(encoder.encode(str))
}
