
const hre = require("hardhat");

async function main() {
  const SamadaToken = await hre.ethers.getContractFactory("SamadaToken");
  const samadaToken = await SamadaToken.deploy(10000000, 10);
  await samadaToken.deployed();

  console.log(
    `Samada Token is deployed succesfully to: ${samadaToken.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
