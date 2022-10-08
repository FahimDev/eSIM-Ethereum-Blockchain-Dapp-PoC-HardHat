// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "./interfaces/ISIM.sol";
import "./abstracts/EmbeddedSIM.sol";

contract EmbeddedSIMManager is EmbeddedSIM {

    function getCardUniqueIds() external view override returns (string memory){

    }

    function getCardType(uint _cardUniqueId) external view override returns (string memory){

    }

    function enableMNOProfile(uint _mnoId) external view override returns (bool){

    }

}