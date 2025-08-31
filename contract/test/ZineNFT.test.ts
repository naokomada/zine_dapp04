


import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ZineNFT } from "../typechain-types";


describe("ZineNFT", function () {

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployZineNFTFixture() {
    
     // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const zine = await hre.viem.deployContract("ZineNFT");

    const publicClient = await hre.viem.getPublicClient();

    return {
      zine,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { zine } = await loadFixture(deployZineNFTFixture);

      expect(await zine.read.name()).to.equal("Zine NFT");
      expect(await zine.read.symbol()).to.equal("ZINE");
    });
  });
});
