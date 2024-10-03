import { useState, useEffect } from "react"
import { stringToUint8Array, toHex } from "../utils"
import Blake2b from "./Blake2b"

export const Blake2bHasher: React.FC<{
  value: string
}> = ({ value }) => {
  const [encryptedValue, setEncryptedValue] = useState<string>("")
  const [calculationTime, setCalculationTime] = useState(0)
  const [outputLen, setOutputLen] = useState(64)
  const [key, setKey] = useState("")

  useEffect(() => {
    if (outputLen <= 0 || outputLen > 64) return
    const startTime = performance.now()

    const blake = new Blake2b(outputLen, stringToUint8Array(key))
    blake.update(stringToUint8Array(value))

    const hashed = blake.digest()
    const endTime = performance.now()
    if (hashed) {
      setEncryptedValue(toHex(hashed))
      setCalculationTime(endTime - startTime)
    }
  }, [value, outputLen, key])

  return (
    <div className="flex flex-col my-5">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col w-fit">
          <label className="text-sm" htmlFor="blake2b-outputlen">
            outlen
          </label>
          <input
            id="blake2b-outputlen"
            className="border-[1px] rounded p-1"
            placeholder=""
            value={outputLen}
            onChange={(event) => {
              const num = Number(event.target.value)
              if (!isNaN(num)) setOutputLen(num)
            }}
          />
        </div>
        <div className="flex flex-col w-fit">
          <label className="text-sm" htmlFor="blake2b-key">
            key
          </label>
          <input
            id="blake2b-key"
            className="border-[1px] rounded  p-1"
            placeholder="For keyed hashes"
            value={key}
            onChange={(event) => {
              setKey(event.target.value)
            }}
          />
        </div>
      </div>
      <h3>Output</h3>
      <span className="text-wrap break-all text-gray-400">
        {encryptedValue}
      </span>
      <span>Time taken = {calculationTime} ms</span>
    </div>
  )
}
