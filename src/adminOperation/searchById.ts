import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import type { loginCredentials } from '../types.ts';
import type {accInfo} from "../types.ts";

const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);

export async function searchById(userId: number):Promise<void>{
    try {
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

        console.log({
            UserAccInfo
        });

    } catch (error) {
        console.log("Error Occured: ", error);
    }
}

export default searchById;
// await searchById(3);