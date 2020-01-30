import React, { useEffect, useState } from "react";
import { CampaignABI } from "../../utils/contracts";
import "react-circular-progressbar/dist/styles.css";
import date from "date-and-time";

import Loading from "../layouts/Loading";
import ProjectDetails from "./ProjectDetails";

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
    <ProjectDetails
      dialogOpen={dialogOpen}
      fund={fund}
      title={title}
      imgUrl={imgUrl}
      description={description}
      fundsPercent={fundsPercent}
      goal={goal}
      totalFunds={totalFunds}
      endDate={endDate}
      setDialogOpen={setDialogOpen}
    />
  );
};

export default ProjectPage;
