import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import type { accInfo } from '../types.ts';
import recordTransaction from '../helper/recordTransaction.ts';
import validBalance from '../helper/validBalance.ts';
import { MakeTransaction } from '../classes.ts';

const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);


async function transferAmount(accOwnerId: number): Promise<void> {
    const rl = readline.createInterface({ input, output, terminal: false });

    try {

        const fullPathToAccountFile = path.join(__dirname, '..', '..', 'data', 'accounts.json');
        const accountInfo: string = await fs.readFile(fullPathToAccountFile, 'utf8');


        const parsedAccountInfo: Array<accInfo> = JSON.parse(accountInfo);

        const senderAccount = parsedAccountInfo.find((obj) => obj.accOwnerId === accOwnerId) as accInfo;

        // console.log(senderAccount);

        const recipientInput: string = await rl.question("Enter Recipient's account number: ");
        const recipientAccountNumber: number = parseInt(recipientInput);

        const recipientAccount = parsedAccountInfo.find(
            (obj) => obj.accountNumber === recipientAccountNumber
        );

        // console.log(recipientAccount);

        if (!recipientAccount) {
            console.log("Recipient account not found.");
            rl.close();
            return;
        }

        const amountInput: string = await rl.question("Enter amount to transfer: ");
        const amount: number = parseInt(amountInput);

        const sufficientBalance = validBalance(amount, senderAccount.balance);

        if (sufficientBalance) {
            const operationFromSenderAcc = new MakeTransaction(senderAccount);
            const operationFromRecAcc = new MakeTransaction(recipientAccount);
            
            operationFromSenderAcc.withdrawAmount(amount);
            operationFromRecAcc.depositAmount(amount);

    
            // senderAccount.balance -= amount;
            // recipientAccount.balance += amount;

            // recordTransaction(senderAccount, "transfer", amount, senderAccount.balance,{
            //     sentBy: accOwnerId,
            //     sentTo: recipientAccountNumber,
            // });
            // recordTransaction(recipientAccount, "transfer", amount, recipientAccount.balance,{
            //     sentBy: accOwnerId,
            //     sentTo: recipientAccountNumber,
            // } );

            operationFromSenderAcc.recordTransaction("transfer", amount, recipientAccountNumber);

            operationFromRecAcc.recordTransaction("transfer", amount, recipientAccountNumber);


            await fs.writeFile(fullPathToAccountFile, JSON.stringify(parsedAccountInfo, null, 2));
            console.log("Transfer successful. New balance:", senderAccount.balance);
        }

        rl.close();


    } catch (error) {
        console.log("Error Occured: ", error);
    }

}

export default transferAmount;