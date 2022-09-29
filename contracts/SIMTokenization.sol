// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

// For debugging
import "hardhat/console.sol";

contract SIMTokenization {
    string public name = "Bangladesh Telecommunications Company Limited-Token";
    string public symbol = "BTCL-T";
    uint256 public totalSupply = 100;
    /**
     * When we are declearing a Public varaible in Solidity
     * by default a Getter Method is created.
     */

    address public owner;
    // Map of how many tokens owned by each addresses are noted as Balance.
    mapping(address => uint256) balances;

    constructor() {
        // Whoever is starting the contract will own all the Tokens by himself.
        balances[msg.sender] = totalSupply;
        // And the owner will be the contract creator himself.
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not Enough Token!");
        console.log(
            "==> DEBUG: Sender balance is %s tokens.",
            balances[msg.sender]
        );
        console.log("==> DEBUG: Sending %s tokens to %s .......", amount, to);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        console.log(
            "==> DEBUG: Sender current balance is %s tokens.",
            balances[msg.sender]
        );
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
