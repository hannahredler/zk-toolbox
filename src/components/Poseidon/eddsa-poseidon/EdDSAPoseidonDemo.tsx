import { useState } from "react"
import {
  deriveSecretScalar,
  derivePublicKey,
  signMessage,
  packPublicKey,
} from "@zk-kit/eddsa-poseidon"
import { formatLargeNumber } from "../../../utils/bigint"

export const EdDSAPoseidonDemo = () => {
  const [privateKey, setPrivateKey] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  console.log("public key", derivePublicKey(privateKey))
  console.log("secret scalar", deriveSecretScalar(privateKey))

  const publicKey = derivePublicKey(privateKey)

  const signedMessage = signMessage(privateKey, message)

  console.log(formatLargeNumber(1011n))
  return (
    <div className="flex flex-col gap-2 max-w-md ">
      <h2>EdDSA Poseidon Hash</h2>
      <div className="flex flex-col text-sm gap-1">
        <label>Private key</label>
        <input
          type="text"
          className="p-2 border rounded flex-1"
          placeholder="Enter a private key"
          value={privateKey}
          onChange={(evt) => setPrivateKey(evt.target.value)}
        />
        <span className="text-red-700">
          This is for testing purposes only. Do not enter any real public keys.
        </span>
      </div>
      <div className="flex flex-col w-fullp">
        <span className="text-sm">Secret Scalar</span>
        <span className="text-wrap break-all text-gray-400">
          {deriveSecretScalar(privateKey).toString()}
        </span>
      </div>
      <div className="flex flex-col w-full ">
        <span className="text-sm">Public Key (Point on elliptic curve)</span>
        <span className="text-wrap break-all text-gray-400">
          {`[${publicKey[0]}, ${publicKey[1]}]`}
        </span>
        <span className="text-sm">Packed Public Key</span>
        <span className="text-wrap break-all text-gray-400">
          {packPublicKey(publicKey).toString()}
        </span>
      </div>
      <div className="flex flex-col text-sm gap-1">
        <label>Enter a secret message</label>
        <input
          type="text"
          className="p-2 border rounded flex-1"
          placeholder="message"
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <span>Signed Message</span>
        <div className="text-gray-400 flex flex-col">
          <span>
            R8 Point:
            {`(${formatLargeNumber(signedMessage.R8[0])}, ${formatLargeNumber(
              signedMessage.R8[1]
            )})`}
          </span>
          <span>
            S:
            {formatLargeNumber(signedMessage.S)}
          </span>
        </div>
      </div>
    </div>
  )
}
