const { expect } = require("chai");

describe("MNO-Communication-Profile-Managerr Contract", function () {
  let MobileNetworkOperator;
  let mno;
  let owner;
  let addressOne;
  let addressTwo;

  beforeEach(async function () {
    [owner, addressOne, addressTwo] = await ethers.getSigners();
    MNOProfile = await ethers.getContractFactory(
      "MNOCommunicationProfileManager"
    );
    mnoProfile = await MNOProfile.deploy(
      "Communication Profile Manager",
      "CPM"
    );

    console.log("========Test Account Address========");
    console.log("Address Owner: ", owner.address);
    console.log("Address One: ", addressOne.address);
    console.log("Address Two: ", addressTwo.address);
    console.log("========Test Account Address========\n\n\n");
  });


  describe("Create Communication Profile", function () {
    it("should create a new Communication Profile and Generate a Hash", async function () {
      const profileResponse = await mnoProfile.createMNO(
        "Robi",
        "56",
        "18100000000",
        "12345"
      );
      expect(profileResponse.hash).to.not.be.undefined;
    });
  });

  describe("Find Communication Profile", function () {
    const title = "Robi";
    const iccid = "56";
    const msisdn = "18100000000";
    const imsi = "12345";
    it("should find the last created Communication Profile", async function () {
        const profileResponse = await mnoProfile.createMNO(
            title,
            iccid,
            msisdn,
            imsi
        );
        const profile = await mnoProfile.getMNOCommunicationProfileById(0);
        expect(profile.title).to.be.equal(title);
        expect(profile.iccid).to.be.equal(iccid);
    });
  });

  describe("Total Communication Profile Increment", function () {
    const title = "GrameenPhone";
    const iccid = "99";
    const msisdn = "17100000000";
    const imsi = "12367";
    it("should increment the number of total Communication Profiles", async function () {
        const beforeAddingProfile = await mnoProfile.showAllCommunicationProfile();
        const profileResponse = await mnoProfile.createMNO(
            title,
            iccid,
            msisdn,
            imsi
        );
        expect(profileResponse.hash).to.not.be.undefined;
        const afterAddingProfile = await mnoProfile.showAllCommunicationProfile();
        expect(beforeAddingProfile.length).to.be.lessThan(afterAddingProfile.length);
    });
  });
});
