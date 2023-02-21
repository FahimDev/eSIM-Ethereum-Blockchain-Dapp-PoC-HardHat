const { ethers, upgrades } = require("hardhat");

// command: npx hardhat run scripts/04_deploy_MNOProfileDiamond.js --network goerli
// verify command: npx hardhat verify --network goerli 0xDeployedContractAddress
async function main() {
  // The Diamond Pattern
  // Ref: https://eips.ethereum.org/EIPS/eip-2535

  const MNOProfileDiamond = await ethers.getContractFactory(
    "MNOProfileDiamond"
  );
  console.log("Deploying Diamond Pattern Contract...");
  const mnoProfileDiamond = await MNOProfileDiamond.deploy();
  await mnoProfileDiamond.deployed();
  // Checking Timeout and Smart Contract Timeout Status.
  console.log("Diamond deployed to:", mnoProfileDiamond.address);

  await contractAddressSaver(
    "MNOProfileDiamondContract",
    mnoProfileDiamond.address
  );

  const FacetNames = [
    "WriteCommunicationProfileFacet",
    "ReadCommunicationProfileFacet",
  ];
  await deployingFacets(FacetNames);

  console.log(
    "==>Make sure you verify your Diamond and Facets both deployed addresses<=="
  );
  console.log("* After verification visit https://louper.dev *");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function deployingFacets(facetNames) {
  // Deploy facets and set the `facetCuts` variable
  console.log("Deploying facets....");
  for (const FacetName of facetNames) {
    const Facet = await ethers.getContractFactory(FacetName);
    const facet = await Facet.deploy();
    await facet.deployed();
    console.log(`${FacetName} deployed: ${facet.address}`);
  }
}

async function contractAddressSaver(key_name, value) {
  const fs = require("fs");
  // json data
  var jsonData = `{ "${key_name}" : "${value}" }`;
  // stringify JSON Object
  //var jsonContent = JSON.stringify(jsonData);
  fs.writeFileSync(
    "mnoProfileDiamondPatternContractAddress.json",
    jsonData,
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occurred while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    }
  );
}
