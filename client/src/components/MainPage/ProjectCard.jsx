import React from "react";
import Image from "../Image";
import image from "../MainPage/imgs/gears-5.jpg";
import { Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const ProjectCard = props => {
  const { index, title, imgUrl, goal, totalFunds } = props;

  const urlTitle = title.replace(/ /g, "-").toLowerCase();

  return (
    <Link to={`/projects/${index}/${urlTitle}`}>
      <Box mx={4} my={5} width={350}>
        <Image
          src={image}
          StyleImgWrapper={{ width: "100%", height: 196, padding: 0 }}
          hoverColor="rgba(0, 0, 0, 0.777)"
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
      </Box>
    </Link>
  );
};

export default ProjectCard;
