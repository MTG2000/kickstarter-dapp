import React, { useState } from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import Notification from "../Notification";

const NewProjectPage = ({ web3, account, campaignFactory }) => {
  const [notification, setNotification] = useState({
    open: false,
    msg: "Hello World"
  });
  const [pending, setPending] = useState(false);
  const [redirect, setRedirect] = useState(false);

  //Creates a new Campaing on the blockchain after reciving the data
  const onSubmit = async data => {
    const { title, image, description, goal, duration } = data;
    try {
      const campaignPrice = await campaignFactory.methods
        .campaignPrice()
        .call({});
      setPending(true);
      await campaignFactory.methods
        .newCampaign(
          title,
          description,
          image,
          web3.utils.toWei(goal.toString(), "Ether"),
          +duration * 24 * 3600 //convert to seconds
        )
        .send({ from: account, value: campaignPrice });
      setRedirect(true);
    } catch (error) {
      setNotification({
        open: true,
        msg: "Failed To Launch Campaign",
        type: "error"
      });
    }
  };

  document.title = "Kickstarter New Campaign";

  if (redirect) return <Redirect to="/" />;
  return (
    <Box py={10}>
      <Container>
        <Typography variant="h2" component="h1" color="primary" align="center">
          Start A Campaign
        </Typography>
        <Box maxWidth={400} mx={"auto"} mt={10}>
          <ProjectForm onSubmit={onSubmit} pending={pending} />
        </Box>
        <Notification
          {...notification}
          handleClose={() => setNotification({ ...notification, open: false })}
        />
      </Container>
    </Box>
  );
};

export default NewProjectPage;
