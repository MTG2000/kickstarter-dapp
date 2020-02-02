import React from "react";
import { Typography } from "@material-ui/core";

const Footer = () => {
  return (
    <footer
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%"
      }}
    >
      <Typography align="right" style={{ padding: "0 20px" }}>
        Designed And Programmed By{" "}
        <a
          href="https://mtgdev.herokuapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="h6" component="span" color="primary">
            Mtg
          </Typography>
        </a>
      </Typography>
    </footer>
  );
};

export default Footer;
