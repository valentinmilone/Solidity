require('babel-register');
require('babel-polyfill');

var HDWalletProvider = require("truffle-hdwallet-provider")
var mnemonic = ""

module.exports = {
  networks: {

    // Ganache 
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },

    // Binance Smart Chain (BSC)
    bscTestnet: {
      provider: () => new HDWalletProvider(mnemonic, "https://data-seed-prebsc-1-s1.binance.org:8545"),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
 
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.6.8",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
