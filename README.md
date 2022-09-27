# eSIM Ethereum Blockchain Dapp PoC HardHat

**A PoC Project on Public Blockchain Network**

[![framework]][bs23]
[![project-name]][bs23]
[![web-type]][bs23]

Full video presentation by IBM is available at [Youtube][ibm-video].

---

# Abstract

This project is a PoC-level public blockchain technology-based solution on eSIM. This project will cover a basic overview of eSIM functionality scopes. Generally, we will cover the Administration level eSIM token distribution according to the imported/manufactured phone's IMEI number at the telecommunications service provider level. Then we will cover this telecommunication operator handling these tokens nationally and globally at the consumer level. Here we will also cover how the operators will take cross-service provider operations with a single pass. Then we will cover how the IoT devices interact with the device owners, how their networks are operating with the eSIM, and how a single owner of multiple IoT devices can be identified with a web3 token with Fractional Ownership and can gain gas cost efficiency.

---

# Installation

First create the local environment and initialize the node package manager.

Install `node package manager`

    npm install 


Setup the environment using `npm` ...

    npm init –yes​

Installing `HardHat`: Ethereum development environment.

**Note**: *[Some issues at latest version][hardhat-version-issue]*

    npm install --save-dev hardhat@2.9.9​

View the HardHat instructions:​
    npx hardhat

Install testing component
*(https://nomic.foundation/)*:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai

Add all dependencies to your environment by using:

    npm install

---

# Operational Commands

This command will compile `Solidity` Contract files into `JSON` file:

    npx hardhat compile

This command will execute the scripts of unit test:

    ​npx hardhat test

This command will deploy the network at Hardhat local network.​

    npx hardhat deploy scripts/deploy.js​

To test the network with `Ropsten` and `Alchemy` API

    npx hardhat deploy scripts/deploy.js --network ropsten




# Cite:
* https://docs.soliditylang.org/en/v0.8.17/introduction-to-smart-contracts.html#the-ethereum-virtual-machine
* https://hardhat.org/hardhat-runner/docs/getting-started#overview
* https://docs.openzeppelin.com/contracts/3.x/erc1155
* https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
* https://github.com/Tahmeed156/property-dapp/blob/master/src/contracts/Registry.sol
* https://nomic.foundation/
* https://www.youtube.com/watch?v=T9kYuBcOnjI
* https://ensarseker1.medium.com/is-more-secure-and-stable-communication-possible-by-using-blockchain-technology-for-esim-b99225ec4675
* https://github.com/NomicFoundation/hardhat/issues/3201


[hardhat-version-issue]: https://github.com/NomicFoundation/hardhat/issues/3201
[ibm-video]: https://www.youtube.com/watch?v=T9kYuBcOnjI/
[bs23]: https://brainstation-23.com/?bc
[project-name]: https://img.shields.io/badge/project-eSim-yellowgreen
[web-type]: https://img.shields.io/badge/technology-blockchain-green
[framework]: https://img.shields.io/badge/framework-ethereum%20-blue
