// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";
import "./dto/CircuitCardDTO.sol";

contract MNOCommunicationProfileManager {

    string public contractTitle;
    string public contractSymbol;
    uint public mnoID; // MNO ID will act as a Foreign Key to the Mobie Network Operator details
    uint public mcc; // MCC - Mobile Country Code
    uint public mnc; //  MNC - Mobile Network Code
    address private _owner;
    MNOCommunicationProfile[] private _mnoCommunicarionProfiles;

    constructor(
        string memory contractTitle_,
        string memory contractSymbol_,
        uint mnoID_,
        uint mcc_,
        uint mnc_  
    ) {
        contractTitle = contractTitle_;
        contractSymbol = contractSymbol_;
        mnoID = mnoID_;
        mcc = mcc_;
        mnc = mnc_;
        _owner = msg.sender;
    }

    function showAllCommunicationProfile() external view returns (MNOCommunicationProfile[] memory) {
        return _mnoCommunicarionProfiles;
    }

    function getMNOCommunicationProfileById(uint _communicationProfileIndexId)
        external
        view
        returns (MNOCommunicationProfile memory)
    {
        MNOCommunicationProfile memory _targetCommunicationProfile = _mnoCommunicarionProfiles[_communicationProfileIndexId];
        return _targetCommunicationProfile;
    }

    function createMNO(
        string memory _title,
        string memory _iccid,
        string memory _msisdn,
        string memory _imsi
    ) external returns (MNOCommunicationProfile memory) {
        MNOCommunicationProfile memory _communicationProfileTempPayload;
        _communicationProfileTempPayload.id = _mnoCommunicarionProfiles.length + 1;
        _communicationProfileTempPayload.title = _title;
        _communicationProfileTempPayload.iccid = _iccid;
        _communicationProfileTempPayload.msisdn = _msisdn;
        _communicationProfileTempPayload.imsi = _imsi;
        uint indexId = addMNOCommunicationProfile(_communicationProfileTempPayload);
        console.log("==> DEBUG: Pushed Communication Profile Index Number: ", indexId);
        return _communicationProfileTempPayload;
    }

    function addMNOCommunicationProfile(MNOCommunicationProfile memory _mnoCommunicarionProfile) internal returns (uint) {
        _mnoCommunicarionProfiles.push(_mnoCommunicarionProfile);
        return _mnoCommunicarionProfiles.length;
    }
}