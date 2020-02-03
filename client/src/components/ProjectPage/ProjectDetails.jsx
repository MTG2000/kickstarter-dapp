import React from "react";
import {
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress
} from "@material-ui/core";
import Image from "../Image/Image";
import FundDialog from "./FundDialog";
import CircularProgressBarSeperated from "./CircularProgressBarSeperated";

const ProjectDetails = ({
  dialogOpen,
  setDialogOpen,
  fund,
  handleRefund,
  handleWithdraw,
  title,
  imgUrl,
  description,
  fundsPercent,
  goal,
  totalFunds,
  endDate,
  isOwner,
  amountDonated,
  campaignFailed,
  pending
}) => {
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
            <CircularProgressBarSeperated value={fundsPercent} />
            <Box py={5} />
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
              {campaignFailed && (
                <Typography
                  variant="h5"
                  align="center"
                  gutterBottom
                  color="error"
                >
                  Campaign Failed!!
                </Typography>
              )}
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                style={{ marginTop: 22 }}
              >
                {!isOwner && +amountDonated === 0 && !campaignFailed && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setDialogOpen(true)}
                  >
                    Become a Kickstarter !!!
                  </Button>
                )}
                {!isOwner && +amountDonated !== 0 && (
                  <>
                    {!campaignFailed && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => setDialogOpen(true)}
                      >
                        Support Us More!!!
                      </Button>
                    )}
                    <br />

                    {campaignFailed && (
                      <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onClick={handleRefund}
                      >
                        Refund
                      </Button>
                    )}
                  </>
                )}
                {isOwner && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleWithdraw}
                  >
                    Withdraw
                  </Button>
                )}
              </Grid>
            </Grid>
            {pending && (
              <Box px={3} py={4}>
                <Grid container justify="center" alignItems="center">
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    style={{ marginRight: 20 }}
                  >
                    Pending
                  </Typography>
                  <CircularProgress color="primary" />
                </Grid>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectDetails;
