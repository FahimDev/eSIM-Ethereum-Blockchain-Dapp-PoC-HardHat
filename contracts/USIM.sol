// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";
import "./interfaces/ISIM.sol";
import "./dto/CircuitCardDTO.sol";
import "./utils/AbstractOperationalActors.sol";

/**
 * The SIM card which support's 2G and 3G both type of network is
 * known as USIM. This SIM's UICC is identified with its ICCID
 * (Integrated Circuit Card IDentification). The ICCID specifies
 * maximum of 19 digits where First two digits are Reserved for Telecommunication,
 * next 1-3 digits are MCC number, next Issuer Identifier Numbers are allocated by
 * the National Administration then comes the serial number and the ending is the check digit.
 * MCC: Mobile Country Code
 * MNC: Mobile Network Code
 */
contract USIM is ISIM {
    uint private _iccid;
    MNOCommunicationProfile private _mnoCommunicationProfile;

    constructor(
        uint iccid_,
        MNOCommunicationProfile memory mnoCommunicationProfile_
    ) {
        _iccid = iccid_;
        _mnoCommunicationProfile = mnoCommunicationProfile_;
    }

    function getCardUniqueIds()
        external
        view
        override
        returns (string memory)
    {}

    function getCardType(uint _cardUniqueId)
        external
        view
        override
        returns (SIMType)
    {
        console.log("==> DEBUG: Card Unique ID : %s <==", _cardUniqueId);
        SIMType cardType = SIMType.CONSUMER;
        return cardType;
    }

    function enableMNOProfile(uint _mnoId)
        external
        view
        override
        returns (bool)
    {}
}
