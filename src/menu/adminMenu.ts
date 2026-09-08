import { select, Separator } from '@inquirer/prompts';
import customerSignUp from '../adminOperation/registerCustomer.ts';
import openCustomerDetails from "../adminOperation/viewCustomerDetails.ts";
import openUserAccount from "../adminOperation/openAccount.ts";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { searchById } from '../adminOperation/searchById.ts';
import updateUserRecord from "../adminOperation/updateUser.ts";
import deleteUser from '../adminOperation/deleteUser.ts';

const rl = readline.createInterface({input, output,  terminal: false});


async function adminMenu(): Promise<void>{
    const state = await select({
            message: "=== Admin Dashboard ===",
            choices: [ {
                    name: "Register a customer",
                    value: "Register Customer",
                    description: "Admin can Register a customer"
                },
                new Separator(),
                {
                    name: "View customer details",
                    value: "View customer details",
                    description: "Admin can view customer details"
                },      //   add to the admin menu according to the details 
                new Separator(),
                {
                    name: "Open Account",
                    value: "Open Account",
                    description: "Admin can open an account for the existing user"
                },
                new Separator(),
                {
                    name: "Search up an Account by id",
                    value: "Search up an Account by id",
                    description: "Admin can search an Account through user Id"
                },new Separator(),
                {
                    name: "Update User Records",
                    value: "Update User Records",
                    description: "Admin can update user Records upon request"
                },new Separator(),
                {
                    name: "Close an Account",
                    value: "Close an Account",
                    description: "Admin can close an account upon request"
                },new Separator(),
            ]
        });
        if (state === "Register Customer"){
            await customerSignUp();
        }else if(state === "View customer details"){
            const existingCustomerDetail = await openCustomerDetails();
            console.log(existingCustomerDetail);
        }else if(state === "Open Account"){
            await openUserAccount();
        }else if(state === "Search up an Account by id"){
            const idToSearch = await rl.question("Enter Id: ");
            if(idToSearch){
                const id = parseInt(idToSearch);
                searchById(id);
            }
        }else if(state === "Update User Records"){
            await updateUserRecord();
        }else{
            const accountToDelete = await rl.question("Enter Id: ");
            if(accountToDelete){
                const id = parseInt(accountToDelete);
                deleteUser(id);
            }
        }
}

export default adminMenu;