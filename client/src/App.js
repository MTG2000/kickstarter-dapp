import React, { useEffect, useState, Suspense, lazy } from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { Box } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { CampaignFactoryABI, CampaignFactoryAddress } from "./utils/contracts";
import Loading from "./components/layouts/Loading";
import withWeb3 from "./utils/Web3Provider";

const MainPage = lazy(() => import("./components/MainPage"));
const NewProjectPage = lazy(() => import("./components/NewProjectPage"));
const ProjectPage = lazy(() => import("./components/ProjectPage"));

function App({ web3, account }) {
  const [campaignFactory, setCampaignFactory] = useState(null);

  useEffect(() => {
    (async () => {
      if (web3) {
        const _campaignFactory = new web3.eth.Contract(
          CampaignFactoryABI,
          CampaignFactoryAddress
        );
        setCampaignFactory(_campaignFactory);
      }
    })();
  }, [web3]);

  if (!account || !campaignFactory)
    return <Loading msg="Loading Web3 and accounts" />;

  return (
    <div className="App">
      <Header />
      <Box pb={10}>
        <Suspense fallback={<Loading msg="Loading Page" />}>
          <Switch>
            <Route
              path="/projects/new"
              component={() => (
                <NewProjectPage
                  web3={web3}
                  account={account}
                  campaignFactory={campaignFactory}
                />
              )}
            />
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
        </Suspense>
      </Box>
      <Footer />
    </div>
  );
}

export default withWeb3(App);
