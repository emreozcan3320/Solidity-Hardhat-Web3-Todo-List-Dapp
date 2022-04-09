import React, { useState, useEffect } from "react";
import { ethers } from "ethers"
import todoApp from "../TodoAppAbi.json"

const todoAppContractAddress = "0x71e83458bF4A05Ce7E193D12B4a8995CcB2676B8";

const MainSection = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);
    const [listItems, setListItems] = useState([]);
    const [input, setInput] = useState('');

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
                setListItems(response)
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



    async function addItem(text) {
        setInput('')
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                todoAppContractAddress,
                todoApp.abi,
                signer
            );
            try {
                const response = await contract.addItem(text);
                console.log("Response : ", response);
                const newLists = Object.assign([], listItems);
                newLists.push(text);
                setListItems(newLists);
            } catch (error) {
                console.log(error);
            }
        }

    }

    async function deleteItem(index) {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                todoAppContractAddress,
                todoApp.abi,
                signer
            );
            try {
                const response = await contract.removeItem(index);
                console.log("Response : ", response);
                const newLists = Object.assign([], listItems);
                newLists.splice(index, 1)
                setListItems(newLists);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const List = ({ listItems }) => {
        return (
            <ul className="list-group">
                {listItems.map(function (item, i) {
                    return <li className="list-group-item" key={i}>
                        <span>{item}</span>
                        <button type="button" className="btn btn-danger float-md-end" onClick={() => deleteItem(i)}>X</button>
                    </li>;
                })}
            </ul>
        )
    }


    return (<div className="container">
        {
            isConnected
                ? ((listItems.length === 0)
                    ? <div>There is no item at the list</div>
                    : <div>
                        <List listItems={listItems}></List>
                        <br></br>
                        <div className="row">
                            <div className="col-8">
                                <input type="text" className="form-control" id="customFile" value={input} onInput={e => setInput(e.target.value)} />
                            </div>
                            <div className="col-auto">
                                <button type="button" className="btn btn-success" onClick={() => addItem(input)}>Add Item</button>
                            </div>
                        </div>
                    </div>
                )
                : (<div> You are not connected</div>)
        }
    </div>)
}

export default MainSection;