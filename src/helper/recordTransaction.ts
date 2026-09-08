import type { accInfo } from "../types.ts";


function recordTransaction(  account: accInfo,
transactionType: "withdraw" | "deposit" | "transfer",
 amount: number, balance: number,
relatedInfo?: {sentBy: number , sentTo: number}): void {
        account.transactions.push({
            transactionType,
            transactionId: account.transactions.length + 1,
            amount, 
            sentBy: account.accOwnerId,
            sentTo: account.accountNumber,
            balance: balance,
            dateAndTime: new Date().toString()
        });
    }

export default recordTransaction;