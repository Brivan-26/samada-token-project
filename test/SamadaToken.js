const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Smada Token Contract", function () {
  async function deploySamadaTokenFixture() {
    const [owner, address1] = await ethers.getSigners();

    const SamadaToken = await ethers.getContractFactory("SamadaToken");
    const contract = await SamadaToken.deploy(1000000, 5);
    return { contract, owner, address1 };
  }

  describe("Should Deploy correctly", function () {
    it("Should set the name correctly", async () => {
      const { contract } = await loadFixture(deploySamadaTokenFixture);
      expect(await contract.name()).to.equal("SamadaToken");
    });

    it("Should set the Block reward correctly", async () => {
      const { contract } = await loadFixture(deploySamadaTokenFixture);
      const contractBlockReward = await contract.blockReward();
      expect(Number(ethers.utils.formatEther(contractBlockReward))).to.equal(5);
    });
    it("Should set the right owner", async function () {
      const { owner, contract } = await loadFixture(deploySamadaTokenFixture);
      const contractOwner = await contract.owner();
      expect(contractOwner).to.equal(owner.address);
    });

    it("Should set the Symbol correctly", async () => {
      const { owner, contract } = await loadFixture(deploySamadaTokenFixture);
      expect(await contract.symbol()).to.equal("SDA");
    });

    it("Should give owner 700000 tokens", async () => {
      const { owner, contract } = await loadFixture(deploySamadaTokenFixture);
      const ownerBalance = await contract.balanceOf(owner.address);
      expect(Number(ethers.utils.formatEther(ownerBalance))).to.equal(700000);
    });

    it("Should set correctly the cap", async () => {
      const { contract } = await loadFixture(deploySamadaTokenFixture);
      const contractCap = await contract.cap();
      expect(Number(ethers.utils.formatEther(contractCap))).to.equal(1000000);
    });
  });

  describe("Should Transfer correctly", () => {
    it("Should fail when not having enough tokens", async () => {
      const { contract, owner, address1 } = await loadFixture(
        deploySamadaTokenFixture
      );
      const initialOwnerBalance = await contract.balanceOf(owner.address);
      await expect(
        contract.connect(address1).transfer(owner.address, 5)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      expect(await contract.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should succeed when having enough tokens", async () => {
      const { contract, owner, address1 } = await loadFixture(
        deploySamadaTokenFixture
      );

      await contract.transfer(address1.address, 100000);
      const account1Balance = await contract.balanceOf(address1.address);
      expect(account1Balance).to.equal(100000);
    });
  });
});
