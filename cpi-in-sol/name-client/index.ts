// normally we need to do this using litesvm not web.js 

import { Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js"

// we are writing logic to intract with the system program and that create a data account  
const connection = new Connection("http://127.0.0.1:8899"); // locally run solana

async function main() {
    const keypair = new Keypair();
    const dataAccount = new Keypair(); // now i want to create this account in solana blockchain we don't do just reqairdrop they don't have a data size there data is 0 bytes 

    const trx = await connection.requestAirdrop(keypair.publicKey, 3000_000_000);
    await connection.confirmTransaction(trx);

    const balance = await connection.getBalance(keypair.publicKey);

    const instruction = SystemProgram.createAccount({
        fromPubkey: keypair.publicKey,
        newAccountPubkey : dataAccount.publicKey,
        lamports: 1000_000_000,
        space: 8,
        programId: SystemProgram.programId
    })

    const tx = new Transaction().add(instruction); // new tx init bec whenever we need to do something in solana blockchain you create tx with multiple instruction like create account . and we have only one instruction . 
    tx.feePayer = keypair.publicKey; // fee kon barega
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash; // recent blockhash
    tx.sign(keypair)  // sign by who is paying for it 

    // now we will send it . 
    await connection.sendTransaction(tx, [keypair, dataAccount]); // the acccount you are creating that also need to sign new trx data why keypair and dataaccount are passed . 
    console.log(dataAccount.publicKey.toBase58());
}

main()
