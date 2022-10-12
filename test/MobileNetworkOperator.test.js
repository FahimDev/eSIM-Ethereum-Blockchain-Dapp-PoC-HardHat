const { expect } = require("chai");

describe("Mobile-Network-Operator Contract", function () {
  let MobileNetworkOperator;
  let mno;
  let owner;
  let addressOne;
  let addressTwo;

  beforeEach(async function () {
    // Creating Instance
    MobileNetworkOperator = await ethers.getContractFactory(
      "MobileNetworkOperator"
    );
    [owner, addressOne, addressTwo] = await ethers.getSigners();
    // Deploying Contract
    mno = await MobileNetworkOperator.deploy("Grameenphone Ltd.", "GP");
    
    console.log("========Test Account Address========");
    console.log("Address Owner: ", owner.address);
    console.log("Address One: ", addressOne.address);
    console.log("Address Two: ", addressTwo.address);
    console.log("========Test Account Address========\n\n\n");
  });

  describe("Contract Deployment", function () {
    it("should set the right owner", async function () {
      console.log("Owner Address: ", owner.address);
      expect(await mno.owner()).to.equal(owner.address);
    });
  });

  describe("Create MNO", function () {
    const title = "Largest telecommunications operator in Bangladesh";
    const brand = "Grameenphone";
    const network = "GrameenPhone Ltd";
    const prefix = 017;
    const mcc = 470;
    const mnc = 1;
    const status = 0;

    it("should Create a new Mobile Network Operator", async function () {
      const mnoResponse = await mno.createMNO(
        title,
        brand,
        network,
        prefix,
        mcc,
        mnc,
        status
      );
      expect(mnoResponse.hash).to.not.be.undefined;
      //.to.not.equal(null);
    });
  });

  describe("Get Created MNO", function () {
    const title =
      "Leading end-to-end countrywide GSM communication solutions provider";
    const brand = "Robi";
    const network = "Axiata Bangladesh Ltd.";
    const prefix = 016;
    const mcc = 470;
    const mnc = 2;
    const status = 0;

    it("should find the last added MNO data from the storage", async function () {
      await mno.createMNO(title, brand, network, prefix, mcc, mnc, status);
      const totalMNO = await mno.totalIndexedMNO();
      const lastMNO = await mno.getMNOByIndexId(totalMNO - 1);
      expect(lastMNO.network).to.equal(network);
      expect(lastMNO.mnc).to.equal(mnc);
    });
  });

  describe("Add and Get MNO Profile", function () {
    const title =
      "Leading end-to-end countrywide GSM communication solutions provider";
    const brand = "Robi";
    const network = "Axiata Bangladesh Ltd.";
    const prefix = 016;
    const mcc = 470;
    const mnc = 2;
    const status = 0;

    var structProfile = {
      id: 55,
      title: "Robi",
      iccid: "56",
      msisdn: "18100000000",
      imsi: "12345",
    };

    it("should register new profile under a MNO", async function () {
      await mno.createMNO(title, brand, network, prefix, mcc, mnc, status);
      const totalMNO = await mno.totalIndexedMNO();
      const lastMNO = await mno.getMNOByIndexId(totalMNO - 1);
      console.log("Last added MNO ID", lastMNO.id);
      const addedProfileResponse = await mno.addMNOProfile(
        totalMNO - 1,
        structProfile
      );
      console.log("Last added Profile Response: ", addedProfileResponse);
      expect(addedProfileResponse).to.not.be.undefined;
    });

    it("should find the newly added profile mapped by a MNO", async function () {
      await mno.createMNO(title, brand, network, prefix, mcc, mnc, status);
      const totalMNO = await mno.totalIndexedMNO();
      const addedProfileResponse = await mno.addMNOProfile(
        totalMNO - 1,
        structProfile
      );
      const profiles = await mno.getProfilesByMNOId(totalMNO - 1);
      let targetedProfile;
      function getProfile(item) {
        if (structProfile.id == item.id) {
          targetedProfile = item;
        }
      }
      profiles.forEach(await getProfile);
      expect(targetedProfile.title).to.be.equal(structProfile.title);
    });
  });
});
