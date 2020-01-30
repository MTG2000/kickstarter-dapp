import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Grid, Typography, Box } from "@material-ui/core";
import Loading from "../layouts/Loading";

const ProjectsList = ({ getCampaigns }) => {
  const [campaigns, setCampaigns] = useState(null);

  useEffect(() => {
    (async () => {
      const campaigns = await getCampaigns();
      setCampaigns(campaigns);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!campaigns)
    return <Loading height="400px" msg="Loading Latest Projects" />;

  if (campaigns.length === 0)
    return (
      <Box py="3">
        <Typography variant="h2" align="center">
          No Projects Yet ....
        </Typography>
      </Box>
    );

  return (
    <>
      <Typography variant="h2">Latest Projects:</Typography>
      <Grid container>
        {campaigns.map(c => (
          <Grid item key={c.index}>
            <ProjectCard
              index={c.index}
              title={c.title}
              description={c.description}
              imgUrl={c.imgUrl}
              goal={c.goal}
              totalFunds={c.totalFunds}
              state={c.state}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProjectsList;
