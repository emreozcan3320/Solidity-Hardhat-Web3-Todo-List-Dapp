//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TodoApp {
    string[] public items;

    function addItem(string memory _item) public {
        items.push(_item);
    }

    function getList() public view returns (string[] memory) {
        return items;
    }

    function getItemCount() public view returns (uint256) {
        return items.length;
    }

    function removeItem(uint256 _index) public {
        require(_index < items.length, "index out of bound");
        for (uint256 i = _index; i < items.length - 1; i++) {
            items[i] = items[i + 1];
        }
        items.pop();
    }
}
