import { expect } from "chai";
import { ethers } from "hardhat";
import { ZineNFT } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("ZineNFT", function () {
  let zineNFT: ZineNFT;
  let owner: HardhatEthersSigner;
  let user: HardhatEthersSigner;
  const tokenURI = "ipfs://some-hash";

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    const ZineNFTFactory = await ethers.getContractFactory("ZineNFT");
    // Deploy with the 'owner' as the initial owner
    zineNFT = await ZineNFTFactory.deploy(owner.address);
    await zineNFT.waitForDeployment();
  });

  it("Should deploy with the correct name and symbol", async function () {
    expect(await zineNFT.name()).to.equal("Zine NFT");
    expect(await zineNFT.symbol()).to.equal("ZINE");
  });

  it("Should set the deployer as the owner", async function () {
    expect(await zineNFT.owner()).to.equal(owner.address);
  });

  describe("Minting", function () {
    it("Should allow the owner to mint a new NFT", async function () {
      await expect(zineNFT.connect(owner).safeMint(user.address, tokenURI))
        .to.emit(zineNFT, "Transfer")
        .withArgs(ethers.ZeroAddress, user.address, 0);
      
      expect(await zineNFT.ownerOf(0)).to.equal(user.address);
      expect(await zineNFT.balanceOf(user.address)).to.equal(1);
      expect(await zineNFT.tokenURI(0)).to.equal(tokenURI);
    });

    it("Should prevent non-owners from minting", async function () {
      await expect(
        zineNFT.connect(user).safeMint(user.address, tokenURI)
      ).to.be.revertedWithCustomError(zineNFT, "OwnableUnauthorizedAccount").withArgs(user.address);
    });

    it("Should increment token IDs", async function () {
      const anotherUser = (await ethers.getSigners())[2];
      const anotherURI = "ipfs://another-hash";

      await zineNFT.connect(owner).safeMint(user.address, tokenURI);
      await zineNFT.connect(owner).safeMint(anotherUser.address, anotherURI);

      expect(await zineNFT.ownerOf(0)).to.equal(user.address);
      expect(await zineNFT.tokenURI(0)).to.equal(tokenURI);

      expect(await zineNFT.ownerOf(1)).to.equal(anotherUser.address);
      expect(await zineNFT.tokenURI(1)).to.equal(anotherURI);
    });
  });
});