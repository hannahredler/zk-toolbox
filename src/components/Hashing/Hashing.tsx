import { useState } from "react"

import { SupportedAlgorithm } from "./utils"
import { Blake2bHasher } from "./Blake2b/Blake2bHasher"
import { Blake2sHasher } from "./Blake2s/Blake2sHasher"

export function Hashing() {
  const [value, setValue] = useState<string>("")

  const [algorithm, setSelectedAlgorithm] = useState<SupportedAlgorithm>(
    SupportedAlgorithm.Blake2b
  )

  return (
    <div className="max-w-lg flex flex-col">
      <h1 className="pb-2">Hash Functions</h1>
      <div>
        <h2 className="text-sm py-2">Choose hash function</h2>
        <div className="gap-2">
          {Object.keys(SupportedAlgorithm).map((id) => {
            const isSelected = id === algorithm

            return (
              <button
                key={id}
                className={`text-sm border-[1px] border-neon p-1 rounded" ${
                  isSelected ? "bg-neon text-black" : ""
                }`}
                onClick={() => setSelectedAlgorithm(id as SupportedAlgorithm)}
              >
                {id}
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

      {algorithm === "Blake2b" && <Blake2bHasher value={value} />}
      {algorithm === "Blake2s" && <Blake2sHasher value={value} />}
    </div>
  )
}
