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
      <Grid container justify="space-between">
        {campaigns.slice(0, 2).map(c => (
          <Grid item xs={12} sm={6} key={c.index}>
            <ProjectCard
              index={c.index}
              title={c.title}
              description={c.description}
              imgUrl={c.imgUrl}
              goal={c.goal}
              totalFunds={c.totalFunds}
              state={c.state}
              large
            />
          </Grid>
        ))}

        {campaigns.slice(2).map(c => (
          <Grid item xs={12} sm={5} md={4} key={c.index}>
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
