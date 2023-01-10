// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

import "../dto/RewardCoinDTO.sol";

/**
 * @title RewardCoinStorage
 * @dev This contract is responsible for holding all the state
 * variables to carry out the storage of any contract.
 */

contract RewardCoinStorage {
    // Member are mapped with their address
    mapping(address => Member) public members;

    PointsTransaction[] public transactionsInfo;
}
