/**
 * In our hardhat.config.js file we have menmtioned
 * one of our networks attribute name as `ganache`.
 * That is why we are usig that attribute name in our following
 * command: npx hardhat run ./scripts/deploy.js --network ganache
 * But we can use multiple network attributes to deploy in different networks also.
 */

const { ethers } = require("hardhat");

async function main() {
  const GenesisContract = await ethers.getContractFactory("SIMTokenization");
  const genesisContract = await GenesisContract.deploy();
  await genesisContract.deployed();
  console.log("Deployer Address: ", genesisContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
