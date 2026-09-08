import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import type { loginCredentials } from '../types.ts';

const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);


async function openCustomerDetails(): Promise<[]>{ 
  try {
    // console.log(__filename);
    const fullPath: string | null = path.join(__dirname,'..','..','data','users.json');

    // console.log(fullPath);
    const data: string  = await fs.readFile(fullPath , 'utf8');

    const parsedData: [] = JSON.parse(data); 

    console.log(parsedData);
    // const userAccounts: [] = parsedData.accounts;

    // console.log(userAccounts);
    // console.log('File content:', userAccounts);

    return parsedData;

  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
}

export default openCustomerDetails;