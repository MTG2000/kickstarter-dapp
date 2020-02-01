import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core";

const useStyle = makeStyles({
  root: props => ({
    position: "relative",
    width: "100%",
    height: "70vh",

    [props.breakpoints.up("md")]: {
      height: "100vh"
    },
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      background: "#000",
      opacity: props.opacity || 0.75
    }
  }),
  image: props => ({
    width: "100%",
    height: "100%",
    objectFit: "cover"
  })
});

const Hero = props => {
  const theme = useTheme();
  const classes = useStyle({ ...theme, ...props.style });

  return (
    <div className={classes.root}>
      <img
        src={props.src}
        alt={props.alt || "Hero"}
        className={classes.image}
      />
      {props.children}
    </div>
  );
};

export default Hero;
