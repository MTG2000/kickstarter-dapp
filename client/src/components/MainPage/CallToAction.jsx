import React from "react";
import Hero from "./Hero";
import Logo from "./logo2.png";
import Background from "./background.jpg";
import { Typography, Grid } from "@material-ui/core";

const CallToAction = () => {
  return (
    <Hero src={Background}>
      <div
        style={{
          width: "80vw",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 10
        }}
      >
        <Grid container justify="space-between">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              style={{ color: "#FFF", alignSelf: "center", paddingTop: 130 }}
            >
              We Help Bringing Creative Projects To Life
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <img
              src={Logo}
              alt="Kickstater logo"
              style={{
                width: "100%",
                maxWidth: 500,
                display: "block"
              }}
            />
          </Grid>
        </Grid>
      </div>
    </Hero>
  );
};

export default CallToAction;
