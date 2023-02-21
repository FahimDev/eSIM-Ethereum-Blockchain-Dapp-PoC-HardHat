// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.5.0 <0.9.0;
// Data Transfer Object (DTO)

/**
 * @title RewardCoinDTO
 * @dev This script holds all the necessary struct model.
 */

// model a member
struct Member {
    address memberAddress;
    uint points;
    bool isRegistered;
}

// model points transaction
enum TransactionType {
    Earned,
    Redeemed
}

struct PointsTransaction {
    uint timestamp;
    uint points;
    TransactionType transactionType;
    address memberAddress;
    address partnerAddress;
}
