import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ZineNFTModule = buildModule("ZineNFTModule", (m) => {
  const zineNFT = m.contract("ZineNFT", []);

  return { zineNFT };
});

export default ZineNFTModule;
