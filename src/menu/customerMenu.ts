import { select, Separator } from '@inquirer/prompts';
import type { loginCredentials } from '../types.ts';
import viewAccountDetail from '../customerOperation/viewAccountDetails.ts';
import viewAccountBalance from '../customerOperation/viewAccountBalance.ts';
import { depositAmount } from '../customerOperation/depositAmount.ts';
import transferAmount from '../customerOperation/transferAmount.ts';
import withdrawAmount from '../customerOperation/withdrawAmount.ts';

async function customerMenu(customerDetails: loginCredentials): Promise<void>{
    try {
        console.log(`=== Welcome Back ${customerDetails.username} ===`)
        const state = await select({
                message: "Pick an operation of your choice",
                choices: [ {
                    name: "View my account details",
                    value: "View my account details",
                    description: "You can view your account details"
                }, new Separator(),
                {
                    name: "View my account balance",
                    value: "View my account balance",
                    description: "You can view your account balance"
                },new Separator(),
                {
                    name: "Deposit Amount",
                    value: "Deposit Amount",
                    description: "You can Deposit Amount"
                },new Separator(),
                {
                    name: "Withdraw Amount",
                    value: "Withdraw Amount",
                    description: "You can Withdraw Amount"
                },new Separator(),
                {
                    name: "Transfer Amount",
                    value: "Transfer Amount",
                    description: "You can Transfer Amount"
                }, new Separator()
            ]
            });
            if(state === "View my account details"){
                await viewAccountDetail(customerDetails.id);
            }else if(state === "View my account balance"){
                await viewAccountBalance(customerDetails.id);
            }else if(state === "Deposit Amount"){
                await depositAmount(customerDetails.id);
            }else if(state === "Transfer Amount"){
                await transferAmount(customerDetails.id);
            }else{
                await withdrawAmount(customerDetails.id);
            }
    } catch (error) {
        console.log("Error Occured: ",error);
    }
}

export default customerMenu;