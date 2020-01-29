import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";

import ProjectsList from "./ProjectsList";
import Loading from "../layouts/Loading";

const MainPage = ({ web3, account, campaignFactory }) => {
  const [campaignsNum, setCampaignsNum] = useState(-1);

  useEffect(() => {
    (async () => {
      const numOfProjects = await campaignFactory.methods
        .campaignsCount()
        .call();
      setCampaignsNum(numOfProjects);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!campaignFactory)
    return <Loading msg="Loadign web3 & your account...." />;

  return (
    <Container>
      <ProjectsList
        web3={web3}
        campaignFactory={campaignFactory}
        campaignsNum={campaignsNum}
      />
    </Container>
  );
};

export default MainPage;
