// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "./interfaces/IRewardCoin.sol";
import "./storage/RewardCoinStorage.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title RewardCoin
 * @dev This contract will act as a the Universal Upgradeable Proxie (UUP) [EIP-1822].
 */

contract RewardCoin is
    IRewardCoin,
    RewardCoinStorage,
    Initializable,
    ERC20Upgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    /// @custom:oz-upgrades-unsafe-allow constructor

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
    ) internal override onlyOwner {}

    function usePoints(
        uint _points,
        address _memberAddress,
        address _partnerAddress
    ) external override {}

    function setMembershipLevel(
        address _memberAddress,
        string memory _membershipLevel
    ) external override {}

    function version() external pure override returns (string memory) {
        return "v1!";
    }
}
