// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;
// https://ethereum.stackexchange.com/questions/3609/returning-a-struct-and-reading-via-web3/3614#3614

import "hardhat/console.sol";
import "./dto/CircuitCardDTO.sol";

// Style Guide: https://docs.soliditylang.org/en/v0.8.14/style-guide.html#order-of-functions
contract MobileNetworkOperator {
    string public title;
    string public symbol;
    address public owner;
    MNO[] private _mnoOrg;
    mapping(uint => MNOCommunicationProfile[]) mnoCollectionByOperator;

    event CreatedMNO(
        uint indexed id,
        string title,
        string brandName,
        string network,
        uint prefix,
        uint mcc,
        uint mnc,
        address signer
    );

    function initialize(
        string memory operatorTitle_,
        string memory contractSymbol_
    ) external {
        title = operatorTitle_;
        symbol = contractSymbol_;
        owner = msg.sender;
    }

    function showAllMNO() external view returns (MNO[] memory) {
        return _mnoOrg;
    }

    function getMNOByIndexId(uint indexId) external view returns (MNO memory) {
        MNO memory _targetedMNO = _mnoOrg[indexId];
        return _targetedMNO;
    }

    function totalIndexedMNO() external view returns (uint) {
        return _mnoOrg.length;
    }

    function getProfilesByMNOId(
        uint mnoId
    ) external view returns (MNOCommunicationProfile[] memory) {
        MNOCommunicationProfile[]
            memory _targetProfiles = mnoCollectionByOperator[mnoId];
        return _targetProfiles;
    }

    function createMNO(
        string memory _title,
        string memory _brandName,
        string memory _network,
        uint _prefix,
        uint _mcc,
        uint _mnc,
        MNOOperationalStatus _status
    ) external returns (MNO memory) {
        MNO memory _mnoTempPayload;
        _mnoTempPayload.id = _mnoOrg.length + 1;
        _mnoTempPayload.title = _title;
        _mnoTempPayload.brandName = _brandName;
        _mnoTempPayload.network = _network;
        _mnoTempPayload.prefix = _prefix;
        _mnoTempPayload.mcc = _mcc;
        _mnoTempPayload.mnc = _mnc;
        _mnoTempPayload.status = _status;
        uint indexId = addMNO(_mnoTempPayload);
        console.log("==> DEBUG: Pushed MNO Index Number", indexId);
        emit CreatedMNO(
            _mnoTempPayload.id,
            _mnoTempPayload.title,
            _mnoTempPayload.brandName,
            _mnoTempPayload.network,
            _mnoTempPayload.prefix,
            _mnoTempPayload.mcc,
            _mnoTempPayload.mnc,
            msg.sender
        );
        console.log("==> DEBUG: Emited Data Title: ", _mnoTempPayload.title);
        return _mnoTempPayload;
    }

    function addMNOProfile(
        uint mnoId,
        MNOCommunicationProfile memory _mnoCommunicationProfile
    ) external returns (MNOCommunicationProfile memory) {
        mnoCollectionByOperator[mnoId].push(_mnoCommunicationProfile);
        return _mnoCommunicationProfile;
    }

    function addMNO(MNO memory _mno) internal returns (uint) {
        _mnoOrg.push(_mno);
        return _mnoOrg.length - 1;
    }
}
