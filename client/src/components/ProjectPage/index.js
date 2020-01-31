import React, { useEffect, useState } from "react";
import { CampaignABI } from "../../utils/contracts";
import "react-circular-progressbar/dist/styles.css";
import date from "date-and-time";

import Loading from "../layouts/Loading";
import ProjectDetails from "./ProjectDetails";
import { Typography, Box } from "@material-ui/core";
import Notification from "../Notification";

const ProjectPage = props => {
  const { match, web3, account, campaignFactory } = props;
  const { index } = match.params;
  const [campaign, setCampaign] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gameNotFound, setGameNotFound] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    msg: "Hello World"
  });

  useEffect(() => {
    (async () => {
      try {
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
        const owner = await _campaign.methods.owner().call();
        const amountDonated = await _campaign.methods.funds(account).call();
        setProjectDetails({
          title,
          description,
          imgUrl,
          totalFunds,
          goal,
          endTime,
          amountDonated,
          isOwner: owner === account
        });
      } catch (error) {
        setGameNotFound(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gameNotFound)
    return (
      <Box py="3">
        <Typography variant="h2" align="center">
          No Project Found ....
        </Typography>
      </Box>
    );

  const fund = async value => {
    setDialogOpen(false);
    if (!value) return;
    try {
      await campaign.methods.fund().send({
        from: account,
        value: web3.utils.toWei(value.toString(), "Ether")
      });
      setNotification({
        open: true,
        msg: "Successfully Sent Money",
        type: "success"
      });
    } catch (error) {
      setNotification({
        open: true,
        msg: "Couldn't Send Money",
        type: "error"
      });
    }
  };

  const handleWithdraw = async () => {
    try {
      await campaign.methods.withdraw().send({ from: account });
      setNotification({
        open: true,
        msg: "Successfully Withdrawn",
        type: "success"
      });
    } catch (error) {
      setNotification({
        open: true,
        msg: "You cant Withdraw until the campaign Successed",
        type: "error"
      });
    }
  };

  const handleRefund = async () => {
    try {
      await campaign.methods.refund().send({ from: account });
      setNotification({
        open: true,
        msg: "Successfully Refunded",
        type: "success"
      });
    } catch (error) {
      setNotification({
        open: true,
        msg: "You can only Refund if the campaign fail",
        type: "error"
      });
    }
  };

  if (!projectDetails || !projectDetails.title)
    return <Loading height="70vh" msg="loading Project Data" />;

  const { totalFunds, goal, endTime } = projectDetails;

  let fundsPercent = totalFunds / goal;
  if (fundsPercent >= 1) fundsPercent = 100;
  else {
    fundsPercent *= 100;
    fundsPercent = fundsPercent.toFixed(1);
  }

  const endDate = date.format(new Date(+endTime * 1000), "YYYY/MM/DD HH:mm");

  return (
    <>
      <ProjectDetails
        dialogOpen={dialogOpen}
        fund={fund}
        setDialogOpen={setDialogOpen}
        handleWithdraw={handleWithdraw}
        handleRefund={handleRefund}
        fundsPercent={fundsPercent}
        endDate={endDate}
        {...projectDetails}
      />
      <Notification
        {...notification}
        handleClose={() => setNotification({ ...notification, open: false })}
      />
    </>
  );
};

export default ProjectPage;
