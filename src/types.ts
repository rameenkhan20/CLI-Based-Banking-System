export interface loginCredentials {  
    readonly id: number,
    email: string,
    username: string,
    password: string
}


// export interface account {
//     accountNumber: number,
//     accountType: string,
//     readonly balance: number,
// }

export interface transaction {
    transactionType: "deposit" | "withdraw" | "transfer",    
    readonly transactionId: number,
    readonly amount: number,
    readonly sentBy?: number,
    readonly sentTo?: number,  //optional
    readonly balance: number,
    dateAndTime: string
}

// export type customerDetails = loginCredentials & account;

// export type transactionDetails = customerDetails & transaction;

export type accType = "current" | "saving" | "";

export interface accInfo{
    // readonly writeable: true, balance : number,
    // readonly writeable: boolean = true,
    balance: number,
    readonly accountNumber: number,
    accountType: string,
    transactions: transaction[],
    accOwnerId: number
}




