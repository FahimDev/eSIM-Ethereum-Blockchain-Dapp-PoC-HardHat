const { expect } = require("chai");

describe("SIMTokenization Contract", function () {
  let SIMTokenization;
  let hardhatToken;
  let owner;
  let addressOne;
  let addressTwo;
  let addressThree;

  // Mocha Framework | Ref: https://mochajs.org/
  beforeEach(async function () {
    // Creating Instance
    SIMTokenization = await ethers.getContractFactory("SIMTokenization");
    [owner, addressOne, addressTwo, ...addressThree] =
      await ethers.getSigners();
    // Deploying Contract
    hardhatToken = await SIMTokenization.deploy();
  });

  describe("Contract Deployment", function () {
    it("It should set the right owner", async function () {
      console.log("Owner Address: ", owner.address);
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("Should assign the total supply of the tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
      console.log("Owner Balance: ", ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens betgween two accounts", async function () {
      const distributionOne = 10;
      const distributionTwo = 5;
      // Owner account to AddressOne transaction
      await hardhatToken.transfer(addressOne.address, distributionOne);
      const addrOneBalance = await hardhatToken.balanceOf(addressOne.address);
      expect(addrOneBalance).to.equal(distributionOne);
      // AddressOne account to AddressTwo transaction
      await hardhatToken
        .connect(addressOne)
        .transfer(addressTwo.address, distributionTwo);
      const addrTwoBalance = await hardhatToken.balanceOf(addressTwo.address);
      expect(addrTwoBalance).to.equal(distributionTwo);
    });

    it("Should fail if sender does not have enough tokens", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      // Ref: https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
      await expect(
        hardhatToken.connect(addressOne).transfer(owner.address, 6)
      ).to.be.revertedWith("Not Enough Token!");
    });
  });
});
