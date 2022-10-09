// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "./interfaces/ISIM.sol";
import "./abstracts/EmbeddedSIM.sol";

contract EmbeddedSIMManager is EmbeddedSIM {

    address private _iSIMAddress;
    
    // Adding Dependency Injection of USIM Contract in this contract (EmbeddedSIMManager).
    constructor (address iSIMAddress_) {
        _iSIMAddress = iSIMAddress_;
    }

    function getCardUniqueIds() external view override returns (string memory){

    }

    function getCardType(uint _cardUniqueId) external view override returns (SIMType){
        return ISIM(_iSIMAddress).getCardType(_cardUniqueId);
    }

    function enableMNOProfile(uint _mnoId) external view override returns (bool){

    }

}