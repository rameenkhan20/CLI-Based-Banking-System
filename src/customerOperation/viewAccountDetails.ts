import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import type { loginCredentials, transaction } from '../types.ts';
import type { accInfo } from '../types.ts';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);

async function viewAccountDetail(userId: number): Promise<void>{
    try {
        const rl = readline.createInterface({input, output,  terminal: false});
        

        const fullPathToUserFile: string | null = path.join(__dirname,'..','..','data','users.json');
        const fullPathToAccountFile: string | null = path.join(__dirname,'..','..','data','accounts.json');

        const data: string  = await fs.readFile(fullPathToUserFile , 'utf8');
        const parsedData = JSON.parse(data) as loginCredentials[]; 

        const UserFound = parsedData.find((obj) => obj.id === userId);

        console.log({
            UserFound
        });

        const accountInfo: string  = await fs.readFile(fullPathToAccountFile , 'utf8');
        const parsedAccountInfo: Array<accInfo> = JSON.parse(accountInfo); 

        // console.log(parsedAccountInfo);
        const UserAccInfo: accInfo | undefined = parsedAccountInfo.find((obj) => obj.accOwnerId === userId);

        console.log({UserAccInfo});

        const ans: string = await rl.question("Want to view Transactions, Pess Y: ");

        if(ans === "y"){
            const ts: transaction[] | undefined =  UserAccInfo?.transactions;

            if(ts !== undefined){
                for(let i = 0; i < ts.length; i++){
                    console.log(ts[i]);
                }
            }
        }
        rl.close();

    } catch (error) {
        console.log("Error Occured: ", error);
    }
}

export default viewAccountDetail;