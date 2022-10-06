// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

/**
 * SIM Subscriber Identity Module
 */
interface ISIM {

    // =========== Events ===========
    // Event Data will be directly located at Blockchain Storage.
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
     * A SIM card needs to register a MNO Communication Profile in its Circuit Card
     * to communicate through the mobile network with the help of any Local Mobile Network Service. 
     * MNO: Mobile Network Operator
     */
    function _registerMNOProfile(string memory _cardUniqueId, uint _mnoId, address _signer) internal view returns (string memory);

    /**
     * A SIM must enable a registered MNO Communication profile to use the Local Mobile Network
     */
    function enableMNOProfile(uint mnoId) external view returns (bool);
}