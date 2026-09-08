import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { select, Separator } from '@inquirer/prompts';
import adminMenu from './adminMenu.ts';
import customerSignIn from '../customerOperation/signIn.ts';

async function initialMenu(): Promise<void>{
    while(true){

    type role = "Admin"| "admin" | "customer" | "Customer";

    const rl = readline.createInterface({input,output, terminal : false});

    let userRole: role | null = null;

    while(true){
        const answer = await rl.question("Enter your role (Admin or Customer):  ");

        const trimmedAnswer = answer.trim();

        if(trimmedAnswer === "customer" || trimmedAnswer === "Customer" || trimmedAnswer === "Admin" || trimmedAnswer === "admin"){

            userRole = trimmedAnswer as role;  // assertion 
            break;
        }

        console.log("Invalid Input Try Again!");
    }
    if(userRole === "Admin" || userRole === "admin"){
        const adminPassword: string = "admin321";

        while(true){
            const pass: string = await rl.question("Enter Admin Pass: ");

            if(adminPassword === pass){
                await adminMenu();
                break;
            }
            console.log("Invalid Password!");
        }
    }
    if(userRole === "customer" || userRole === "Customer"){
        await customerSignIn();
    }
    

    //     const state = await select({
    //         message: "=== Admin Dashboard ===",
    //         choices: [ {
    //                 name: "Register a customer",
    //                 value: "Register Customer",
    //                 description: "Admin can Register a customer"
    //             },
    //             new Separator(),
    //             {
    //                 name: "View customer details",
    //                 value: "View customer details",
    //                 description: "Admin can view customer details"
    //             }      //   add to the admin menu according to the details 
    //         ]
    //     });
    //     if (state === "Register Customer"){
    //         await customerSignUp();
    //     }
    // }

    // if(userRole === "Customer" || userRole === "customer"){
    //     const state = await select({       // type already defined as Choice<Value> - inquirer 
    //         message: "Do you already have an account?",
    //         choices: [ {
    //             name: "Yes",
    //             value: "Yes",
    //             description: "Sign in"
    //         },
    //         new Separator(),
    //         {
    //             name: "No",
    //             value: "No",
    //             description: "Sign up"
    //         }
    //     ]
    //     });
    //     state === 'Yes' ? null : await customerSignUp();
    // }else{
    //     console.log("Welcome to the Admin Dashboard!");
    // }
    rl.close();
}
}


export default initialMenu;