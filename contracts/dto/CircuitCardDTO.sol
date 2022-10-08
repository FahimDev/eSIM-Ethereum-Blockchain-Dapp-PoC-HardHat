// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.5.0 < 0.9.0;
// Data Transfer Object (DTO)

// ** Communication Profile **
// MNO : Mobile Network Operator
struct MNOCommunicationProfile {
    uint id;
    string title;
    string iccid;
    string msisdn;
    string imsi;
}