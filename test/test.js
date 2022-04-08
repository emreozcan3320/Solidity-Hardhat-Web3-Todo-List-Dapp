const { expect } = require("chai");
const { ethers } = require("hardhat");

/* describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
}); */

describe("TodoApp", function () {
    it("Should add new item to todo list", async function () {
        const TodoApp = await ethers.getContractFactory("TodoApp");
        const todoApp = await TodoApp.deploy();
        await todoApp.deployed();

        const itemCount = await todoApp.getItemCount();
        expect(itemCount).to.equal(0);

        const addItemTx = await todoApp.addItem("Buy milk!");
        // wait until the transaction is mined
        await addItemTx.wait();

        const itemList = await todoApp.getList();
        expect(itemList.length).to.equal(1);
        expect(itemList[0]).to.equal("Buy milk!");
    });

    it("Should delete the selected item from todo list", async function () {
        const TodoApp = await ethers.getContractFactory("TodoApp");
        const todoApp = await TodoApp.deploy();
        await todoApp.deployed();

        /* const itemListMock = ["Buy  milk", "Clean apartment", "Prepare dinner"];
        for (const item of itemListMock) {
            let addItemTx = await todoApp.addItem(item);
            addItemTx.wait();
        }

        const itemListResponse = await todoApp.getList();
        expect(itemListResponse.length).to.equal(3);
        for (let i = 0; i < itemListResponse.length; i++) {
            expect(itemListResponse[i]).to.equal(itemListMock[i]);
        } */

        await expect(todoApp.removeItem(1)).to.be.revertedWith('Delete functionality deactivated by admin');

        /*  const removeItemTx = await todoApp.removeItem(1);
         removeItemTx.wait()
         itemListMock.splice(1, 1)
         const itemListResponseAfterDelete = await todoApp.getList();
         expect(itemListResponseAfterDelete.length).to.equal(2);
         for (let i = 0; i < itemListResponseAfterDelete.length; i++) {
             expect(itemListResponseAfterDelete[i]).to.equal(itemListMock[i]);
         } */
    });

});