use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint::{ProgramResult}, 
    entrypoint,
    instruction, 
    pubkey::Pubkey
};

entrypoint!(process_instruction);

#[derive(BorshDeserialize, BorshSerialize)]
struct onChainData {
    count: u32
};

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo], // this array only have a 1 account and it's a data account 
    instruction_data: &[u8]
) -> ProgramResult{
    let mut iter = accounts.iter(); // define the iterator 
    let data_account = next_account_info(&mut iter)?; // this how you can grab 1st accounts

    let mut counter = onChainData::try_from_slice(&data_account.data.borrow_mut())?; // this is bunch of bytes of array &[u8] we need to convert this bytes into struct of onChainData

    // do logic here 
    if counter.count == 0 {
        counter.count = 1;
    }else {
        counter.count = counter.count * 2;
    }

    // repack the data means deseralize the data so 
    counter.serialize(&mut *data_account.data.borrow_mut());

    Ok(())
}