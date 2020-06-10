const { usePlugin } = require("@nomiclabs/buidler/config");
const hooks = require("./scripts/buidler-hooks");

usePlugin("@aragon/buidler-aragon");

module.exports = {
  // Default Buidler configurations. Read more about it at https://buidler.dev/config/
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://localhost:8545"
    },
    colony: {
      url: "http://localhost:8545",
      accounts: [
        "0x0355596cdb5e5242ad082c4fe3f8bbe48c9dba843fe1f99dd8272f487e70efae",
      ],
    },
  },
  solc: {
    version: "0.4.24",
    optimizer: {
      enabled: true,
      runs: 10000,
    },
  },
  // Etherscan plugin configuration. Learn more at https://github.com/nomiclabs/buidler/tree/master/packages/buidler-etherscan
  etherscan: {
    apiKey: "", // API Key for smart contract verification. Get yours at https://etherscan.io/apis
  },
  // Aragon plugin configuration
  aragon: {
    appServePort: 8001,
    clientServePort: 3000,
    clientPath: "./aragon-client",
    appSrcPath: "app/",
    appBuildOutputPath: "dist/",
    appName: "foo",
    hooks, // Path to script hooks
  },
};
