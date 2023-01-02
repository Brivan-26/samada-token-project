const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Samada Token Faucet Contract", () => {
  async function deploySamadaTokenFaucetFixture() {
    const [owner] = await ethers.getSigners();
    const TokenFaucet = await ethers.getContractFactory("Faucet");
    const tokenFaucet = await TokenFaucet.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3");

    return { owner, tokenFaucet };
  }

  describe("Deployment", () => {
    it("Should set the owner", async () => {
      const { owner, tokenFaucet } = await loadFixture(
        deploySamadaTokenFaucetFixture
      );
      const contractOwner = await tokenFaucet.owner();
      expect(owner.address).to.equal(contractOwner);
    });
  });

  describe("States update", () => {
    it("Should update locktime", async () => {
      const { tokenFaucet } = await loadFixture(deploySamadaTokenFaucetFixture);

      await tokenFaucet.setLockTime(2);
      const lockTime = await tokenFaucet.lockTime();
      expect(lockTime).to.equal(2)
    });
    it("Should update token faucet withdrawal amount", async () => {
        const { tokenFaucet } = await loadFixture(deploySamadaTokenFaucetFixture)

        await tokenFaucet.setTokenFaucetNumber(10);
        const tokenFaucetNumber = await tokenFaucet.widthdrawalAmount()
        expect(Number(ethers.utils.formatEther(tokenFaucetNumber))).to.equal(10)
    })
  });
});
