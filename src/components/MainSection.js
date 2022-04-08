import React, { useState, useEffect } from "react";
import { ethers } from "ethers"
import todoApp from "../TodoAppAbi.json"

const todoAppContractAddress = "0x71e83458bF4A05Ce7E193D12B4a8995CcB2676B8";

const MainSection = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);
    const [listItem, setListItem] = useState([]);

    async function getTodoItems() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                todoAppContractAddress,
                todoApp.abi,
                signer
            );
            try {
                const response = await contract.getList();
                setListItem(response)
                console.log("Response : ", response);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if (isConnected) {
            getTodoItems()
        }
    }, [isConnected]);



    async function addItem() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                todoAppContractAddress,
                todoApp.abi,
                signer
            );
            try {
                const response = await contract.addItem("Buy Milk");
                console.log("Response : ", response);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (<div>
        {
            isConnected
                ? ((listItem.length === 0)
                    ? <div>There is no item at the list</div>
                    : <div>Items logged the console</div>)
                : (<div> You are not connected</div>)
        }
        <br></br>
        <button onClick={addItem}>Add Item</button>
    </div>)
}

export default MainSection;