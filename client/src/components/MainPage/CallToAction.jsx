import React from "react";
import Hero from "./Hero";
import Logo from "./logo.png";
import Background from "./background.jpg";
import { Typography, Grid, makeStyles, useTheme } from "@material-ui/core";

const useStyle = makeStyles({
  wrapper: theme => ({
    width: "80vw",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 10,
    [theme.breakpoints.down("sm")]: {
      top: "40%"
    }
  }),

  moto: theme => ({
    color: "#FFF",
    alignSelf: "center",
    paddingTop: 130,
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 20
    }
  }),
  logo: theme => ({
    width: "100%",
    maxWidth: 500,
    display: "block",
    [theme.breakpoints.down("sm")]: {
      width: 200,
      marginLeft: "auto",
      marginRight: "auto"
    }
  })
});

const CallToAction = () => {
  const theme = useTheme();
  const classes = useStyle(theme);
  return (
    <Hero src={Background}>
      <div className={classes.wrapper}>
        <Grid container justify="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" className={classes.moto}>
              Bringing Creative Projects To Life!!!
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <img src={Logo} alt="Kickstater logo" className={classes.logo} />
          </Grid>
        </Grid>
      </div>
    </Hero>
  );
};

export default CallToAction;
