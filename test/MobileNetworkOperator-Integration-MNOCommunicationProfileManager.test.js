const { expect } = require("chai");

describe("Integration Between MobileNetworkOperator and MNOCommunicationProfileManager Contracts", function () {
    let MobileNetworkOperator;
    let MNOProfile;
    let mno;
    let mnoProfile;
    let owner;
    let addressOne;

    beforeEach(async function () {
        [owner, addressOne] = await ethers.getSigners();
        MobileNetworkOperator = await ethers.getContractFactory(
          "MobileNetworkOperator"
        );
        MNOProfile = await ethers.getContractFactory(
        "MNOCommunicationProfileManager"
        );
        mno = await MobileNetworkOperator.deploy("Grameenphone Ltd.", "GP");
        mnoProfile = await MNOProfile.deploy("Communication Profile Manager", "CPM");
        
        console.log("========Test Account Address========");
        console.log("Address Owner: ", owner.address);
        console.log("Address One: ", addressOne.address);
        console.log("========Test Account Address========\n\n\n");
    });

    describe("Create and Add MNO/Profile from Two Different Contracts", function () {
        const title =
          "Leading end-to-end countrywide GSM communication solutions provider";
        const brand = "Robi";
        const network = "Axiata Bangladesh Ltd.";
        const prefix = 016;
        const mcc = 470;
        const mnc = 2;
        const status = 0;
    
        it("should create a MNO and register a newly created profile from the STORAGE under that MNO", async function () {
            console.log("##########___Creating new Mobile-Network-Operator (MNO)___##########");
            const createMNOResponse = await mno.createMNO(title, brand, network, prefix, mcc, mnc, status);
            expect(createMNOResponse.hash).to.not.be.undefined;
            const totalMNO = await mno.totalIndexedMNO();
            const lastMNO = await mno.getMNOByIndexId(totalMNO - 1);
            console.log("##########___Creating a new Communication Profile___##########");
            const profileResponse = await mnoProfile.createMNO("Robi", "56", "18100000000", "12345");
            expect(profileResponse.hash).to.not.be.undefined;
            const profile = await mnoProfile.getMNOCommunicationProfileById(0);
            console.log("##########___Enlisting the new Communication Profile under the new MNO___##########");
            const addedProfileResponse = await mno.addMNOProfile(
              totalMNO - 1,
              profile
            );
            expect(addedProfileResponse.hash).to.not.be.undefined;
          });
    });
});
