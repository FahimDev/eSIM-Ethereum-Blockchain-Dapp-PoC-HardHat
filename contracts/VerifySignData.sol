// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

// https://medium.com/coinmonks/convert-solidity-code-to-uml-flow-diagrams-3a5cd412177
contract VerifySignData is EIP712 {
    using ECDSA for bytes32;

    // https://github.com/apurbapokharel/EIP712Example/blob/master/contracts/SimpleStorage.sol
    // https://gist.github.com/markodayan/e05f524b915f129c4f8500df816a369b

    bytes32 DOMAIN_SEPARATOR;

    struct EIP712Domain {
        string name;
        string version;
        uint256 chainId;
        address verifyingContract;
    }

    struct WeightedVector {
        string title;
        string brand;
    }

    bytes32 constant EIP712DOMAIN_TYPEHASH =
        keccak256(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        );

    bytes32 constant WEIGHTEDVECTOR_TYPEHASH =
        keccak256("WeightedVector(string title, string brand)");

    constructor() EIP712("MNOReg","1") {
        DOMAIN_SEPARATOR = hash(
            EIP712Domain({
                name: "MNOReg",
                version: "1",
                verifyingContract: 0xF14152cEab940425A2b70940BBF244c9E0DFEC27,
                chainId: 1337
            })
        );
    }

    function hash(EIP712Domain memory eip712Domain)
        internal
        pure
        returns (bytes32)
    {
        return
            keccak256(
                abi.encode(
                    EIP712DOMAIN_TYPEHASH,
                    keccak256(bytes(eip712Domain.name)),
                    keccak256(bytes(eip712Domain.version)),
                    eip712Domain.chainId,
                    eip712Domain.verifyingContract
                )
            );
    }

    // function hash(WeightedVector memory weightedVector)
    //     internal
    //     pure
    //     returns (bytes32)
    // {
    //     return
    //         keccak256(
    //             abi.encode(
    //                 WEIGHTEDVECTOR_TYPEHASH,
    //                 keccak256(bytes(weightedVector.title)),
    //                 keccak256(bytes(weightedVector.brand))
    //             )
    //         );
    // }

    function _hash(WeightedVector calldata weightedVector)
        internal
        view
        returns (bytes32)
    {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                    WEIGHTEDVECTOR_TYPEHASH,
                    keccak256(bytes(weightedVector.title)),
                    keccak256(bytes(weightedVector.brand))
                    )
                )
            );
    }

    function _verify(
        WeightedVector calldata weightedVector,
        bytes memory signature
    ) external view returns (address) {
        bytes32 digest = _hash(weightedVector);

        return ECDSA.recover(digest, signature);
    }

    // function verify(
    //     WeightedVector memory weightedVector,
    //     uint8 v,
    //     bytes32 r,
    //     bytes32 s
    // ) external view returns (address) {
    //     // Note: we need to use `encodePacked` here instead of `encode`.
    //     bytes32 digest = keccak256(
    //         abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, hash(weightedVector))
    //     );
    //     return ecrecover(digest, v, r, s);
    // }
}
