import { useState, useEffect } from "react"
import Blake2b from "./Blake2b"
import Blake2s from "./Blake2s"

const hashingMap = {
  blake2b: {
    text: "blake 2b",
  },
  blake2s: {
    text: "blake 2s",
  },
} as const
type SupportedAlgorithm = keyof typeof hashingMap

function toHex(bytes: Uint8Array) {
  return Array.prototype.map
    .call(bytes, function (n) {
      return (n < 16 ? "0" : "") + n.toString(16)
    })
    .join("")
}

export function Hashing() {
  const [value, setValue] = useState<string>("")

  const [algorithm, setSelectedAlgorithm] =
    useState<SupportedAlgorithm>("blake2b")

  const [encryptedValue, setEncryptedValue] = useState<string>("")

  const [calculationTime, setCalculationTime] = useState(0)

  const hashInput = (input: string, algorithm: SupportedAlgorithm) => {
    if (!input || input.length < 2) return
    let engine

    console.log("input", input, algorithm)
    if (algorithm === "blake2b") {
      engine = new Blake2b()
    } else {
      engine = new Blake2s()
    }

    const encoder = new TextEncoder()

    engine.update(Uint8Array.from(encoder.encode(input)))
    return engine.digest()
  }

  useEffect(() => {
    const startTime = performance.now()
    const hashed = hashInput(value, algorithm)
    const endTime = performance.now()
    if (hashed) {
      setEncryptedValue(toHex(hashed))
      setCalculationTime(endTime - startTime)
    }
  }, [value, algorithm])

  return (
    <div className="max-w-lg flex flex-col">
      <h1 className="pb-2">Hash Functions</h1>
      <div>
        <h2 className="text-sm py-2">Choose hash function</h2>
        <div className="gap-2">
          {Object.entries(hashingMap).map(([id, { text }]) => {
            const isSelected = id === algorithm

            return (
              <button
                key={id}
                className={`text-sm border-[1px] border-neon p-1 rounded" ${
                  isSelected ? "bg-neon text-black" : ""
                }`}
                onClick={() => setSelectedAlgorithm(id as SupportedAlgorithm)}
              >
                {text}
              </button>
            )
          })}
        </div>
      </div>
      <input
        className="border-[1px] rounded border-neon p-1"
        placeholder="Type input here"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <h3>Output</h3>
      <span className="text-wrap break-all text-gray-400">
        {encryptedValue}
      </span>
      <span>Time taken = {calculationTime} ms</span>
    </div>
  )
}
