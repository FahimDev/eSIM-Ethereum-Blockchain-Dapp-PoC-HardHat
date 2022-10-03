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

    function transfer(address _to, uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Not Enough Token!");
        console.log(
            "==> DEBUG: Sender balance is %s tokens.",
            balances[msg.sender]
        );
        console.log("==> DEBUG: Sending %s tokens to %s .......", _amount, _to);
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        console.log(
            "==> DEBUG: Sender current balance is %s tokens.",
            balances[msg.sender]
        );
    }

    function balanceOf(address _account) external view returns (uint256) {
        return balances[_account];
    }
}
