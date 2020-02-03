// const CampaignFactory = artifacts.require("CampaignFactory");
// const Campaign = artifacts.require("Campaign");

// require("chai")
//   .use(require("chai-as-promised"))
//   .should();

// const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

// contract("CampaignFactory", ([owner, funder1, funder2]) => {
//   let campaignFactory, campaign, failingCampaign;

//   before(async () => {
//     campaignFactory = await CampaignFactory.deployed();
//   });

//   describe("deployment tests", () => {
//     it("inital values", async () => {
//       const campaignPrice = await campaignFactory.campaignPrice();
//       assert.equal(campaignPrice, 5 * 10 ** 17);
//     });

//     it("should deploy Campaign", async () => {
//       const campaignPrice = await campaignFactory.campaignPrice();
//       await campaignFactory.newCampaign(
//         "The Witcher 4",
//         "the sequel that you all waited",
//         "http://www.ipv6.vgboxart.com/boxes/PS4/73062-the-witcher-3-wild-hunt.png",
//         web3.utils.toWei("2", "Ether"),
//         5,
//         { from: owner, value: campaignPrice }
//       );
//       const campaignAddress = await campaignFactory.campaignAddresses(0);
//       campaign = await Campaign.at(campaignAddress);
//       assert.notEqual(campaign, null);
//     });

//     it("should deploy Failing Campaign", async () => {
//       const campaignPrice = await campaignFactory.campaignPrice();
//       await campaignFactory.newCampaign(
//         "Metal Gear Survive",
//         "the sequel that nobody asked for",
//         "http://www.ipv6.vgboxart.com/boxes/PS4/73062-the-witcher-3-wild-hunt.png",
//         web3.utils.toWei("2", "Ether"),
//         5,
//         { from: owner, value: campaignPrice }
//       );
//       const campaignAddress = await campaignFactory.campaignAddresses(1);
//       failingCampaign = await Campaign.at(campaignAddress);
//       assert.notEqual(failingCampaign, null);
//     });

//     it("should reject deploying Campaign with not enough value", async () => {
//       await campaignFactory.newCampaign(
//         "The Witcher 4",
//         "the sequel that you all waited",
//         "http://www.ipv6.vgboxart.com/boxes/PS4/73062-the-witcher-3-wild-hunt.png",
//         web3.utils.toWei("2", "Ether"),
//         5,
//         { from: owner, value: 10 }
//       ).should.be.rejected;
//     });

//     it("campaign should have correct values (title)", async () => {
//       const gameTitle = await campaign.gameTitle();
//       assert.equal(gameTitle, "The Witcher 4");
//     });

//     it("should accept funds from funder 1", async () => {
//       await campaign.fund({
//         from: funder1,
//         value: web3.utils.toWei("1", "Ether")
//       });

//       await failingCampaign.fund({
//         from: funder1,
//         value: web3.utils.toWei("1", "Ether")
//       });
//     });

//     it("should not withdraw if goal not reached yet ", async () => {
//       await campaign.withdraw({ from: owner }).should.be.rejected;
//     });

//     it("should accept funds from funder 2", async () => {
//       await campaign.fund({
//         from: funder2,
//         value: web3.utils.toWei("1", "Ether")
//       });
//     });

//     it("should  withdraw if goal  reached  ", async () => {
//       await campaign.withdraw({ from: owner });
//     });

//     it("should not accept funds from owner", async () => {
//       await campaign.fund({
//         from: owner,
//         value: web3.utils.toWei("1", "Ether")
//       }).should.be.rejected;
//     });

//     it("should not accept funds less than 1$", async () => {
//       await campaign.fund({ from: funder1, value: 1 }).should.be.rejected;
//     });

//     it("should not refund before fail", async () => {
//       await failingCampaign.refund({ from: funder1 }).should.be.rejected;
//     });

//     it("should have 2 campaigns", async () => {
//       const numOfCamp = await campaignFactory.campaignsCount();
//       assert.equal(numOfCamp, 2);
//     });

//     (async () => {
//       // return; //remove this line if you want to test the post end   // tests but make sure to put a long enough delay

//       it("should refund after fail", async () => {
//         await delay(10000);
//         await failingCampaign.refund({ from: funder1 });
//       });

//       it("should not withdraw if not the owner ", async () => {
//         await campaign.withdraw({ from: funder1 }).should.be.rejected;
//       });

//       it("should not withdraw if failed ", async () => {
//         await failingCampaign.withdraw({ from: owner }).should.be.rejected;
//       });

//       it("should withdraw after success", async () => {
//         await campaign.withdraw({ from: owner });
//       });
//     })();
//   });
// });
