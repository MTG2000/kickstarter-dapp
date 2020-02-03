require("dotenv").config();
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          `https://ropsten.infura.io/v3/${process.env.INFURA_API}`
        );
      },
      network_id: 3,
      gas: 4000000 //make sure this gas allocation isn't over 4M, which is the max
    },
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  },
  contracts_directory: "./contracts/",
  contracts_build_directory: "./client/src/contracts/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
