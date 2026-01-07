import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function reqAirdrop() {
        if (!wallet.publicKey) return;
        // request 1 SOL (1_000_000_000 lamports) as an example
        const amount = parseFloat(((document.getElementById("amount") as HTMLInputElement)?.value) || "0");
        if (isNaN(amount) || amount <= 0) return;
        
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
    }


    return <div>
        <input type="text" placeholder="Amount..." id="amount" />
        <button onClick={reqAirdrop}>Req airdrop</button>
        <div>
            {wallet.publicKey?.toBase58()}
        </div>
    </div>
}
