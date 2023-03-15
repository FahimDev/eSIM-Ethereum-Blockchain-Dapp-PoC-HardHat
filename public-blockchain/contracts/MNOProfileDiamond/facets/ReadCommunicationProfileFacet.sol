// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "../libraries/LibCommunicationProfileDiamond.sol";

contract ReadCommunicationProfileFacet {
    function getMNOCommunicationProfileTitle()
        external
        view
        returns (string memory)
    {
        return LibCommunicationProfileDiamond.getMNOCommunicationProfileTitle();
    }

    function getMNOCommunicationProfile()
        external
        pure
        returns (LibCommunicationProfileDiamond.MNOCommunicationProfile memory)
    {
        return
            LibCommunicationProfileDiamond.getMNOCommunicationProfileStorage();
    }
}
