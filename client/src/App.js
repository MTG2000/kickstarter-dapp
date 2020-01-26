import React, { useEffect, useState } from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { Container, Box, Typography } from "@material-ui/core";
import MainPage from "./components/MainPage";
import getWeb3 from "./utils/getWeb3";
import { Route, Switch } from "react-router-dom";
import ProjectPage from "./components/ProjectPage";
import { CampaignFactoryABI, CampaignFactoryAddress } from "./utils/contracts";

function App() {
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [campaignFactory, setCampaignFactory] = useState(null);

  //Set the web3 obj and assign the accounts
  useEffect(() => {
    (async () => {
      if (!web3) {
        const web3 = await getWeb3();
        setWeb3(web3);

        //   Setting the Campaign Factory Contract
        let instance = new web3.eth.Contract(
          CampaignFactoryABI,
          CampaignFactoryAddress
        );
        setCampaignFactory(instance);
      } else {
        checkAccount(web3);
        setInterval(() => checkAccount(web3), 1000);
      }
    })();
  }, [web3]);

  //Check every amount of seconds if the metamask account has changed
  const checkAccount = async web3 => {
    const accounts = await web3.eth.getAccounts();
    if (account !== accounts[0]) {
      setAccount(accounts[0]);
    }
  };

  if (!account)
    return (
      <Container>
        <Box mt={15}>
          <Typography align="center" variant="h3">
            ---Loading Web3 And Your Accounts---
          </Typography>
        </Box>
      </Container>
    );

  return (
    <div className="App">
      <Header />
      <Container>
        <Box mt={15}>
          <Switch>
            <Route
              path="/projects/:index/:title"
              component={p => (
                <ProjectPage
                  web3={web3}
                  account={account}
                  campaignFactory={campaignFactory}
                  {...p}
                />
              )}
            />
            <Route
              path="/"
              component={() => (
                <MainPage
                  web3={web3}
                  account={account}
                  campaignFactory={campaignFactory}
                />
              )}
            />
          </Switch>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
