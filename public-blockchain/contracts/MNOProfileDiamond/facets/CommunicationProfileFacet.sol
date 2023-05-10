// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";

contract CommunicationProfileFacet {
    bytes32 internal constant MNO_COMMUNICATION_PROFILE_POSITION =
        keccak256("communication.profile.facet"); // Namespace

    struct MNOCommunicationProfile {
        uint id;
        string title;
        string iccid;
        string msisdn;
        string imsi;
    }

    function getMNOCommunicationProfile()
        internal
        pure
        returns (MNOCommunicationProfile storage s)
    {
        bytes32 position = MNO_COMMUNICATION_PROFILE_POSITION;
        assembly {
            // A computer may have only two registers but around 16,000 slots in memory.
            // This is just returning the slot position.
            s.slot := position
        }
    }

    function setMNOCommunicationProfile(
        string calldata _title,
        string calldata _iccid,
        string calldata _msisdn,
        string calldata _imsi
    ) external {
        MNOCommunicationProfile storage mcp = getMNOCommunicationProfile();
        mcp.id = 1;
        mcp.title = _title;
        mcp.iccid = _iccid;
        mcp.msisdn = _msisdn;
        mcp.imsi = _imsi;
    }

    function getMNOCommunicationProfileTitle()
        external
        view
        returns (string memory)
    {
        return getMNOCommunicationProfile().title;
    }
}
