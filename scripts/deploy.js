/**
 * In our hardhat.config.js file we have menmtioned
 * one of our networks attribute name as `ganache`.
 * That is why we are usig that attribute name in our following
 * command: npx hardhat run ./scripts/deploy.js --network ganache
 * But we can use multiple network attributes to deploy in different networks also.
 */

const { ethers } = require("hardhat");

async function main() {
  // JS Structure passed as Solidity Struct data type
  // Also contributed to community: (1) https://ethereum.stackexchange.com/questions/120566/how-do-i-pass-in-an-array-of-struct-from-js-to-a-contract/137124#137124
  // (2) https://stackoverflow.com/questions/502366/structs-in-javascript/74002397#74002397
  var structJS = {
    id: 55,
    title: "Grameenphone",
    iccid: "56",
    msisdn: "17100000000",
    imsi: "12345",
  };
  // Ref: https://docs.openzeppelin.com/learn/deploying-and-interacting
  const GenesisContract = await ethers.getContractFactory("SIMTokenization");
  const USIMContract = await ethers.getContractFactory("USIM");
  const ESIMManagerContract = await ethers.getContractFactory(
    "EmbeddedSIMManager"
  );
  // Hardhat doesn’t keep track of your deployed contracts.
  // We displayed the deployed address in our script
  const genesisContract = await GenesisContract.deploy();
  const usimContract = await USIMContract.deploy(89, structJS);
  const esimManagerContract = await ESIMManagerContract.deploy(
    usimContract.address
  );
  // Checking Timeout and Smart Contract Timeout Status.
  await genesisContract.deployed();
  await usimContract.deployed();
  await esimManagerContract.deployed();
  console.log("Genesis deployed to: ", genesisContract.address);
  console.log("USIM deployed to: ", usimContract.address);
  console.log("ESIM deployed to: ", esimManagerContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
