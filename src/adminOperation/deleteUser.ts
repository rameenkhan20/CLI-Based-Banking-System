import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import type { loginCredentials } from '../types.ts';
import type { accInfo } from '../types.ts';


const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);

async function deleteUser(userId: number):Promise<void>{
    try {
        const fullPath: string | null = path.join(__dirname,'..','..','data','users.json');

        const fullPathToAccountFile: string | null = path.join(__dirname,'..','..','data','accounts.json');

        const data: string  = await fs.readFile(fullPath , 'utf8');
        const parsedData = JSON.parse(data) as loginCredentials[]; 

        const remainingAccounts: loginCredentials[] = parsedData.filter(
            (account) => account.id !== userId
        );
    
        await fs.writeFile(fullPath, JSON.stringify(remainingAccounts, null, 2), { encoding: 'utf8' });

        console.log(remainingAccounts);

        const accountInfo: string  = await fs.readFile(fullPathToAccountFile , 'utf8');
        const parsedAccountInfo: Array<accInfo> = JSON.parse(accountInfo); 
    
        // console.log(parsedAccountInfo);
        const UserAccInfo: accInfo[] | undefined = parsedAccountInfo.filter((obj) => obj.accOwnerId !== userId);
    

        await fs.writeFile(fullPathToAccountFile, JSON.stringify(UserAccInfo, null, 2), { encoding: 'utf8' });
        console.log(UserAccInfo);

        console.log("Account Closed Successfully!");

    } catch (error) {
        console.log("Error occured:", error);
    }
}

export default deleteUser;

// await deleteUser(7);