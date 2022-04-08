//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract TodoApp is Ownable {
    string[] public items;
    bool public isDeletable;
    bool public isAddable;

    constructor() {
        isDeletable = false;
        isAddable = true;
    }

    function addItem(string memory _item) public {
        require(isAddable == true, "Add functionality deactivated by admin");
        items.push(_item);
    }

    function getList() public view returns (string[] memory) {
        return items;
    }

    function getItemCount() public view returns (uint256) {
        return items.length;
    }

    function removeItem(uint256 _index) public {
        require(
            isDeletable == true,
            "Delete functionality deactivated by admin"
        );
        require(_index < items.length, "index out of bound");
        for (uint256 i = _index; i < items.length - 1; i++) {
            items[i] = items[i + 1];
        }
        items.pop();
    }

    function activateDeleteFeature() public onlyOwner {
        require(isDeletable == false, "Delete functionality already active");
        isDeletable = true;
    }

    function activateAddFeature() public onlyOwner {
        require(isAddable == true, "Add functionality already active");
        isAddable = true;
    }

    function deleteAllItem() public onlyOwner {
        items = new string[](0);
    }
}
