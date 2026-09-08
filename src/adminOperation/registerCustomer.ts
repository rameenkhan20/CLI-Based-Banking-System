import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { type loginCredentials } from "../types.ts";
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);

async function customerSignUp(){
    const rl = readline.createInterface({input, output,  terminal: false});
    try{
        const emailAddress: string = await rl.question("Enter your Email Address: ");

        const userName: string = await rl.question("Enter your Username: ");
        
        const userPassword: string = await rl.question("Enter your password: ");

        const confrirmPassword: string = await rl.question("Re-enter your password: ");


        while(userPassword !== confrirmPassword){
            const userPassword: string = await rl.question("Enter your password: ");

            const confrirmPassword: string = await rl.question("Re-enter your password: ");

            if(userPassword && confrirmPassword){
                if(userPassword === confrirmPassword){
                    break;
                }
            }
            console.log("Passwords Don't match! RE-ENTER");
        }
        const fullPath: string | null = path.join(__dirname,'..','..','data','users.json');

        const data: string  = await fs.readFile(fullPath , 'utf8');
        const parsedData: Array<{}> = JSON.parse(data); 

        const currentId: number = parsedData.length;

        const newUser: loginCredentials | {} = {
            id: currentId + 1,
            username: userName,
            email: emailAddress,
            password: userPassword,
        };

        parsedData.push(newUser);

        await fs.writeFile(fullPath, JSON.stringify(parsedData, null, 2), { encoding: 'utf8' });

        console.log(parsedData);
        
        rl.close();
    }catch(error){
        console.log("Couldn't take input : ", error);
    }
}

// customerSignUp();

export default customerSignUp;