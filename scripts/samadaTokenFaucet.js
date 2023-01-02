
async function main() {
  
  const SamadaTokenFaucet = await ethers.getContractFactory("Faucet");
  const samadaTokenFaucet = await SamadaTokenFaucet.deploy("0x5aE164b2a67DE59E96bEEeb81F8eE96887c96c2d");

  await samadaTokenFaucet.deployed();

  console.log(
    `Samada Token is deployed succesfully to: ${samadaTokenFaucet.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
