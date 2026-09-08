import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { type accType, type loginCredentials } from "../types.ts";
import fs from 'node:fs/promises';
import { Account } from '../classes.ts';
import { openAccountsTab } from '../index.ts';


const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);


export async function userExits(): Promise<number>{
    const rl = readline.createInterface({input, output,  terminal: false});
    try {
        const emailAddress: string = await rl.question("Enter your Email Address: ");

        const userId: string  = await rl.question("Enter User Id: "); // readline always returns a string 

        const id : number = parseInt(userId);

        const fullPath: string | null = path.join(__dirname,'..','..','data','users.json');

        const data: string  = await fs.readFile(fullPath , 'utf8');
        const parsedData = JSON.parse(data) as loginCredentials[]; 

        const matchedAccount = parsedData.find(
            (account) => account.email === emailAddress && account.id === id
        );

        if(matchedAccount){
            console.log("User exits!");
            return id;
        }else{
            console.log("User NOt Found!");
            return 0;
        }
        
    } catch (error) {
        console.log("Error Occured: ", error);
    }
    rl.close();
    return 0;
}


async function openUserAccount(): Promise<void>{
    // to check if the user is already registered?
    const rl = readline.createInterface({input, output,  terminal: false});
    try {
        const userId: number = await userExits();

        if(userId == 0){
            console.log("User NOt found");
            return;
        }
        // console.log(userId);

        let answer: string = await rl.question("Account Type: (current/saving)  ");

        const accountType = answer as accType;

        const newUser = new Account(userId,accountType);

        const accountsInfo: Array<{}> = await openAccountsTab();
        // console.log(accountsInfo);

        accountsInfo.push(newUser);

        const fullPath: string | null = path.join(__dirname,'..','..','data','accounts.json');
        

        await fs.writeFile(fullPath, JSON.stringify(accountsInfo, null, 2), { encoding: 'utf8' });

        console.log(accountsInfo);

    } catch (error) {
        console.log("Error Occured:",error);
    }
}

export default openUserAccount;