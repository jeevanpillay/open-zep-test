const Web3 = require("web3");
const { setupLoader } = require("@openzeppelin/contract-loader");

async function main() {
  const web3 = new Web3("http://localhost:8545");
  const loader = setupLoader({ provider: web3 }).web3;

  // contract instance
  const address = "0xCfEB869F69431e42cdB54A4F4f105C19C080A601";
  const box = loader.fromArtifact("Box", address);

  const accounts = await web3.eth.getAccounts();
  await box.methods
    .store(20)
    .send({ from: accounts[0], gas: 50000, gasPrice: 1e6 });
  const value = await box.methods.retrieve().call();
  console.log("Box value is", value);
}

main();
