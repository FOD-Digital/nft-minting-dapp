import abi from '../constants/FODNFT.json'
import { ethers } from 'ethers'

const contractAddress = '0x24FaD37baA07d79DfCcf19d8AA94E54edbC18EED' 
const contractABI = abi.abi
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const FOD_NFT_CONTRACT = new ethers.Contract(contractAddress, contractABI, signer);

export async function connectWallet() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0];

    return account
}

export async function checkIfWalletIsConnected() {
    if (typeof window.ethereum !== 'undefined') {
        return false
    } else {
        return true
    }
}

export async function mintNFT(quantity, nftPrice, walletAddress) {
    try {
        const mint = await FOD_NFT_CONTRACT.mintPack(quantity, {value: ethers.utils.parseEther(nftPrice)})
        await mint.wait()

        const rarity = await FOD_NFT_CONTRACT.getLastMintedRarity(walletAddress);

        return {
            rarity : rarity.toString(), 
            success: true,
            hash: mint.hash
        };
          
    } catch (error) {
        console.error(error)
        return false
    }
}
