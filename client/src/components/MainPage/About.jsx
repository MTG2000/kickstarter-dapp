import React from "react";
import { Typography, Box, Container } from "@material-ui/core";

const About = () => {
  return (
    <Box py={15} style={{ background: "#333" }}>
      <Container>
        <Typography
          variant="h2"
          color="primary"
          gutterBottom
          style={{ fontWeight: "bold" }}
        >
          About Kickstarter
        </Typography>
        <Typography
          variant="h5"
          color="textPrimary"
          style={{ marginBottom: 35, color: "#FFF", lineHeight: "1.8em" }}
        >
          This is a platform that uses the technology to help creative
          developers with creative ideas to bring their ideas to life.
          <br />
          What makes us special is that we use the blockchain tech to facilitate
          the proccess of funding and refunding as much as possible.
          <br />
          Further more, there is no middle party which means that fundings go
          directly to the Developers if the campaign reaches its goal.
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          style={{ fontWeight: "bold" }}
        >
          How to Fund A Project??
        </Typography>
        <Typography
          variant="h5"
          color="textPrimary"
          style={{ marginBottom: 35, color: "#FFF", lineHeight: "1.8em" }}
        >
          It is very simple, just go to the project page and click the "Become a
          Kickstarter" Button.
          <br />
          Choose the amount you want to Donate in Ether and you are done.
          <br />
          Note That you cant fund a failed campaign and you cant Withdraw until
          a campaign fail
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          style={{ fontWeight: "bold" }}
          gutterBottom
        >
          How to Start A Campaign??
        </Typography>
        <Typography
          variant="h5"
          color="textPrimary"
          style={{ marginBottom: 35, color: "#FFF", lineHeight: "1.8em" }}
        >
          Click The button down below which takes you to a page where you can
          create your campaign.
          <br />
          When you are done filling the requiered info you can hit the publish
          button and your campaign will come alive !!!
          <br />
          Note That you cant withdraw the fundings from a campaign if it doesn't
          successed.
          <br />
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          style={{ fontWeight: "bold" }}
          gutterBottom
        >
          Note...
        </Typography>
        <Typography
          variant="h5"
          color="textPrimary"
          style={{ marginBottom: 35, color: "#FFF", lineHeight: "1.8em" }}
        >
          This is a Dapp applicatin which means that you need to use MetaMask
          Browser extension to be able to Publish/Fund a campaign.
        </Typography>
      </Container>
    </Box>
  );
};

export default About;
