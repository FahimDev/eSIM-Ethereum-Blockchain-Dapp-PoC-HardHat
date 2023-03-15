// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "./interfaces/IRewardCoin.sol";
import "./storage/RewardCoinStorage.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title RewardCoinV2
 * @dev This contract is a 2nd Version of RewardCoin contract which will be called through
 * the proxy contract which is designed by the Universal Upgradeable Proxie (UUP) [EIP-1822] pattern.
 */

contract RewardCoinV2 is
    IRewardCoin,
    RewardCoinStorage,
    Initializable,
    ERC20Upgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    function initialize(
        string memory coinName_,
        string memory coinSymbol_
    ) public initializer {
        __ERC20_init(coinName_, coinSymbol_);
        __Ownable_init();
        __UUPSUpgradeable_init();

        _mint(msg.sender, 100000 * 10 ** decimals());
    }

    modifier newUser(address account) {
        //check account in existing members
        require(
            !members[account].isRegistered,
            "Account already registered as Member."
        );
        _;
    }

    modifier isMember(address account) {
        // only member can call
        require(
            members[account].isRegistered,
            "Sender not registered as Member."
        );
        _;
    }

    modifier hasPoints(address member, uint _points) {
        // verify enough points for member
        require(members[member].points >= _points, "Insufficient points.");
        _;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyOwner {}

    function usePoints(
        uint _points,
        address _memberAddress,
        address _partnerAddress
    ) external virtual override {
        // update member points
        members[_memberAddress].points =
            members[_memberAddress].points -
            _points;

        // add transction
        transactionsInfo.push(
            PointsTransaction({
                points: _points,
                timestamp: block.timestamp,
                transactionType: TransactionType.Redeemed,
                memberAddress: members[_memberAddress].memberAddress,
                partnerAddress: _partnerAddress
            })
        );
    }

    function setMembershipLevel(
        address _memberAddress,
        string memory _membershipLevel
    ) external virtual override {}

    function version() external pure virtual override returns (string memory) {
        return "v2!";
    }
}
