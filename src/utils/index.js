import abi from '../constants/FODNFT.json'
import { ethers } from 'ethers'

const contractAddress = '0x05DA86E5eF89986A6ac77C4c3C944bD8a7865b12' 
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