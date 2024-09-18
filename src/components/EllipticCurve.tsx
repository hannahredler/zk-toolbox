import { Point, Base8, inCurve } from "@zk-kit/baby-jubjub"
import { F1Field } from "@zk-kit/utils"
import { formatLargeNumber, formatPoint } from "../utils/bigint"
import { useState } from "react"

export const EllipticCurve = () => {
  const [x, setX] = useState(0n)
  const [y, setY] = useState(1n)
  // Definition of the babyjubjub curve
  const a = 168700n
  const d = 168696n
  const r =
    21888242871839275222246405745257275088548364400416034343698204186575808495617n

  const field = new F1Field(r)
  const isValid = inCurve([x, y])

  const setPoints = (point: Point) => {
    setX(BigInt(point[0]))
    setY(BigInt(point[1]))
  }

  return (
    <div className="flex flex-col gap-2 max-w-md">
      <h1>
        <a
          href="https://eips.ethereum.org/EIPS/eip-2494"
          target="_blank"
          className="underline"
        >
          Baby JubJub Elliptic Curve
        </a>
      </h1>
      <div className="text-gray-400 flex flex-col">
        <span>ax^2 + y^2 = 1 + dx^2y^2</span>
        <span>where</span>
        <span>a = {field.e(a).toString()}</span>
        <span>d = {field.e(d).toString()}</span>
        <span>in a finite field of size {formatLargeNumber(r)}</span>
      </div>
      <div>
        <div>Choose a point:</div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-1">
            <label>x</label>
            <input
              type="text"
              className="p-2 border rounded flex-1"
              placeholder="Set x"
              value={x.toString()}
              onChange={(evt) => {
                let num = BigInt(evt.target.value)

                if (num !== null) setX(num)
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>y</label>
            <input
              type="text"
              className="p-2 border rounded flex-1"
              placeholder="Set y"
              value={y.toString()}
              onChange={(evt) => {
                let num = BigInt(evt.target.value)

                if (num !== null) setY(num)
              }}
            />
          </div>
        </div>
        <div className="text-gray-400 my-2 ">
          {isValid ? (
            <span className="">{`The point ${formatPoint([
              x,
              y,
            ])} is a valid point on the curve`}</span>
          ) : (
            <div>
              <span className="my-2">{`The point ${formatPoint([
                x,
                y,
              ])} is not a valid point. Enter a different point, or select from one of these known points:`}</span>
              <div className="flex flex-row gap-2 my-2">
                <button
                  className="border border-neon rounded-lg p-2 w-20"
                  onClick={() => setPoints([0n, 1n])}
                >
                  [0,1]
                </button>
                <button
                  className="border border-neon rounded-lg p-2 w-20"
                  onClick={() => setPoints(Base8)}
                >
                  Base 8
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
