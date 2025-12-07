import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react';
import base58 from 'bs58'

export function SignMessageButton() {
    const {publicKey,signMessage} = useWallet();
    const [message , setMessage] = useState("");
    
    const handleSign = async () => {
        if (!publicKey || !signMessage) {
            return  
        }else{
            try {
                const Encodemessage = new TextEncoder().encode(message);
                const unit8arraySignature = await signMessage(Encodemessage);
                const signature = base58.encode(unit8arraySignature);
                alert(`Signature:  ${signature} `);
            } catch (error) {
                console.log(`Could not sign Message`, error);
            }
        }
    }

    return (
        <div>
            <input id='signMessage' onChange={(e) => setMessage(e.target.value) } type="text" />
            <button onClick={handleSign} disabled={!publicKey}>Sign message</button>
        </div>
    )
}