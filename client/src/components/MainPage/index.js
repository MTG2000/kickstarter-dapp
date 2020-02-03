import React from "react";
import { Container, Box, Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import ProjectsList from "./ProjectsList";
import { CampaignABI } from "../../utils/contracts";

import CallToAction from "./CallToAction";
import About from "./About";

const MainPage = ({ web3, campaignFactory }) => {
  document.title = "KickStarter - A Platform to Support Creativity";

  // a function that fetch all projects from the blockchain
  const getCampaigns = async (options = {}) => {
    const { limit = 8 } = options;
    const campaignsNum = await campaignFactory.methods.campaignsCount().call();

    let _campaigns = [];
    for (let i = campaignsNum - 1; i >= 0; i--) {
      const address = await campaignFactory.methods.campaignAddresses(i).call();
      const _campaign = new web3.eth.Contract(CampaignABI, address);

      let Campaign = {};
      Campaign.index = i;
      Campaign.title = await _campaign.methods.gameTitle().call();
      Campaign.description = await _campaign.methods.description().call();
      Campaign.imgUrl = await _campaign.methods.imgUrl().call();
      Campaign.totalFunds = await _campaign.methods.totalFunds().call();
      Campaign.goal = await _campaign.methods.goal().call();
      Campaign.endTime = await _campaign.methods.endTime().call();
      _campaigns.push(Campaign);
      if (_campaign.length >= limit) break;
    }
    if (campaignsNum >= 0) return _campaigns;
  };

  return (
    <>
      <CallToAction />
      <Container>
        <Box pt={20} pb={5}>
          <Typography variant="h2" color="textSecondary">
            Latest Projects:
          </Typography>
          <ProjectsList getCampaigns={getCampaigns} />
        </Box>
      </Container>
      <About />
      <Grid container justify="center" style={{ padding: "50px 0" }}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            color="textSecondary"
            align="center"
            gutterBottom
          >
            Crowdfunding a Game has Never Been Easier!!
          </Typography>
        </Grid>
        <Link to="/projects/new">
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ fontSize: "1.8em" }}
          >
            Start A Campaign
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default MainPage;
