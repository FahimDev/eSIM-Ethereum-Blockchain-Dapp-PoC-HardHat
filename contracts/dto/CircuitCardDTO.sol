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

enum MNOOperationalStatus {
    OPERATIONAL,
    INACTIVE
}

struct MNO {
    uint id;
    string title;
    string brandName;
    string network;
    uint prefix;
    uint mcc; // MCC - Mobile Country Code
    uint mncc; //  MNC - Mobile Network Code
    MNOOperationalStatus status;
}