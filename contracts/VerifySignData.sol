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
        keccak256("WeightedVector(string title,string brand)");

    string private constant SIGNING_DOMAIN = "MNOReg";

    string private constant SIGNATURE_VERSION = "1";
    constructor() EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) {
    }

    function _hash(WeightedVector calldata weightedVector)
        internal
        view
        returns (bytes32)
    {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                    keccak256("WeightedVector(string title,string brand)"),
                    keccak256(bytes(weightedVector.title)),
                    keccak256(bytes(weightedVector.brand))
                    )
                )
            );
    }

    function _verify(
        WeightedVector calldata weightedVector,
        bytes calldata signature
    ) external view returns (address) {
        bytes32 digest = _hash(weightedVector);
        return ECDSA.recover(digest, signature);
    }
}
