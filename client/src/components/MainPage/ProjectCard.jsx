import React from "react";
import { Box, Typography, makeStyles, useTheme } from "@material-ui/core";
import { Link } from "react-router-dom";
import ImageFixedAspect from "../ImageFixedAspect/ImageFixedAspect";

const useStyle = makeStyles({
  root: {
    position: "relative"
  },
  goalPercentBar: props => ({
    position: "absolute",
    bottom: "100%",
    left: 0,
    width: `${props.fundsPercent}%`,
    height: 7,
    background: props.palette.primary.main
  })
});

const ProjectCard = props => {
  const { index, title, imgUrl, goal, totalFunds } = props;
  const theme = useTheme();
  const urlTitle = title.replace(/ /g, "-").toLowerCase();

  let fundsPercent = totalFunds / goal;
  if (fundsPercent >= 1) fundsPercent = 100;
  else fundsPercent *= 100;

  const classes = useStyle({ fundsPercent, ...theme });
  return (
    <Link to={`/projects/${index}/${urlTitle}`}>
      <Box mx={2} my={5} minWidth={300} className={classes.root}>
        <ImageFixedAspect
          src={imgUrl}
          hoverColor="rgba(0, 0, 0, 0.377)"
          pointerOnHover
        />

        <Typography
          variant="h4"
          color="primary"
          align="center"
          style={{ marginTop: 18 }}
        >
          {title}
        </Typography>
        <div className={classes.goalPercentBar}></div>
      </Box>
    </Link>
  );
};

export default ProjectCard;
