const fs = require('fs');
const { getDeployedPath } = require('./common/file');
const { getPricingInstance } = require('./common/contract');
const { getWallet } = require('./common/wallet');
const ContractAddress = require("../deployedContractAddress.json");
const ganacheTestSignV4 = require("../ganacheTestSignV4.json");

// const network = process.env.NETWORK || 'ganache'
// const branch = process.env.BRANCH || 'develop'

async function main() {

//   let newPrice = 1050;

//   const jsonPath = getDeployedPath(network, branch);
//   let content = JSON.parse(fs.readFileSync(jsonPath).toString());

  const adminWallet = getWallet();
  const verifyContract = getPricingInstance(ContractAddress.genesisContract, adminWallet);
  let message = ganacheTestSignV4.message;
  let _signature = ganacheTestSignV4.signature;
  let signerAddress = await verifyContract._verify(message, _signature);
  console.log({message});  
  console.log({_signature});  
  console.log({signerAddress});  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});