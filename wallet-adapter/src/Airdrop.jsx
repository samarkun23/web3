import { useConnection, useWallet } from "@solana/wallet-adapter-react"

export function Airdrop() {

    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendAirdrop(){
        const ammount = document.getElementById("publicKey").value;
        await connection.requestAirdrop(wallet.publicKey, ammount * 1000000000);
        alert("Airdrop sol");
    }

    return(

        <div>
            <input id="publicKey" type="text" placeholder="Enter ammount" />
            <button onClick={sendAirdrop}>Send Airdrop</button>
        </div>
    )
}