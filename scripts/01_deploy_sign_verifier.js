/**
 * In our hardhat.config.js file we have mentioned
 * one of our networks attribute name as `ganache`.
 * That is why we are using that attribute name in our following
 * command: npx hardhat run ./scripts/deploy.js --network ganache
 * command: npx hardhat run scripts/deploy.js --network goerli
 * But we can use multiple network attributes to deploy in different networks also.
 */
 const { ethers } = require("hardhat");

 async function main() {

   // Ref: https://docs.openzeppelin.com/learn/deploying-and-interacting
   const SignVerifyContract = await ethers.getContractFactory("VerifySignData");

   // Hardhat doesn’t keep track of your deployed contracts.
   // We displayed the deployed address in our script
   // const genesisContract = await GenesisContract.deploy();
   const signVerifyContract = await SignVerifyContract.deploy();

   console.log("Copy Content Address: ", signVerifyContract.address);
   await contractAddressSaver("genesisContract",signVerifyContract.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch((error) => {
     console.error(error);
     process.exit(1);
   });
 
 async function contractAddressSaver(key_name, value){
   const fs = require('fs');
   // json data
   var jsonData = `{ "${key_name}" : "${value}" }`;
   // stringify JSON Object
   //var jsonContent = JSON.stringify(jsonData);
   fs.writeFileSync("deployedContractAddress.json", jsonData, 'utf8', function (err) {
     if (err) {
         console.log("An error occurred while writing JSON Object to File.");
         return console.log(err);
     }
     console.log("JSON file has been saved.");
   });
 }
 