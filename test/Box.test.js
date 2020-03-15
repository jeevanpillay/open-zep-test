const { accounts, contract } = require("@openzeppelin/test-environment");
const { expect } = require("chai");

// Load compiled artifacts
const Box = contract.fromArtifact("Box");

// Start test block
describe("Box", function() {
  const [owner] = accounts;

  beforeEach(async function() {
    // Deploy a new Box contract for each test
    this.contract = await Box.new({ from: owner });
  });

  it("retrieve returns a value previously stored", async function() {
    // Store a value - recall that only the owner account can do this!
    await this.contract.store(42, { from: owner });

    // Test if returned value is the same one
    // Note: We used strings to compare 256 bit integers
    expect((await this.contract.retrieve()).toString()).to.equal("42");
  });
});
