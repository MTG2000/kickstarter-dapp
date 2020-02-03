import React from "react";
import Web3 from "web3";

const getWeb3 = async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      return web3;
    } catch (error) {
      throw error;
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    const web3 = window.web3;
    console.log("Injected web3 detected.");
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);
    console.log("No web3 instance injected, using Local web3.");
    alert(
      "You need MetaMask browser extension to be able to Publish/Fund a Campaign"
    );
    return web3;
  }
};

function withWeb3(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.checkAccount = this.checkAccount.bind(this);
      this.state = {
        web3: null,
        account: null
      };
    }

    async componentDidMount() {
      const web3 = await getWeb3();
      this.setState({ ...this.state, web3 });
      this.checkAccount(web3);
      setInterval(() => this.checkAccount(web3), 1000);
    }

    componentWillUnmount() {
      //
    }

    //Check every amount of seconds if the metamask account has changed
    async checkAccount(web3) {
      const accounts = await web3.eth.getAccounts();
      if (this.state.account !== accounts[0]) {
        this.setState({ ...this.state, account: accounts[0] });
      }
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
}

export default withWeb3;
