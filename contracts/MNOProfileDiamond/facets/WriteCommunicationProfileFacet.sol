// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "../libraries/LibCommunicationProfileDiamond.sol";

contract WriteCommunicationProfileFacet {
    function setMNOCommunicationProfile(
        string calldata _title,
        string calldata _iccid,
        string calldata _msisdn,
        string calldata _imsi
    ) external {
        LibCommunicationProfileDiamond.setMNOCommunicationProfile(
            _title,
            _iccid,
            _msisdn,
            _imsi
        );
    }
}
