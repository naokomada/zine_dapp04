import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import 'dotenv/config'

const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    base_sepolia: {
      url: BASE_SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;



// import "dotenv/config";

// const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;

// const config: HardhatUserConfig = {
//   solidity: "0.8.24",
//   networks: {
//     base_sepolia: {
//       url: BASE_SEPOLIA_RPC_URL,
//       accounts: [PRIVATE_KEY],
//     },
//   },
// };

// export default config;