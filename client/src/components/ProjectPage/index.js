import React, { useEffect, useState } from "react";
import { CampaignABI } from "../../utils/contracts";
import { Typography, Grid, Box, Button } from "@material-ui/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import date from "date-and-time";

import Image from "../Image";
import Loading from "../layouts/Loading";
import FundDialog from "./FundDialog";

const ProjectPage = props => {
  const { match, web3, account, campaignFactory } = props;
  const { index } = match.params;
  const [campaign, setCampaign] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const address = await campaignFactory.methods
        .campaignAddresses(index)
        .call();
      const _campaign = new web3.eth.Contract(CampaignABI, address);
      setCampaign(_campaign);
      const title = await _campaign.methods.gameTitle().call();
      const description = await _campaign.methods.description().call();
      const imgUrl = await _campaign.methods.imgUrl().call();
      const totalFunds = await _campaign.methods.totalFunds().call();
      const goal = await _campaign.methods.goal().call();
      const endTime = await _campaign.methods.endTime().call();
      setProjectDetails({
        title,
        description,
        imgUrl,
        totalFunds,
        goal,
        endTime
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fund = async value => {
    setDialogOpen(false);
    if (!value) return;
    await campaign.methods.fund().send({
      from: account,
      value: web3.utils.toWei(value.toString(), "Ether")
    });
    alert("transaction Sent !!");
  };

  if (!projectDetails || !projectDetails.title)
    return <Loading height="70vh" msg="loading Project Data" />;

  const {
    title,
    description,
    imgUrl,
    totalFunds,
    goal,
    endTime
  } = projectDetails;

  let fundsPercent = totalFunds / goal;
  if (fundsPercent >= 1) fundsPercent = 100;
  else fundsPercent *= 100;
  fundsPercent = fundsPercent.toFixed(1);

  const endDate = date.format(new Date(+endTime * 1000), "YYYY/MM/DD HH:mm");

  return (
    <div>
      <FundDialog open={dialogOpen} handleClose={fund} />
      <Typography variant="h2" component="h1" gutterBottom color="primary">
        {title}
      </Typography>
      <Grid container justify="space-between">
        <Grid item xs={12} md={7}>
          <Image
            src={imgUrl}
            StyleImgWrapper={{ width: "100%", height: "auto", padding: 0 }}
            hoverColor="rgba(0, 0, 0, 0.177)"
          />

          <Typography
            variant="h4"
            gutterBottom
            color="primary"
            style={{ marginTop: 45 }}
          >
            Details about the project
          </Typography>
          <Typography variant="h6" gutterBottom>
            {description}
          </Typography>
        </Grid>
        <Grid item container xs={12} md={4} justify="center">
          <Box
            justifySelf="center"
            maxWidth={440}
            minHeight={400}
            pt={4}
            pb={4}
          >
            <CircularProgressbar
              value={fundsPercent}
              //text={`${fundsPercent}%`}
              strokeWidth={50}
              styles={buildStyles({
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",

                // Text size
                textSize: "16px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
                // Colors
                pathColor: `rgba(76, 223, 76,1)`,
                textColor: "#FFF",
                trailColor: "rgba(76, 223, 76,.33)"
              })}
            />
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "#24a017", marginBottom: 20 }}
            >
              {fundsPercent}% Reached!
            </Typography>

            <Grid item xs={12} color="primary">
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                color="primary"
              >
                Goal:
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {goal} Wei
              </Typography>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                color="primary"
              >
                Current Funds:
              </Typography>

              <Typography variant="h6" align="center" gutterBottom>
                {totalFunds} Wei
              </Typography>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                color="primary"
              >
                Campaign End:
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {endDate}
              </Typography>
              <Grid container justify="center" style={{ marginTop: 22 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => setDialogOpen(true)}
                >
                  Become a Kickstarter !!!
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectPage;
