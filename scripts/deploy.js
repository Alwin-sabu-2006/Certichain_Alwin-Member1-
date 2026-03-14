const hre = require("hardhat");

async function main() {
  console.log("Deploying CertiChain...");

  const CertiChain = await hre.ethers.getContractFactory("CertiChain");
  const certichain = await CertiChain.deploy();

  await certichain.waitForDeployment();

  const address = await certichain.getAddress();
  console.log("✅ CertiChain deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});