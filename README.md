# eSIM Ethereum Blockchain Dapp PoC HardHat

**A PoC Project on Public Blockchain Network**

[![framework]][bs23]
[![project-name]][bs23]
[![web-type]][bs23]

Full video presentation by IBM is available at [Youtube][ibm-video].

---

# Abstract

This project is a PoC-level public blockchain technology-based solution on eSIM. This project will cover a basic overview of eSIM functionality scopes. Generally, we will cover from the Administration level, in which eSIM identity will be tokenized and distributed according to the imported/manufactured phone's IMEI number. Then we will cover from the telecommunication mobile network operator's perspective. Where network operator's MNO-Communication-Profile can be easily managed from the consumer level by mapping with the eSIM identity. In here we can manage an immutable ledger of Consumer's mobile network switching records to keep track of security and monetary purpose. After that, we will cover how the IoT devices interact with the device owners (Consumer SIM and M2M SIM), how their networks are operating with the eSIM, and how a single owner of multiple IoT devices can be identified with a web3 token with Fractional Ownership with maximum gas cost efficiency.

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

To test the network with `Ganache`

    npx hardhat run ./scripts/deploy.js --network ganache

To test the network with `Ropsten` and `Alchemy` API

    npx hardhat deploy scripts/deploy.js --network ropsten


# Dapp with NextJS

For creating a new Next.js app I am using create-next-app, which sets up everything automatically for us. To create a project, run:

    ​npx create-next-app@latest --typescript

After the installation is complete, to start the development server on `http://localhost:3000` run the given command:

    ​npm run dev

To ensure the security in three individual tires I am using API in the middle of our Blockchain ecosystem and Front-end. And to ensure security I am introducing `JWT` in our API layer.

    npm i jsonwebtoken

To use `JWT` in type-specific, this package contains type definitions for JSON web token

    npm install --save @types/jsonwebtoken --save-dev





# Guide

For coding style and conventions we will follow the [official Solidity style guide][solidity-style-guide].

# Cite:

* https://docs.soliditylang.org/en/v0.8.17/introduction-to-smart-contracts.html#the-ethereum-virtual-machine
* https://hardhat.org/hardhat-runner/docs/getting-started#overview
* https://docs.openzeppelin.com/contracts/3.x/erc1155
* https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts
* https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
* https://github.com/Tahmeed156/property-dapp/blob/master/src/contracts/Registry.sol
* https://nomic.foundation/
* https://nextjs.org/docs
* https://www.youtube.com/watch?v=T9kYuBcOnjI
* https://ensarseker1.medium.com/is-more-secure-and-stable-communication-possible-by-using-blockchain-technology-for-esim-b99225ec4675
* https://github.com/NomicFoundation/hardhat/issues/3201
* https://www.gemini.com/cryptopedia/what-is-a-liquidity-pool-crypto-market-liquidity
* https://docs.soliditylang.org/en/v0.8.14/style-guide.html
* https://hackernoon.com/hacking-solidity-contracts-using-txorigin-for-authorization-are-vulnerable-to-phishing
* https://cryptomarketpool.com/data-types-in-solidity-smart-contracts/
* https://medium.com/coinmonks/gas-optimization-in-solidity-part-i-variables-9d5775e43dde
* https://www.npmjs.com/package/jsonwebtoken
* https://www.npmjs.com/package/@types/jsonwebtoken

[solidity-style-guide]: https://docs.soliditylang.org/en/v0.8.14/style-guide.html
[hardhat-version-issue]: https://github.com/NomicFoundation/hardhat/issues/3201
[ibm-video]: https://www.youtube.com/watch?v=T9kYuBcOnjI/
[bs23]: https://brainstation-23.com/?bc
[project-name]: https://img.shields.io/badge/project-eSim-yellowgreen
[web-type]: https://img.shields.io/badge/technology-blockchain-green
[framework]: https://img.shields.io/badge/framework-ethereum%20-blue
