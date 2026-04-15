use borsh::{BorshDeserialize, BorshSerialize};

use solana_program::{
    account_info::{self, AccountInfo, next_account_info, next_account_infos},
    entrypoint,
    entrypoint::{self, ProgramResult},msg,
    pubkey::Pubkey,
};


#[derive(BorshSerialize , BorshDeserialize)]
enum InstructionType {
    Increment(u32),
    Decrement(u32)
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Count {
    count: u32,
}

entrypoint!(counter_contract);

pub fn counter_contract(
    program_id: &Pubkey,
    accounts: &[AccountInfo], // this is data account bro 
    instruction_data: &[u8] // 0 1 225 22 23 112 1 1 11 22 2 33 1 1 33 1 4 1 1 14 4  
) -> ProgramResult {
    let acc = next_account_info(&mut accounts.iter())?; // read from the specifc account that user is giving us 

    let instruction_type = InstructionType::try_from_slice(instruction_data)?; // get the instruction type of the user

    let mut counter_data = Count::try_from_slice(&mut acc.data.borrow())?; // we are converting acc.data int Count 
    match instruction_type { // based on instruction type we do operation
        InstructionType::Increment(value) => {
            msg!("Executing Increment!!");
            counter_data.count += value;
        },
        InstructionType::Decrement(value) => {
            msg!("Executing Decrement!!");
            counter_data.count -= value;
        }
    }

    counter_data.serialize(&mut *acc.data.borrow_mut())?; // we are conerting u32 into byte again 

    msg!("Contract succeded!!");
    Ok(())

    // adding a question mark do the same thing . 
    // match acc {
    //     Ok(account_info) => {},
    //     Err(e) => return e
    // }
}

