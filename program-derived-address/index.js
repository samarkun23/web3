const { PublicKey } = require('@solana/web3.js')

const { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } = require('@solana/spl-token')

const userAddress = new PublicKey('');
const tokenMintAddress = new PublicKey('');

const getAssociatedTokenAddress = (mintAddress, ownerAddress) => {
    return PublicKey.findProgramAddressSync(
        [
            ownerAddress.toBuffer(), // samar address
            TOKEN_PROGRAM_ID.toBuffer(), // token program id
            mintAddress.toBuffer(), // bonk coin ka mint address 
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID // and assiociated token program
    )
}

const [associatedTokenAddress, bump] = getAssociatedTokenAddress(tokenMintAddress, userAddress);
console.log(`Associated Token Address ${associatedTokenAddress.toBase58()}, bump: ${bump}`);
