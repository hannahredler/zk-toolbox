import { EdDSAPoseidonDemo } from "./components/Poseidon/eddsa-poseidon/EdDsaPoseidonDemo"

function App() {
  return (
    <div className="w-full flex flex-col items-center justify-start bg-black min-h-vh text-neon">
      <div className="flex flex-col items-center justify-center w-full h-30 py-5 text-lg">
        <span>ZK-Toolbox</span>
        <span className="text-sm">A set of tools for zk developers</span>
      </div>
      <div className="border-[1px] border-neon rounded-md p-3">
        <EdDSAPoseidonDemo />
      </div>
    </div>
  )
}

export default App
