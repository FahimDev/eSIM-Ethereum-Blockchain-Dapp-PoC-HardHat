/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

// Index: 0 || Address: 0x749419010e663b7d8C9afc367dA28F3B3Dd68F2f
const GANACHE_PRIVATE_KEY =
  "8773c846046abbae1b6e26013f055132a7cebfc023a6bb38c478b41e48ada122";
const GANACHE_URL = "http://172.25.224.1";
const GANACHE_PORT = 7545;
const GANACHE_NETWORK_ID = 5777; // Internal blockchain identifier of Ganache server.
module.exports = {
  solidity: "0.7.3",
  networks: {
    // Ref: https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard/#usage-with-non-truffle-tooling
    ganache: {
      /**
       * If you are running your Hardhat at WSL2 make sure you have changed
       * your SERVER settings from your Ganache GUI (Windows environment).
       *
       * Change the HOSTNAME to `172.25.224.1 - vEthiernet(WSL)` and Restart Ganache
       */
      url: `${GANACHE_URL}:${GANACHE_PORT}`,
      accounts: [`0x${GANACHE_PRIVATE_KEY}`],
    },
  },
};
