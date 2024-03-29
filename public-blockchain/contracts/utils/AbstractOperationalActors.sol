// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

/**
 * Provides address of the current executing actor, including the
 * sender of the transaction.
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract AbstractOperationalActors {
    // Returns the address of request sender's (actor) address.
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    // Returns the Address of current contract executing actor. 
    function _executor() internal view virtual returns (address) {
        return address(this);
    }
}
