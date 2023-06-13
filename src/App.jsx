import React, { useState } from 'react'
import { connectWallet, checkIfWalletIsConnected } from './utils'

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
    <div className='bg-black min-h-screen'>
      <div className='flex flex-col items-center justify-center'>
        <button onClick={connectWalletButton} className='bg-[#E5E5E5] hover:bg-gray-400 hover: px-10 py-2'>
            <h1 className='font-bold'>
              Connect Wallet
            </h1>
        </button>

        <div className='text-white'>
          {isWalletConnected ? (
            <h1>{walletAddress}</h1>
          ) : (
            <h1>Not connected</h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default App