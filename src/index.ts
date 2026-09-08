import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { select, Separator } from '@inquirer/prompts';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { type loginCredentials } from "./types.ts"; 
import fs from 'node:fs/promises';
import initialMenu from "../src/menu/initialMenu.ts";
import openCustomerDetails from "./adminOperation/viewCustomerDetails.ts"
// import openUserAccount from './adminOperation/openAccount.ts';


const __filename = fileURLToPath(import.meta.url);  // for getting the current modules URL
const __dirname = dirname(__filename);

// openCustomerDetails();
// openUserAccount();

initialMenu();

export async function openAccountsTab(): Promise<[]>{ 
  try {
    const fullPath: string | null = path.join(__dirname,'..','data','accounts.json');

    const data: string  = await fs.readFile(fullPath , 'utf8');
    const parsedData: [] = JSON.parse(data); 
    console.log(parsedData);
    // const userAccounts: [] = parsedData.accounts;

    // console.log('File content:', userAccounts);
    return parsedData;

  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
}

// openAccountsTab();


// async function customerSignUp(){
//     const rl = readline.createInterface({input, output,  terminal: false});
//     try{
//         const emailAddress: string = await rl.question("Enter your Email Address: ");

//         const userName: string = await rl.question("Enter your Username: ");
        
//         const userPassword: string = await rl.question("Enter your password: ");

//         const confrirmPassword: string = await rl.question("Re-enter your password: ");

//         if(userPassword && confrirmPassword){
//             if(userPassword === confrirmPassword){

//                 const fullPath: string | null = path.join(__dirname,'..','data','accounts.json');

//                 const data: string  = await fs.readFile(fullPath , 'utf8');
//                 const parsedData: Array<{}> = JSON.parse(data); 

//                 const currentId: number = parsedData.length;

//                 const newUser: loginCredentials | {} = {
//                     id: currentId + 1,
//                     username: userName,
//                     email: emailAddress,
//                     password: userPassword,
//                 };
  
//                 parsedData.push(newUser);

//                 await fs.writeFile(fullPath, JSON.stringify(parsedData, null, 2), { encoding: 'utf8' });

//                 console.log(parsedData);
                
//             }else{
//                 console.log("Passwords Do Not Match!");
//             }
//         }
//         rl.close();
//     }catch(error){
//         console.log("Couldn't take input : ", error);
//     }
// }

// customerSignUp();



// async function initialMenu(): Promise<void>{
//     type role = "Admin"| "admin" | "customer" | "Customer";

//     const rl = readline.createInterface({input,output, terminal : false});

//     let userRole: role | null = null;

//     while(true){
//         const answer = await rl.question("Enter your role (Admin or Customer):  ");

//         const trimmedAnswer = answer.trim();

//         if(trimmedAnswer === "customer" || trimmedAnswer === "Customer" || trimmedAnswer === "Admin" || trimmedAnswer === "admin"){

//             userRole = trimmedAnswer as role;  // assertion 
//             break;
//         }

//         console.log("Invalid Input Try Again!");
//     }
//     if(userRole === "Customer" || userRole === "customer"){
//         const state = await select({       // type already defined as Choice<Value> - inquirer 
//             message: "Do you already have an account?",
//             choices: [ {
//                 name: "Yes",
//                 value: "Yes",
//                 description: "Sign in"
//             },
//             new Separator(),
//             {
//                 name: "No",
//                 value: "No",
//                 description: "Sign up"
//             }
//         ]
//         });
//         state === 'Yes' ? null : await customerSignUp();
//     }else{
//         console.log("Welcome to the Admin Dashboard!");
//     }
//     rl.close();
// }

// initialMenu();
