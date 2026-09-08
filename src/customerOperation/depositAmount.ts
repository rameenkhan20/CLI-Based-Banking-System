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


// function depositOperation(accOwnerId: accInfo, amount: number, balance: number): void {
//     if(amount <= 0){
//         console.log("Deposit Amount must exist!");
//     }
//     balance += amount;
//     console.log(balance);
//     recordTransaction(accOwnerId, "deposit", amount, balance, {sentBy: accOwnerId.accOwnerId , sentTo: 0});
//     // return balance
// }

export async function depositAmount(accOwnerId: number): Promise<void> {

    const rl = readline.createInterface({input, output,  terminal: false});

    try {
        const fullPathToAccountFile: string = path.join(__dirname,'..','..','data','accounts.json');

        const accountInfo: string  = await fs.readFile(fullPathToAccountFile , 'utf8');

        // console.log("heree");
        const parsedAccountInfo: accInfo[] = JSON.parse(accountInfo); 


        const UserAccInfo  = parsedAccountInfo.find((obj) => obj.accOwnerId === accOwnerId) as accInfo;


        const depositAmount: string  = await rl.question("Enter Amount you want to deposit: ");

        const amount: number  = parseInt(depositAmount);

        const operationIn = new MakeTransaction(UserAccInfo);

        operationIn.depositAmount(amount);

        
        await fs.writeFile(fullPathToAccountFile, JSON.stringify(parsedAccountInfo, null, 2));

        rl.close();

    } catch (error) {
        console.log("Error Occured: ", error);
    }
}