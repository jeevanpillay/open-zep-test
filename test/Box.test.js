const { accounts, contract } = require("@openzeppelin/test-environment");
const { expect } = require("chai");

const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

// Load compiled artifacts
const Box = contract.fromArtifact("Box");

// Start test block
describe("Box", function() {
  const [owner, other] = accounts;

  const value = new BN("42");

  beforeEach(async function() {
    // Deploy a new Box contract for each test
    this.contract = await Box.new({ from: owner });
  });

  it("retrieve returns a value previously stored", async function() {
    // Store a value - recall that only the owner account can do this!
    await this.contract.store(value, { from: owner });

    // Test if returned value is the same one
    // Note: We used strings to compare 256 bit integers
    expect((await this.contract.retrieve()).toString()).to.be.bignumber.equal(
      value
    );
  });

  it("store emits an event", async function() {
    const receipt = await this.contract.store(value, { from: owner });

    // Test that a ValueChanged event was emitted with the new value
    expectEvent(receipt, "ValueChanged", { newValue: value });
  });

  it("non owner cannot store a value", async function() {
    await expectRevert(
      this.contract.store(value, { from: other }),
      "Ownable: caller is not the owner"
    );
  });
});
