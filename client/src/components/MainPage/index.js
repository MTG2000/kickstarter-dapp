import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@material-ui/core";

import ProjectsList from "./ProjectsList";

const MainPage = ({ web3, account, campaignFactory }) => {
  const [campaignsNum, setCampaignsNum] = useState(0);

  useEffect(() => {
    (async () => {
      //   const campaignPrice = await campaignFactory.methods.campaignPrice().call({});
      //   await campaignFactory.methods
      //     .newCampaign(
      //       "Metal Gear Solid VI",
      //       "the sequel that you all waited",
      //       "http://www.ipv6.vgboxart.com/boxes/PS4/73062-the-witcher-3-wild-hunt.png",
      //       web3.utils.toWei("2", "Ether"),
      //       50000
      //     )
      //     .send({ from: account, value: campaignPrice });
      const numOfProjects = await campaignFactory.methods
        .campaignsCount()
        .call();
      setCampaignsNum(numOfProjects);
    })();
  }, []);

  if (!campaignFactory)
    return (
      <Container>
        <Box mt={15}>
          <Typography align="center" variant="h3">
            ---Loading Data---
          </Typography>
        </Box>
      </Container>
    );

  return (
    <Container>
      <Typography variant="h2">Latest Projects:</Typography>
      <ProjectsList
        web3={web3}
        campaignFactory={campaignFactory}
        campaignsNum={campaignsNum}
      />
    </Container>
  );
};

export default MainPage;
