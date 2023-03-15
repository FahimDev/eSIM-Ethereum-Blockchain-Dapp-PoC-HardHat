// command: npx hardhat run scripts/02_upgrade_mobile_network_operator_v2.js --network goerli

const { ethers, upgrades } = require("hardhat");
const proxyAddress = require("../../json-log/transparentProxyContractAddress.json");

const PROXY = proxyAddress.mnoContract;

async function main(){
    const MobileNetworkOperatorV2 = await ethers.getContractFactory(
        "MobileNetworkOperatorV2"
      );
    await upgrades.upgradeProxy(PROXY, MobileNetworkOperatorV2);
    console.log("MobileNetworkOperatorV2 Upgraded!");
}

main();