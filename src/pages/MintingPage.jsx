import React, { useState } from 'react'
import Ordinary from '../assets/Ordinary.png'
import Prestige from '../assets/Prestige.png'
import { mintNFT } from '../utils'
import { Confirmation } from './Confirmation'

const MintingPage = ({walletAddress}) => {

  const [inputValue, setInputValue] = useState({
    packQuantity : 1
  });

  const [isMinting, setIsMinting] = useState(false)
  const [transactionHash, setTransactionHash] = useState("")
  const [nftRarity, setNftRarity] = useState("")
  const [isMinted, setIsMinted] = useState(false)

  const handleInputChange = (event) => {
    setInputValue(prevFormData => ({ ...prevFormData, [event.target.name]: event.target.value }));
  }

  const mintNftButton = async () => {
    try {
        setIsMinting(true)
        const mint = await mintNFT(inputValue.packQuantity, ((0.000001 * inputValue.packQuantity).toFixed(6).toString()), walletAddress)

        if (mint.success) {
            alert("Minted!")
            setTransactionHash(mint.hash)
            setNftRarity(mint.rarity)
            setIsMinted(mint.success)
            setIsMinting(false)

            console.log("Minted:", mint)
        }
    } catch (error) {
        alert(error)
    }
  }

  return (
   <div className='flex flex-col items-center justify-center max-w-[800px]'>
        {isMinted ? (
            <div className='flex flex-col items-center justify-center max-w-[800px]'>
                <h1 className='text-white text-5xl font-bold'>
                    Complete Checkout<span className='text-[#DD2643]'>.</span>
                </h1>
                <h2 className='text-white font-light'>
                    0.000001 per ordinary / prestige NFT Pack.  Mystery box
                </h2>
            

                <div className='flex flex-row gap-2 mt-16 w-full'>
                    <h1 className='text-white'>
                        Choose NFT pack quantity : 
                    </h1>
                    <input 
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        name="packQuantity"
                        value={inputValue.packQuantity}
                        onChange={handleInputChange}
                        className="text-[20px] font-thin bg-red rounded-lg text-black w-full h-12 outline-none" 
                    />

                    <h1 className='text-white'>
                        <span className='font-bold'>{inputValue.packQuantity}</span> NFT Packs
                    </h1>
                </div>


                <div className="flex flex-col items-center justify-center w-full mt-16">
                    <table className="table-auto min-w-full">
                        <thead className="text-white">
                            <tr>
                                <th className="px-4 py-2">Item</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Price (ETH)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="flex flex-row items-center justify-start gap-4 px-4 py-2">
                                    <img
                                        src={Ordinary}
                                        className='w-20 h-20'
                                    />
                                    <h1 className='text-white'>Fod Genesis Regular Pack</h1>
                                </td>
                                <td className="text-white px-4 py-2">{inputValue.packQuantity} Packs</td>
                                <td className="text-white px-4 py-2">{(0.000001 * inputValue.packQuantity).toFixed(6)}</td>
                            </tr>
                            <h1 className=' text-white text-[20px] p-12 ml-48'>
                                🎁 You will either get {inputValue.packQuantity} regular packs or {inputValue.packQuantity} prestige packs
                            </h1>

                            <tr>
                                <td className="flex flex-row items-center justify-start gap-4 px-4 py-2">
                                    <img
                                        src={Prestige}
                                        className='w-20 h-20'
                                            
                                    />
                                    <h1 className='text-white'>Fod Genesis Prestige Pack</h1>
                                </td>
                                <td className="text-white px-4 py-2">{inputValue.packQuantity} Packs</td>
                                <td className="text-white px-4 py-2">{(0.000001 * inputValue.packQuantity).toFixed(6)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div className='flex items-center justify-center mt-16'>
                    {isMinting ? (
                        <div className='flex flex-col items-center justify-center'>
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-400 mt-5"></div>
                        </div>
                        
                    ) : (
                        <button onClick={() => mintNftButton()} className='px-10 py-2 rounded-full bg-gradient-to-r from-[#E22028] to-[#A1287D] hover:animate-bounce'>
                                <h1 className='text-white'>
                                    Buy {inputValue.packQuantity} Genesis Packs
                                </h1>
                        </button>
                    )}
                </div>
            </div>

        ) : (
            <div>
                <Confirmation transactionHash={transactionHash} quantity={inputValue.packQuantity} rarity={nftRarity} />
            </div>
            
        )}
   </div>
  )
}

export default MintingPage
