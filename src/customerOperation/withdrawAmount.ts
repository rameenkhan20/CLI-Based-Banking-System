import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import type { accInfo } from '../types.ts';
import { Account } from '../classes.ts';
import validBalance from '../helper/validBalance.ts';
import recordTransaction from '../helper/recordTransaction.ts';
import { userInfo } from 'node:os';
import { MakeTransaction } from '../classes.ts';

const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);


// async function withdrawOperation(accOwnerId: accInfo, amount: number, balance: number): Promise<void> {
//     if(amount <= 0){
//         console.log("Deposit Amount must exist!");
//     }
//     balance -= amount;
//     recordTransaction(accOwnerId, "withdraw", amount, balance ,{sentTo: 0 , sentBy: 0 });
// }


export async function withdrawAmount(accOwnerId: number): Promise<void> {

    const rl = readline.createInterface({input, output,  terminal: false});

    try {
        const fullPathToAccountFile: string | null = path.join(__dirname,'..','..','data','accounts.json');

        const accountInfo: string  = await fs.readFile(fullPathToAccountFile , 'utf8');
        const parsedAccountInfo: Array<accInfo> = JSON.parse(accountInfo); 

        const UserAccInfo = parsedAccountInfo.find((obj) => obj.accOwnerId === accOwnerId) as accInfo;

        const withdrawAmount: string = await rl.question("Enter Amount you want to withdraw: ");

        const amount: number  = parseInt(withdrawAmount);
        const sufficientBalance: boolean = validBalance(amount , UserAccInfo.balance);


        if(sufficientBalance){
            const operationIn = new MakeTransaction(UserAccInfo);

            operationIn.withdrawAmount(amount);

            
            await fs.writeFile(fullPathToAccountFile, JSON.stringify(parsedAccountInfo, null, 2));

            console.log(`Withdrawn: ${amount} from your account. Remaining Balance: ${UserAccInfo.balance}.`);
        }

    } catch (error) {
        console.log("Error Occured: ", error);
    }
}

export default withdrawAmount;