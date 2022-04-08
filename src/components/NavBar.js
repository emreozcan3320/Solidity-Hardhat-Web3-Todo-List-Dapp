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
        <div>
            <div>Facebook</div>
            <div>Twitter</div>
            <div>Email</div>
            <div>About</div>
            <div>Team</div>

            <div>
                {
                    isConnected ? (
                        <div>Connected</div>
                    ) : (
                        <div>
                            <button onClick={connectAccount}>Connect Wallet</button>
                            <button onClick={hello}>Hello</button>
                        </div>
                    )
                }
            </div>
        </div>
    )

}

export default NavBar;