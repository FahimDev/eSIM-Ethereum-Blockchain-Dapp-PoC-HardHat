// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

/**
 * SIM Subscriber Identity Module
 * Interfaces: https://docs.soliditylang.org/en/v0.8.16/contracts.html#interfaces
 */
interface ISIM {

    // =========== ENUM ===========
    enum SIMType { Consumer, M2M }

    enum SIMSize { 
        2FF,    // Standard / Mini SIM: 25X15mm 
        3FF,    // Micro SIM: 15X12mm
        4FF,    // Nano SIM: 12.3X8.8mm
        MFF2    // eSIM: 6.0X5.0mm
     }

    // =========== Events ===========
    /**
     * A SIM card needs to register a MNO Communication Profile in its Circuit Card
     * to communicate through the mobile network with the help of any Local Mobile Network Service. 
     * This registration event will directly store the Registration Data at Blockchain Storage.  
     * MNO: Mobile Network Operator
     */
    event RegisterMNO(
        uint indexed id,
        string cardUniqueId,
        uint mnoId,
        address signer
    );

    // =========== Functions ===========
    /**
     * A SIM's Circuit Card get identified with a unique identification number
     * For regular SIM its UICC gets identified with ICCID number as unique identity.
     * For eSIM its eUICC can hold multiple ICCID number but the eSIM's unique identity is
     * its eUICC-ID (EID) number. 
     * UICC: Universal Integrated Circuit Card
     * ICCID: Integrated Circuit Card ID
     */
    function getCardUniqueId() external view returns (string memory);

    /**
     * In general the card can have specific card type. For cunsumer level use
     * like, Call, message we are calling it consumer type. For IoT use we will use the term 
     * M2M type. (Machine to Machine)
     * Type: Consumer, M2M
     */
    function getCardType() external view returns (string memory);

    /**
     * A SIM must enable a registered MNO Communication profile to use the Local Mobile Network
     */
    function enableMNOProfile(uint mnoId) external view returns (bool);
}