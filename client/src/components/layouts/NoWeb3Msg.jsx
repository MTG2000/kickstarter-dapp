import React from "react";
import { Typography, Container, Grid } from "@material-ui/core";

const NoWeb3Message = () => {
  return (
    <Container>
      <Grid container alignItems="center" style={{ height: "100vh" }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            You need to install
            <span style={{ color: "orange" }}> MetaMask </span>
            to use a blockchain app
            <br /> And set it to{" "}
            <span style={{ color: "#ff0e90" }}> Ropesten </span>
            network to connect to the app database
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NoWeb3Message;
