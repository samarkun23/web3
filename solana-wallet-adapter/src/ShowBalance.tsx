import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"

export function ShowBalance() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        async function getBalance() {
            if (!publicKey) {
                setBalance(null);
                return;
            }
            const balance = await connection.getBalance(publicKey);
            setBalance(balance);
        }
        getBalance();
    }, [connection, publicKey]);

    return (
        <div>
            {balance === null ? "No wallet connected" : `${balance} lamports`}
        </div>
    )
}