// upgrade command: npx hardhat run scripts/03_upgrade_reward_coin_v2.js --network goerli
// verify command: npx hardhat verify --network goerli 0xDeployedContractAddress

const { ethers, upgrades } = require("hardhat");

const proxyAddress = require("../../json-log/universalUpgradeableProxyContractAddress.json");
const PROXY = proxyAddress.rewardCoinContract;

async function main() {
  console.log("Deploying RewardCoinV2 contract...");
  const RewardCoinV2 = await ethers.getContractFactory("RewardCoinV2");
  const rewardCoinV2 = await upgrades.upgradeProxy(PROXY, RewardCoinV2);
  await rewardCoinV2.deployed();
  console.log(
    "RewardCoinV2 Proxy Contract ( Must be Same ) deployed to : ",
    rewardCoinV2.address
  );
  console.log(
    "RewardCoinV2 Contract implementation address is : ",
    await upgrades.erc1967.getImplementationAddress(rewardCoinV2.address)
  );
}

main();
