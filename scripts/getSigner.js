const fs = require("fs");
const { getDeployedPath } = require("./common/file");
const { getPricingInstance } = require("./common/contract");
const { getWallet } = require("./common/wallet");
const ContractAddress = require("../deployedContractAddress.json");
const ganacheTestSignV4 = require("../ganacheTestSignV4.json");

async function main() {

  const adminWallet = getWallet();
  const verifyContract = getPricingInstance(
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
