// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";
import "./dto/CircuitCardDTO.sol";

contract MobileNetworkOperator {
    string public title;
    string public symbol;
    address private _owner;
    MNO[] private _mnoOrg;
    mapping(uint => MNOCommunicationProfile[]) mnoCollectionByOperator;

    constructor(
        string memory title_,
        string memory symbol_,
        address owner_
    ) {
        title = title_;
        symbol = symbol_;
        _owner = owner_;
    }

    function showAllMNO() external view returns (MNO[] memory) {
        return _mnoOrg;
    }

    function getMNOById(uint mnoId)
        external
        view
        returns (MNOCommunicationProfile[] memory)
    {
        MNOCommunicationProfile[] memory _targetMNO = mnoCollectionByOperator[
            mnoId
        ];
        return _targetMNO;
    }

    function addMNO(MNO memory _mno) external returns (uint) {
        _mnoOrg.push(_mno);
    }

    function addMNOProfile(
        uint mnoId,
        MNOCommunicationProfile memory _mnoCommunicationProfile
    ) external returns (MNOCommunicationProfile memory) {
        mnoCollectionByOperator[mnoId].push(_mnoCommunicationProfile);
    }
}
