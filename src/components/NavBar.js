import React from "react";

const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            console.log("Wallet detected!");
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            setAccounts(accounts);
        }
    }

    async function hello() {
        console.log("Hello");
    }

    return (
        <ul className="justify-content-end navbar navbar-dark bg-dark navBar">
            <li className="nav-item navBarItem">
                <span className="text-light" aria-current="page">Facebook</span>
            </li>
            <li className="nav-item navBarItem">
                <span className="text-light" aria-current="page">Twitter</span>
            </li>
            <li className="nav-item navBarItem">
                <span className="text-light" aria-current="page">About</span>
            </li>
            <li className="nav-item navBarItem">
                {
                    isConnected
                        ? (<span className="badge bg-success">Wallet Connected</span>)
                        : (<button type="button" className="btn btn-primary" onClick={connectAccount}>Connect Wallet</button>)
                }
            </li>
        </ul>
    )

}

export default NavBar;