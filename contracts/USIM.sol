// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "../interfaces/ISIM.sol";

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

    private uint _mcc;
    private uint _mnc;
    private uint _serial,
    private uint _checkDigit,
    private uint _countryCode;
    private uint _operatorCode;
    private uint _operatorProvidedUniqueNumber;

    constructor(
        uint mcc_,
        uint mnc_,
        uint serial_,
        uint checkDigit_,
        uint countryCode_,
        uint operatorCode_,
        uint operatorProvidedUniqueNumber_
    ) {}

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
        returns (string memory)
    {}

    function enableMNOProfile(uint _mnoId)
        external
        view
        override
        returns (bool)
    {}
}
