import React, { useState } from 'react'
import { connectWallet, checkIfWalletIsConnected } from './utils'
import { MintingPage } from './pages'

const App = () => {
  const [walletAddress, setWalletAddress] = useState("")
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const connectWalletButton = async () => {
    try {
      const address = await connectWallet();
      setWalletAddress(address)
      setIsWalletConnected(checkIfWalletIsConnected())
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='font-rubik flex flex-col min-h-screen bg-black mt-36'>
      <div className='flex flex-col items-center justify-center'>
          {isWalletConnected ? (
            <MintingPage walletAddress={walletAddress} />
          ) : (
            <button onClick={connectWalletButton} className='bg-[#E5E5E5] hover:bg-gray-400 px-10 py-2'>
              <h1 className='font-bold'>
                Connect Wallet
              </h1>
            </button>
          )}
        </div>
    </div>
  )
}

export default App