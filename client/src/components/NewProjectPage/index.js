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
  const [redirect, setRedirect] = useState(false);

  //Creates a new Campaing on the blockchain after reciving the data
  const onSubmit = async data => {
    const { title, image, description, goal, duration } = data;
    try {
      const campaignPrice = await campaignFactory.methods
        .campaignPrice()
        .call({});
      await campaignFactory.methods
        .newCampaign(
          title,
          description,
          image,
          web3.utils.toWei(goal.toString(), "Ether"),
          // +duration * 24 * 3600 //convert to seconds
          +duration * 240 //convert to seconds
        )
        .send({ from: account, value: campaignPrice });
      setRedirect(true);
    } catch (error) {
      setNotification({
        open: true,
        msg: "Successfully Sent Money",
        type: "error"
      });
    }
  };

  if (redirect) return <Redirect to="/" />;
  return (
    <Container>
      <Typography variant="h2" component="h1" color="primary" align="center">
        Start A Campaign
      </Typography>
      <Box maxWidth={400} mx={"auto"} mt={10}>
        <ProjectForm onSubmit={onSubmit} />
      </Box>
      <Notification
        {...notification}
        handleClose={() => setNotification({ ...notification, open: false })}
      />
    </Container>
  );
};

export default NewProjectPage;
