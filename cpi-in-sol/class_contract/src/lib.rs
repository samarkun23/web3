use solana_program::{Pubkey, account_info::AccountInfo, entrypoint::{self, ProgramResult}, entrypoint, program::invoke_signed , system_instruction::create_account};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {
    // create a new pda onchain     
    // pda , userAcc, systemProgram that are the acccount that we need in accounts
    let mut iter = acccounts.iter();
    let pda = next_account_info(iter)?;
    let user_account = next_account_info(iter)?;
    let system_program = next_account_info(iter)?;

    let seeds = &[user_account.key.as_ref(), b"user"]; // here we go with userpublic and user as string

    let (pda_public_key , bump) = Pubkey::find_program_address(seeds, program_id);

    let ix = create_account(
        user_account.key,
        pda.key,
        1000000000,
        8,
        program_id
    );

    invoke_signed(ix, accounts, &[&[seeds, [bump]]]); // so that 3rd argument is the argument where we pass the seeds of the account see how pdas created contract address + seeds so this is the seeds . That seed is depend on you
    
}