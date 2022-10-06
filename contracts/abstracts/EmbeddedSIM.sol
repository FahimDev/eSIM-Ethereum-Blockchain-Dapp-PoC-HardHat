// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "../interfaces/ISIM.sol";

/**
 * Embedded SIM or eSIM is a form of programmable SIM card 
 * that is embedded directly into a device.
 */
abstract contract EmbeddedSIM is ISIM {

    function _dataPresentation() internal {

    }

    function _secureRouting() internal {

    }

    /**
     * As eSIM is embedded can be from the manufacturing segment 
     * we can keep tract of the IMEI number from the beginning level
     * IMEI: International Mobile Equipment Identifier
     */
    function _assignIMEI() internal {

    }

}