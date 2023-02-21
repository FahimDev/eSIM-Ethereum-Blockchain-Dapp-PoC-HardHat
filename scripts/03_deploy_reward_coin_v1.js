const { ethers, upgrades } = require("hardhat");

// command: npx hardhat run scripts/03_deploy_reward_coin_v1.js --network goerli
// verify command: npx hardhat verify --network goerli 0xDeployedContractAddress
async function main() {
  // The Universal Upgradeable Proxies
  // Ref: https://eips.ethereum.org/EIPS/eip-1822
  // Implementation Ref: https://github.com/ishinu/UUPS-Proxy-Pattern-Implementation-Hardhat-/tree/main/scripts

  const RewardCoin = await ethers.getContractFactory("RewardCoin");
  console.log("Deploying Universal Upgradeable Proxy Contract...");
  const rewardCoin = await upgrades.deployProxy(RewardCoin, ["GPCoin", "GP"], {
    kind: "uups",
    initializer: "initialize",
  });

  // Checking Timeout and Smart Contract Timeout Status.
  await rewardCoin.deployed();

  console.log("Reward-Coin deployed to: ", rewardCoin.address);
  await contractAddressSaver("rewardCoinContract", rewardCoin.address);
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
    "universalUpgradeableProxyContractAddress.json",
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
