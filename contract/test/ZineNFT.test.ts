import { expect } from "chai";
import { ethers } from "hardhat";
import { ZineNFT } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("ZineNFT", function () {
  let zineNFT: ZineNFT;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;

  beforeEach(async function () {
    [user1, user2] = await ethers.getSigners();
    const ZineNFTFactory = await ethers.getContractFactory("ZineNFT");
    zineNFT = await ZineNFTFactory.deploy();
    await zineNFT.waitForDeployment();
  });

  it("Should deploy with the correct name and symbol", async function () {
    expect(await zineNFT.name()).to.equal("Zine NFT");
    expect(await zineNFT.symbol()).to.equal("ZINE");
  });

  describe("Minting", function () {
    const bookTitle1 = "My First Zine";
    const bookTitle2 = "Another Awesome Zine";

    it("Should allow any user to mint an NFT", async function () {
      // User1 mints an NFT
      await expect(zineNFT.connect(user1).mint(bookTitle1))
        .to.emit(zineNFT, "Transfer")
        .withArgs(ethers.ZeroAddress, user1.address, 0);

      expect(await zineNFT.ownerOf(0)).to.equal(user1.address);
      expect(await zineNFT.balanceOf(user1.address)).to.equal(1);
    });

    it("Should correctly store the book title", async function () {
      await zineNFT.connect(user1).mint(bookTitle1);
      expect(await zineNFT.getBookTitle(0)).to.equal(bookTitle1);
    });

    it("Should return the fixed tokenURI", async function () {
      await zineNFT.connect(user1).mint(bookTitle1);
      expect(await zineNFT.tokenURI(0)).to.equal("https://example.com/zine_dapp_metadata.json");
    });

    it("Should increment token IDs correctly", async function () {
      // User1 mints
      await zineNFT.connect(user1).mint(bookTitle1);
      // User2 mints
      await zineNFT.connect(user2).mint(bookTitle2);

      // Check NFT 0
      expect(await zineNFT.ownerOf(0)).to.equal(user1.address);
      expect(await zineNFT.getBookTitle(0)).to.equal(bookTitle1);

      // Check NFT 1
      expect(await zineNFT.ownerOf(1)).to.equal(user2.address);
      expect(await zineNFT.getBookTitle(1)).to.equal(bookTitle2);
    });

    it("Should revert when querying book title for a nonexistent token", async function () {
        await expect(zineNFT.getBookTitle(0)).to.be.revertedWith("ZineNFT: query for nonexistent token");
    });
  });
});
