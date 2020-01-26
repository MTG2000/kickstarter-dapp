import React, { useEffect, useState } from "react";
import { CampaignABI } from "../../utils/contracts";
import { Typography } from "@material-ui/core";

const ProjectPage = props => {
  const { match, web3, campaignFactory } = props;
  const { index } = match.params;
  const [title, setTitle] = useState("");

  useEffect(() => {
    (async () => {
      const address = await campaignFactory.methods
        .campaignAddresses(index)
        .call();
      const campaign = new web3.eth.Contract(CampaignABI, address);

      const title = await campaign.methods.gameTitle().call();
      setTitle(title);
    })();
  }, []);

  return (
    <div>
      <Typography variant="h2" component="h1">
        {title}
      </Typography>
    </div>
  );
};

export default ProjectPage;
