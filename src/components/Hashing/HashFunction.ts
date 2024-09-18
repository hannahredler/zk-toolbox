export interface HashFunction {
  update(input: Uint8Array): HashFunction
  digest(): Uint8Array
}
