// npx hardhat run scripts/getSigner.js --network goerli
const fs = require("fs");
const { getDeployedPath } = require("./common/file");
const { getInstance } = require("./common/contract");
const { getWallet } = require("./common/wallet");
const ContractAddress = require("../../json-log/deployedContractAddress.json");
const ganacheTestSignV4 = require("../../json-log/ganacheTestSignV4.json");

async function main() {

  const adminWallet = getWallet();
  const verifyContract = getInstance(
    ContractAddress.genesisContract,
    adminWallet
  );
  
  let signerAddress = await verifyContract.getSigner();
  console.log({ signerAddress });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
