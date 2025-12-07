import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function Airdrop() {

    let [lamportBalance , setLamportBalance] = useState(null);

    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendAirdrop() {
        const ammount = document.getElementById("publicKey").value;
        await connection.requestAirdrop(wallet.publicKey, ammount * 1000000000);
        alert("Airdrop sol");
    }


    async function getBalance() {
        if (wallet?.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            setLamportBalance(balance / LAMPORTS_PER_SOL);
        }
    }

    useEffect(() => {
        getBalance();
    },[wallet?.publicKey, connection])

    return (

        <div>
            <input id="publicKey" type="text" placeholder="Enter ammount" />
            <button onClick={sendAirdrop}>Send Airdrop</button>
            <div>
                User balance : {lamportBalance !== null ? lamportBalance : "Loading..."}
            </div>

        </div>

    )
}