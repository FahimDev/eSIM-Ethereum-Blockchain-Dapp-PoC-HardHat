/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

// Index: 3 || Address: 0xC7dC9Fa47563985AC25445D2697e964315460868
const GANACHE_PRIVATE_KEY = "ac47c7d4cabfc6b63ab9d6836785d44cf4d5e36e273f8c8abc6fcc02873dcbf9";
const GANACHE_URL = "http://localhost:7545";
module.exports = {
  solidity: "0.7.3",
  networks: {
    localganache: {
      url: GANACHE_URL,
      accounts: [`0x${GANACHE_PRIVATE_KEY}`],
    },
  },
};
