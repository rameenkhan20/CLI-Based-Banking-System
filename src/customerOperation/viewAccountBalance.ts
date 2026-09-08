import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import type { loginCredentials } from '../types.ts';
import type { accInfo } from '../types.ts';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import customerMenu from '../menu/customerMenu.ts';

const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);

async function viewAccountBalance(userId: number): Promise<void>{
    try {
        const fullPathToAccountFile: string | null = path.join(__dirname,'..','..','data','accounts.json');

        const accountInfo: string  = await fs.readFile(fullPathToAccountFile , 'utf8');
        const parsedAccountInfo: Array<accInfo> = JSON.parse(accountInfo); 

        // console.log(parsedAccountInfo);
        const UserAccInfo: accInfo | undefined = parsedAccountInfo.find((obj) => obj.accOwnerId === userId);

        const Balance: number | undefined = UserAccInfo?.balance;

        if(Balance === undefined || null){
            console.log("You Need to open an account First.");
        }else{
            console.log("Current Balance in your account: ", Balance);
            // const rl = readline.createInterface({input, output,  terminal: false});
            
            // const ans: string = await rl.question(`Would you like to perform a transaction? If Yes Press Y`);

            // if(ans === "Y"){
            //     await customerMenu(UserAccInfo);
            // }
        }                                                                                                                              
            

    } catch (error) {
        console.log("Error Occured: ", error);
    }
}

export default viewAccountBalance;