import { useState, useEffect } from "react"
import { hashInput, SupportedAlgorithm, toHex } from "../utils"

export const Blake2sHasher: React.FC<{
  value: string
}> = ({ value }) => {
  const [encryptedValue, setEncryptedValue] = useState<string>("")
  const [calculationTime, setCalculationTime] = useState(0)

  useEffect(() => {
    const startTime = performance.now()
    const hashed = hashInput(value, SupportedAlgorithm.Blake2s)
    const endTime = performance.now()
    if (hashed) {
      setEncryptedValue(toHex(hashed))
      setCalculationTime(endTime - startTime)
    }
  }, [value])

  return (
    <div className="flex flex-col my-5">
      <h3>Output</h3>
      <span className="text-wrap break-all text-gray-400">
        {encryptedValue}
      </span>
      <span>Time taken = {calculationTime} ms</span>
    </div>
  )
}
