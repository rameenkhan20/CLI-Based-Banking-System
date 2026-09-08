import type { accInfo, accType, transaction } from "./types.ts";

export class Account {
    protected balance: number;
    protected readonly accountNumber: number;
    public accountType: accType;
    protected readonly transactions: transaction[] = [];
    protected readonly accOwnerId: number;

    constructor(accOwnerId: number , accountType: accType){
        this.balance = 0;     // initial balance 
        this.accountNumber = Math.floor(Math.random() * 999999);   // account number
        this.accOwnerId = accOwnerId;
        this.accountType = accountType;
        this.transactions = [];
    }

    
    // public depositAmount(amount: number, balance: number): void{
    //     if(amount <= 0){
    //         console.log("Deposit Amount must exist!");
    //     }
    //     balance += amount;
    //     this.transactions.push();  // have to create a transaction template
    // }

    // public withdrawAmount(amount: number): void{
    //     if(amount > this.balance){
    //         console.log("Can't Withdraw, Insufficient Balance!")
    //     }
    //     if(amount <= 0){Account
    //         console.log("withdraw a real amount!")
    //     }
    //     this.balance -= amount;
    //     this.transactions.push();
    // }
     
    // public static validBalance(amount: number, balance: number ): boolean{
    //     if(amount > balance){
    //         console.log("Insufficient amount for such Transaction!");
    //         return false;
    //     }
    //     return true;
    // }

    // private recordTransaction(transactionType: "withdraw" | "deposit" | "transfer", amount: number ): void{
    //     this.transactions.push({
    //         transactionType,
    //         transactionId: this.transactions.length + 1,
    //         amount,
    //         sentBy: this.accOwnerId,
    //         sentTo: this.accountNumber,
    //         balance: this.balance,
    //         dateAndTime: new Date().toString()
    //     });
    // }

}

// export class MakeTransaction{
//     protected accountInfo: accInfo;
//     public transactionType: "withdraw" | "deposit" | "transfer";
//     private amount: number;
//     private balance: number;
//     // private relatedInfo: {sentBy: number , sentTo: number};
//     protected readonly transactions: transaction[] = [];


//     constructor(account: accInfo, transactionType: "withdraw" | "deposit" | "transfer",
//     amount: number, balance: number){
//         this.accountInfo = account;
//         this.transactionType = transactionType;
//         this.amount = amount;
//         this.balance = balance;
//     }

// public get getTransactions(): transaction[]{
    //     return this.transactions;
    // }
    
//     protected recordTransaction(transactionType: "withdraw" | "deposit" | "transfer", amount: number ): void{
//         this.transactions.push({
//             transactionType,
//             transactionId: this.transactions.length + 1,
//             amount,
//             sentBy: this.accountInfo.accOwnerId,
//             sentTo: this.accountInfo.accountNumber,
//             balance: this.balance,
//             dateAndTime: new Date().toString()
//         });
//         // console.log("I did my part");
//     }

//     public withdrawAmount(amount: number): void{
//         if(amount > this.balance){
//             console.log("Can't Withdraw, Insufficient Balance!")
//         }
//         if(amount <= 0){Account
//             console.log("withdraw a real amount!")
//         }
//         this.balance -= amount;
//         this.recordTransaction("withdraw", amount);
//         console.log(amount , "withdrawn from your account.");
//     }

//     public depositAmount(amount: number): void{
//         // if(amount > this.balance){
//         //     console.log("Can't Withdraw, Insufficient Balance!")
//         // }
//         if(amount <= 0){Account
//             console.log("Deposit a real amount!")
//         }
//         this.balance += amount;
//         this.recordTransaction("deposit", amount);
//         console.log(amount, "deposited to your account.");
//     }
// }

export class MakeTransaction {
    protected accountInfo: accInfo;

    constructor(account: accInfo) {
        this.accountInfo = account;
    }

    public recordTransaction(transactionType: "withdraw" | "deposit" | "transfer", amount: number, sentTo: number): void {
        this.accountInfo.transactions.push({
            transactionType,
            transactionId: this.accountInfo.transactions.length + 1,
            amount,
            sentBy: this.accountInfo.accOwnerId,
            sentTo: sentTo,
            balance: this.accountInfo.balance,
            dateAndTime: new Date().toString()
        });
    }

    public depositAmount(amount: number): void {
        if (amount <= 0) {
            console.log("Deposit a real amount!");
            return;
        }
        this.accountInfo.balance += amount;
        this.recordTransaction("deposit", amount, this.accountInfo.accOwnerId);
        console.log(amount, "deposited to your account.");
    }

    public withdrawAmount(amount: number): void {
        if (amount > this.accountInfo.balance) {
            console.log("Can't withdraw, insufficient balance!");
            return;
        }
        if (amount <= 0) {
            console.log("Withdraw a real amount!");
            return;
        }
        this.accountInfo.balance -= amount;
        this.recordTransaction("withdraw", amount, 0);
        console.log(amount, "withdrawn from your account.");
    }
}



// const d = new Date().toString();
// console.log(d);