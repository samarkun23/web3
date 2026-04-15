// use serde::{Serialize, Deserialize};

// #[derive(Serialize, Deserialize, Debug)]

use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshDeserialize, BorshSerialize , Debug)]
struct User {
    username: String,
    password: String
}


fn main() {
    let u = User{
        username: String::from("harkirat"),
        password: String::from("12345")
    };

    let mut v: Vec<u8> = Vec::new(); // created a new vec 

    let ans  = u.serialize(&mut v); // serialize a u and store it on vec v basically convert to byte

    println!("{:?}", v);

    let user = User::try_from_slice(&v).unwrap(); // convert byte to the user
    print!("{:?}", user);

    // match ans {
    //     Ok(_) => print!("{:?}", v),
    //     Err(_) => print!("Error while serializing")
    // }

}

// fn main() { // this is for serde ok 
//     let u = User{
//         username: String::from("Harkirat"),
//         password: String::from("123456789")
//     };

//     let serialized_string = serde_json::to_string(&u); // here struct now convert to string . 
//     let user_string = serialized_string.unwrap();
//     print!("{}", user_string); // 2nd method . 

//     // match serialized_string {
//     //     Ok(str)  => print!("{}", str),
//     //     Err(_) => print!("Error while converting to string")
//     // }

//     let s = String::from("{\"username\": \"harkirat\", \"password\": \"123412\"}");
//     let u: Result<User, serde_json::Error> = serde_json::from_str(&s); // converting string to User .

//     println!("{:?}", u.unwrap()); // 1st method to print bhai . 
    
//     // match u {
//     //     Ok(user) => print!("{:?}", user),
//     //     Err(e) => print!("There was an error: {}", e)
//     // }

// }
