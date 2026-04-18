import { test } from "node:test";
import { expect } from 'bun:test'
import assert from "node:assert/strict";
import { LiteSVM } from "litesvm";
import { getTransferSolInstruction } from "@solana-program/system";
import {
    appendTransactionMessageInstruction,
    blockhash,
    createTransactionMessage,
    generateKeyPairSigner,
    lamports,
    pipe,
    setTransactionMessageFeePayerSigner,
    setTransactionMessageLifetimeUsingBlockhash,
    signTransactionMessageWithSigners,
} from "@solana/kit";
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

test("it transfers SOL from one wallet to another", async () => {
    const svm = new LiteSVM();

    const contractKeypair = Keypair.generate();
    const contractPublickey = contractKeypair.publicKey;

    svm.addProgramFromFile(contractPublickey.toBase58() as any, "./1.so");

    const payer = new Keypair();
    const dataAccount = new Keypair();

    svm.airdrop(payer.publicKey as any, lamports(2_000_000_000n));

    const rent = Number(svm.minimumBalanceForRentExemption(BigInt(4)));

    const tx = new Transaction();
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = svm.latestBlockhash();

    tx.add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: dataAccount.publicKey,
            lamports: Number(rent),
            space: 4,
            programId: contractPublickey,
        })
    );

    tx.sign(payer, dataAccount);

    svm.sendTransaction(tx as any);


    const balanceAfter = svm.getBalance(dataAccount.publicKey as any);

    //@ts-ignore
    expect(balanceAfter).toBe(rent);

});
