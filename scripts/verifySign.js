const fs = require("fs");
const { getDeployedPath } = require("./common/file");
const { getInstance } = require("./common/contract");
const { getWallet } = require("./common/wallet");
const ContractAddress = require("../deployedContractAddress.json");
const ganacheTestSignV4 = require("../ganacheTestSignV4.json");

async function main() {

  const adminWallet = getWallet();
  const verifyContract = getInstance(
    ContractAddress.genesisContract,
    adminWallet
  );
  let message = ganacheTestSignV4.message;
  let weightedVector = {};
  weightedVector.title = message.title;
  weightedVector.brand = message.brand;
  weightedVector.signature = ganacheTestSignV4.signature;
  console.log({ weightedVector });
  let tx = await verifyContract.mySigTest(weightedVector);
  console.log({ tx });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
