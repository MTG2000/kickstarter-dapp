import React from "react";
import Image from "../Image";
import { Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const ProjectCard = props => {
  const { index, title, imgUrl } = props;
  // const { index, title, imgUrl, goal, totalFunds } = props;

  const urlTitle = title.replace(/ /g, "-").toLowerCase();

  return (
    <Link to={`/projects/${index}/${urlTitle}`}>
      <Box mx={4} my={5} maxWidth={350}>
        <Image
          src={imgUrl}
          StyleImgWrapper={{
            width: "100%",
            height: 200,
            padding: 0
          }}
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
      </Box>
    </Link>
  );
};

export default ProjectCard;
