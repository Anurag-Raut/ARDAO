require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const MRPC = process.env.RPC_URL;
const SEPOLIA_RPC=process.env.SEPOLIA_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    mumbai:{
      url:'https://rpc.ankr.com/polygon_mumbaiy',
      accounts:[PRIVATE_KEY]
    }
    , sepolia:{
      url:'https://ethereum-sepolia.blockpi.network/v1/rpc/public',
      accounts:[PRIVATE_KEY],
     
    }
   
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};