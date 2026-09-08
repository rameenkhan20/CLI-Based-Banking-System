import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
// type role = "Admin" | "Customer";
const rl = readline.createInterface({ input, output });
async function initialMenu() {
    const userRole = await rl.question("What's your role? Admin or Customer");
    if (userRole && userRole === "Admin") {
        console.log("Welcome to the admin dashboard!");
    }
    else if (userRole && userRole === "Customer") {
        console.log("Welcome back customer!");
    }
    rl.close();
}
// const userRole = rl.question("What's your role? Admin or Customer", () => console.log(""));
// if(userRole && userRole === "Admin"){
//     console.log("Welcome to the admin dashboard!");
// }else if(userRole && userRole === "Customer"){
//     console.log("Welcome back customer!");
// }
// const userRole: role | null = prompt("What's your role? Admin or Customer");
//# sourceMappingURL=index.js.map