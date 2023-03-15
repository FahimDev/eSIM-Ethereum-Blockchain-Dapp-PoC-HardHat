const { ethers, upgrades } = require("hardhat");

// command: npx hardhat run scripts/02_deploy_mobile_network_operator_v1.js --network goerli
// verify command: npx hardhat verify --network goerli 0xDeployedContractAddress
async function main() {
  // The Transparent Proxy Pattern
  // Ref: https://blog.openzeppelin.com/the-transparent-proxy-pattern/

  const MobileNetworkOperator = await ethers.getContractFactory(
    "MobileNetworkOperator"
  );

  const mno = await upgrades.deployProxy(
    MobileNetworkOperator,
    ["Grameenphone Ltd.", "GP"],
    { initializer: "initialize" }
  );

  // Checking Timeout and Smart Contract Timeout Status.
  await mno.deployed();

  console.log("MNO deployed to: ", mno.address);
  await contractAddressSaver("mnoContract", mno.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function contractAddressSaver(key_name, value) {
  const fs = require("fs");
  // json data
  var jsonData = `{ "${key_name}" : "${value}" }`;
  // stringify JSON Object
  //var jsonContent = JSON.stringify(jsonData);
  fs.writeFileSync(
    "../json-log/transparentProxyContractAddress.json",
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
