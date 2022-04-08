const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const TodoApp = await hre.ethers.getContractFactory("TodoApp");
  const todoApp = await TodoApp.deploy();

  await todoApp.deployed();

  console.log("TodoApp deployed to:", todoApp.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
