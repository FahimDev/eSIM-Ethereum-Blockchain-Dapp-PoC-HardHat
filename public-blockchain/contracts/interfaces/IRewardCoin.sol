// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

interface IRewardCoin {

    // =========== ENUM ===========

    enum MembershipLevel { 
        PLATINUM,
        GOLD,
        SILVER,
        BRONZE
     }

    // =========== Events ===========

    /**
     * 
     */
    event MembershipUpgradeEvent(
        uint indexed id,
        address memberAddress
    );

    /**
     * This method is responsible for updating the member's balance
     * after using any Coins or Points
     */
    function usePoints (uint _points, address _memberAddress, address _partnerAddress) external;

    /**
     * This method will set the level of a member.
     */
    function setMembershipLevel(address _memberAddress, string memory _membershipLevel) external;

    /**
     * This method will return the version of the smart contract as a string.
     * Example: "v2!"
     */
    function version() external pure returns (string memory);
}