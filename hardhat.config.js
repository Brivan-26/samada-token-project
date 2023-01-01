require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.INFURA_GORLI_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
