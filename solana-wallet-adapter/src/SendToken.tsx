import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export function SendToken () {
    const wallet = useWallet();
    const {connection} = useConnection();

    async function sendToken() {
        if (!wallet.publicKey) {
            console.error("Wallet not connected");
            return;
        }

        const to = (document.getElementById("to") as HTMLInputElement)?.value;
        const amount = parseFloat((document.getElementById("amount") as HTMLInputElement)?.value);

        if (!to || isNaN(amount) || amount <= 0) {
            console.error("Invalid recipient or amount");
            return;
        }

        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey : wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: Math.round(amount * LAMPORTS_PER_SOL)
        }));

        try {
            // sendTransaction is provided by many wallet adapters; adjust if your adapter uses a different method
            const signature = await wallet.sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature);
            console.log("Transaction sent:", signature);
        } catch (err) {
            console.error("Failed to send transaction", err);
        }
    }

    return (
        <div>
            <h2 style={{marginTop: "10px"}}>Here you can send token</h2>
            <input type="text" id="to" placeholder="TO" />
            <input type="text" id="amount" placeholder="amount" />
            <button onClick={sendToken}>Send</button>
        </div>
    )
}