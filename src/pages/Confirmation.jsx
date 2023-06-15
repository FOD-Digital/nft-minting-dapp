import React from 'react'
import truncateEthAddress from 'truncate-eth-address'
import Ordinary from '../assets/Ordinary.png'
import Prestige from '../assets/Prestige.png'

export const Confirmation = ({transactionHash, quantity, rarity}) => {
  return (
      <div className='flex flex-col items-center justify-center max-w-[800px]'>
          <h1 className='text-white text-4xl font-bold'>
              Thank you for supporting Genesis<span className='text-[#DD2643]'>.</span>
          </h1>
          
          <div className='flex flex-row items-center justify-center gap-48 mt-16'>
              <div className='flex flex-col items-left justify-start gap-2 text-white'>
                <p>Transaction Hash</p>
                <p>Contract Address</p>
                <p>Quantity</p>
                <p>Token Standard</p>
                <p>Blockchain</p>
                <p>Total Spent</p>
              </div>

              <div className='flex flex-col items-end justify-end gap-2 text-white'>
                <a href={`https://goerli.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
                  <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#E22028] to-[#A1287D] animate-text'>{truncateEthAddress(transactionHash)}</p>
                </a>
                
                <p>{truncateEthAddress('0x0A0C24E401DccF48a294B5F21943C1EDAA816A2e')}</p>
                <p>{quantity}</p>
                <p>ERC-1155</p>
                <p>Goerli</p>
                <p>{(quantity * 0.000001)} ETH</p>
              </div>
          </div>

          <div className='mt-16'>
            {rarity == "0" ? (
              <div className='flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-[#E22028] to-[#A1287D] bg-clip-text text-transparent animate-text mb-5'>
                  PRESTIGE PACK
                </h1>
                <img 
                  src={Prestige}
                  className='w-80 h-80 rounded-lg shadow-2xl'
                />
              </div>
              
            ) : (
              <div className='flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-[#E22028] to-[#A1287D] bg-clip-text text-transparent animate-text mb-5'>
                  ORDINARY PACK
                </h1>
                <img 
                  src={Ordinary}
                  className='w-80 h-80'
                />
              </div>
            )} 
          </div>
      </div>
  )
}

export default Confirmation