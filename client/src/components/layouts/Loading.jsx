import React from "react";
import { DualRing } from "react-awesome-spinners";
import { Box, Typography } from "@material-ui/core";

const Loading = ({ animationProps, msg = "Loading", height = "100vh" }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      //alignItems="center"
      alignContent="center"
      style={{ height }}
      color="primary.main"
      flexWrap="wrap"
    >
      <DualRing {...animationProps} />
      <Typography
        variant="h6"
        component="h6"
        style={{ width: "100%" }}
        align="center"
      >
        {msg}
      </Typography>
    </Box>
  );
};

export default Loading;
