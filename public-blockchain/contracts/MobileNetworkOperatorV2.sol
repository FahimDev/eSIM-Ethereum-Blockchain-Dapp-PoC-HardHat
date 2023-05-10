// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";
import "./dto/CircuitCardDTO.sol";
import "./MobileNetworkOperator.sol";

// Style Guide: https://docs.soliditylang.org/en/v0.8.14/style-guide.html#order-of-functions
contract MobileNetworkOperatorV2 is MobileNetworkOperator {

    function version() external pure returns (string memory) {
        return "v2";
    }

}
