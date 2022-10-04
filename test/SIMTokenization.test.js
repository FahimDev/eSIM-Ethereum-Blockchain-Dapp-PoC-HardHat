const { expect } = require("chai");
// Importing Waffle's functions from ethereum-waffle, can lead to multiple problems. Ref: https://hardhat.org/hardhat-runner/docs/other-guides/waffle-testing#adapting-the-tests
const { waffle } = require("hardhat");
const { deployMockContract } = waffle;

const SIMTokenizationJSON = require("../artifacts/contracts/SIMTokenization.sol/SIMTokenization.json");

// Moking Ref: https://github.com/TrueFiEng/Waffle/blob/master/examples/mock-contracts/test/AmIRichAlready.test.ts
describe("SIMTokenization Contract", function () {
  let SIMTokenization;
  let simTokenization;
  let owner;
  let addressOne;
  let addressTwo;
  let addressThree;
  let MockResearch;

  // Mocha Framework | Ref: https://mochajs.org/
  // beforeEach gets executed before each it() section.
  beforeEach(async function () {
    // Creating Instance
    SIMTokenization = await ethers.getContractFactory("SIMTokenization");
    [owner, addressOne, addressTwo, ...addressThree] =
      await ethers.getSigners();
    // Deploying Contract
    simTokenization = await SIMTokenization.deploy();

    // For Future R&D
    let abiData = JSON.stringify(SIMTokenizationJSON.abi);
    let abiBytecode = JSON.stringify(SIMTokenizationJSON.bytecode);
    const provider = waffle.provider;
    const wallets = provider.getWallets();
    const balance = await wallets[0].getBalance();
    MockResearch =await deployMockContract(owner, abiData);

    console.log("========Test Account Address========");
    console.log("Address Owner: ", owner.address);
    console.log("Address One: ", addressOne.address);
    console.log("Address Two: ", addressTwo.address);
    console.log("Address Three: ", addressThree.address);
    console.log("========Test Account Address========\n\n\n");
  });

  describe("Contract Deployment", function () {
    it("It should set the right owner", async function () {
      console.log("Owner Address: ", owner.address);
      expect(await simTokenization.owner()).to.equal(owner.address);
    });
    it("Should assign the total supply of the tokens to the owner", async function () {
      const ownerBalance = await simTokenization.balanceOf(owner.address);
      expect(await simTokenization.totalSupply()).to.equal(ownerBalance);
      console.log("Owner Balance: ", ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens betgween two accounts", async function () {
      const distributionOne = 10;
      const distributionTwo = 5;
      // Owner account to AddressOne transaction
      await simTokenization.transfer(addressOne.address, distributionOne);
      const addrOneBalance = await simTokenization.balanceOf(
        addressOne.address
      );
      expect(addrOneBalance).to.equal(distributionOne);
      // AddressOne account to AddressTwo transaction
      await simTokenization
        .connect(addressOne)
        .transfer(addressTwo.address, distributionTwo);
      const addrTwoBalance = await simTokenization.balanceOf(
        addressTwo.address
      );
      expect(addrTwoBalance).to.equal(distributionTwo);
    });

    it("Should fail if sender does not have enough tokens", async function () {
      const initialOwnerBalance = await simTokenization.balanceOf(
        owner.address
      );
      // Ref: https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
      await expect(
        simTokenization.connect(addressOne).transfer(owner.address, 6)
      ).to.be.revertedWith("Not Enough Token!");
    });
  });

  describe("Change Ownership", function () {
    it("Should set a new contract owner", async function () {
      console.log(
        "UNIT TEST ==> Sending proposed owner address: ",
        addressOne.address
      );
      console.log(
        "UNIT TEST ==> Contract's current owner address: ",
        await simTokenization.owner()
      );
      console.log("UNIT TEST ==> Executing changeOwnership method....");
      // Updating ownership of a contract
      await simTokenization.changeOwnership(addressOne.address);
      console.log(
        "UNIT TEST ==> Contracts updated owner address: ",
        await simTokenization.owner()
      );
      // Checking current ownership address and proposed owner address are equal or not.
      expect(await simTokenization.owner()).to.equal(addressOne.address);
    });

    it("Should fail if the sender is not actual owner", async function () {
      console.log(
        "Should Fail ==> Contract Current Owner Address: ",
        await simTokenization.owner()
      );
      console.log("Should Fail: Sending Request with: ", addressTwo.address);
      await expect(
        simTokenization.connect(addressTwo).changeOwnership(addressOne.address)
      ).to.be.revertedWith("Not Owner");
    });

    it("Mock R&D", async function () {
      // Owner account to AddressOne transaction (MOCK)
      const mockResearch = await MockResearch.mock.transfer.withArgs(addressOne.address, 5).reverts();
      const addrOneBalance = await simTokenization.balanceOf(
        owner.address
      );
      //const mockResearch = await MockResearch.mock.balanceOf.withArgs(owner.address).reverts();
      console.log(mockResearch)
      //expect(await MockResearch.mock.balanceOf.withArgs(owner.address).reverts()).to.equal(100);
    });
  });
});
