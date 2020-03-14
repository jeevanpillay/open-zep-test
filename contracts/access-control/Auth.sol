pragma solidity ^0.5.0;

contract Auth {
  address private adminstrator;

  constructor () public {
    adminstrator = msg.sender;
  }

  function isAdministrator(address user) public view returns (bool) {
    return user == adminstrator;
  }
}
