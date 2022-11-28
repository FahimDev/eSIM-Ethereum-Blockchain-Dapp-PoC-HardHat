const { ethers, providers } = require('ethers')
require('dotenv').config()


const NETWORK = "" // process.env.NETWORK || 'ganache'
const INFURA_KEY = "" // process.env.INFURA_KEY || ''
const PRIVATE_KEY = `0x${process.env.GANACHE_PRIVATE_KEY}` // process.env.PRIVATE_KEY || ''
const MUMBAI_RPC_URL = "" // process.env.MUMBAI_RPC_URL || ''
const POLYGON_RPC_URL = "" // process.env.POLYGON_RPC_URL || ''

const URL = () => {
    return `${process.env.GANACHE_URL}:${process.env.GANACHE_PORT}`
}

const provider = new providers.JsonRpcProvider(URL())
 
const createWalletFromPK = () => {
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
    return wallet
}
 
const getWallet = () => {
    return createWalletFromPK()
}

module.exports = {createWalletFromPK, getWallet}