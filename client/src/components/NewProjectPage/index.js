import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import ProjectForm from "./ProjectForm";

const NewProjectPage = ({ web3, account, campaignFactory }) => {
  //Creates a new Campaing on the blockchain after reciving the data
  const onSubmit = async data => {
    const { title, image, description, goal, duration } = data;
    const campaignPrice = await campaignFactory.methods
      .campaignPrice()
      .call({});
    await campaignFactory.methods
      .newCampaign(
        title,
        description,
        image,
        web3.utils.toWei(goal.toString(), "Ether"),
        +duration * 24 * 3600 //convert to seconds
      )
      .send({ from: account, value: campaignPrice });
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" color="primary" align="center">
        Start A Campaign
      </Typography>
      <Box maxWidth={400} mx={"auto"} mt={10}>
        <ProjectForm onSubmit={onSubmit} />
      </Box>
    </Container>
  );
};

export default NewProjectPage;
