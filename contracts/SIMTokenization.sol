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

    /**
     * Function modifiers are used to change or
     * restrict the behavior of a function in a smart contract.
     * */  
    // Modifier Naming Ref: https://docs.soliditylang.org/en/v0.8.16/style-guide.html#modifier-names
    modifier onlyOwner() {
        console.log("==> DEBUG: Request Sender (modifier) : %s <==", msg.sender);
        // We are using 'Require' to save Gas by preventing unnecessary method execution.
        require(msg.sender == owner, "Not Owner");
        // If require is true then proceed to next operations.
        _;
    }

    /**
     * Ref: https://medium.com/coinmonks/gas-cost-of-solidity-library-functions-dbe0cedd4678
     * External is Gas Efficient. Only be called from outside.​
     * We can use Public Function but can not use External Function in the same Contract.
     */
    function changeOwnership(address _newOwnerAddress)
        external
        returns (string memory)
    {
        require _newOwnerAddress != address(0), "Invalid Address");
        string memory ownerChangeMsg;
        console.log(
            "==> DEBUG: Proposed ownership address : %s <==",
         _newOwnerAddress
        );
        console.log("==> DEBUG: Current ownership address: %s <==", owner);
        owner = _newOwnerAddress;
        console.log("==> DEBUG: Updated ownership address: %s <==", owner);
        // Ternary Operator
        ownerChangeMsg = owner == _newOwnerAddress
            ? "Owner Changed!"
            : "Someting went wrong!";
        console.log("==> DEBUG: Return String: %s <==", ownerChangeMsg);
        return ownerChangeMsg;
    }

    function transfer(address _to, uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Not Enough Token!");
        console.log(
            "==> DEBUG: Sender balance is %s tokens.",
            balances[msg.sender]
        );
        console.log("==> DEBUG: Sending %s tokens to %s .......", _amount, _to);
        // Updating mapped key's value.
        balances[msg.sender] -= _amount;
        // Creating new Key and assigning its value. (Mapping)
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
