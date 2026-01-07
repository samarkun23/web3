import React, { FC, useMemo } from 'react'
import './App.css'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';
import { RequestAirdrop } from './RequestAirdrop';
import { ShowBalance } from './ShowBalance';
import { SendToken } from './SendToken';

function App() {

    return (
        <>
            <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        <div>
                            <WalletMultiButton />
                            <WalletDisconnectButton />
                            {/* <RequestAirdrop />
                            { /* Your app's components go here, nested within the context providers. */}
                            {/* <ShowBalance /> */} 

                            <div style={{margin: "100px"}}>
                                <SendToken />
                            </div>
                        </div>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </>
    )
}

export default App
