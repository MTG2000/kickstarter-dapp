import React, { useEffect, useState } from "react";
import { CampaignABI } from "../../utils/contracts";
import ProjectCard from "./ProjectCard";
import { Grid } from "@material-ui/core";
import Loading from "../layouts/Loading";

const ProjectsList = ({ web3, campaignFactory, campaignsNum }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    (async () => {
      let _campaigns = [];
      for (let i = campaignsNum - 1; i >= 0; i--) {
        const address = await campaignFactory.methods
          .campaignAddresses(i)
          .call();
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
      }
      setCampaigns(_campaigns);
    })();
  }, [campaignsNum]);

  if (campaigns.length === 0)
    return <Loading height="400px" msg="Loading Latest Projects" />;

  return (
    <Grid container>
      {campaigns.map(c => (
        <Grid item key={c.index}>
          <ProjectCard
            index={c.index}
            title={c.title}
            description={c.description}
            imgUrl={c.imgUrl}
            goal={c.goal}
            totalFunds={c.totalFunds}
            state={c.state}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectsList;
