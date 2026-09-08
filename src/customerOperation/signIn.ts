import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { type loginCredentials } from "../types.ts";
import fs from 'node:fs/promises';
import customerMenu from '../menu/customerMenu.ts';

const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);


async function customerSignIn(): Promise<void>{
    const rl = readline.createInterface({input, output,  terminal: false});
    try {
        const emailAddress: string = await rl.question("Enter your Email Address: ");
        console.log(emailAddress);

        const password: string = await rl.question("Enter your password: ");
        console.log(password);

        const fullPath: string | null = path.join(__dirname,'..','..','data','users.json');

        const data: string  = await fs.readFile(fullPath , 'utf8');
        const parsedData = JSON.parse(data) as loginCredentials[]; 
        // console.log(parsedData);

        // let mailFound;
        // let passFound;

        // for (const item of parsedData) {
        //     mailFound = parsedData.find((emailAddress) => emailAddress as unknown as string === item.email);
        //     passFound = parsedData.find((password) => password as unknown as string === item.password);
        // }

        const matchedAccount = parsedData.find(
            (account) => account.email === emailAddress && account.password === password
        );

        if(matchedAccount){
            console.log("User logged in!");
            await customerMenu(matchedAccount);
            // console.log("View my account details");
        }else{
            console.log("User NOt Found!");
        }
        
        // for(let i = 0; i < parsedData.length; i++){
        //     const currentEmail = parsedData[i].email
        //     console.log(parsedData[i]);
        // }

    } catch (error) {
        console.log("Error Occured: ", error);
    }
    rl.close();
}

export default customerSignIn;
