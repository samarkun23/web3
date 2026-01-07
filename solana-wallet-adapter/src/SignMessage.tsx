import { useWallet } from "@solana/wallet-adapter-react"
import {ed25519} from '@noble/curves/ed25519.js'
import bs58 from 'bs58'
import React from "react";


export function SignMessage () {
    const { publicKey , signMessage } = useWallet();

    async function onClick() {
        if(!publicKey) throw new Error("Wallet not connected");
        if (!signMessage) throw new Error("Wallet does not support message signing ")

        const message = (document.getElementById('message') as HTMLInputElement).value;
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error("Message signature invalid");
        alert(`success Message signature: ${bs58.encode(signature)}`);
    }

    return (
        <div>
            <h2>Sign message here </h2>
            <input type="text" id="message" placeholder="message" />
            <button onClick={onClick}>Sign Message</button>
        </div>
    )
}