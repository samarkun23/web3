import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css'
import { Airdrop } from './Airdrop';
import { SignMessageButton } from './SignMessageButtion';

function App() {

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/1o8VGMmDmRZDO-WPIhLUM"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>

          <WalletMultiButton />
          <WalletDisconnectButton />
          <div>
            <Airdrop /> 

            <div>
              For Sign a message
              <SignMessageButton />
            </div>
          </div>

        </WalletModalProvider>
      </ WalletProvider>
    </ConnectionProvider>
  )
}

export default App
