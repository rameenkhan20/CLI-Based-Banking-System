import type { loginCredentials } from "../types.ts";
import {userExits} from "../adminOperation/openAccount.ts";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);

// const userId: number = await userExits();

// I would have used fieldsToUpdate: Partial<loginCredentials>  as an argument but its ClI based soo that doesn't seem to be useful.


async function updateUserRecord( ): Promise<void>{
    const rl = readline.createInterface({input, output,  terminal: false});

    const fullPath: string | null = path.join(__dirname,'..','..','data','users.json');
    try {
        const data: string  = await fs.readFile(fullPath , 'utf8');
        const parsedData = JSON.parse(data) as loginCredentials[]; 

        const Id: string = await rl.question("Enter user Id: ");

        const userId: number = parseInt(Id);

        const objToUpdate: loginCredentials | undefined = parsedData.find((obj) => obj.id === userId);

        // console.log(objToUpdate);

        if(objToUpdate){
                
            let {email , password, username} = {...objToUpdate};

            let updatedEmail: string = await rl.question("Enter updated email: ");

            let updatedPassword: string = await rl.question("Enter updated password: ");

            let updatedUsername: string = await rl.question("Enter updated username: ");

            // let pass: number = parseInt(updatedPassword);
            
            email = updatedEmail !== "" ? updatedEmail : email;
            password = updatedPassword !== "" ? updatedPassword : password;
            username = updatedUsername !== "" ? updatedUsername : username;

            // console.log(objToUpdate);

            for (let [key, value] of Object.entries(objToUpdate)) {
                // console.log(key, value);
                objToUpdate.email = email;
                objToUpdate.password = password;
                objToUpdate.username = username;
            }

            await fs.writeFile(fullPath, JSON.stringify(parsedData, null, 2), { encoding: 'utf8' });

            console.log(objToUpdate);
            console.log("Record updated Successfully!");


        }else{
            console.log("User not found!");
            return;
        }

    } catch (error) {
        console.log("Couldn't read the file: ",error);
    }
    
}

// console.log(await updateUserRecord);
// await updateUserRecord();

export default updateUserRecord;