

function validBalance(amount: number, balance: number ): boolean{
        if(amount > balance){
            console.log("Insufficient amount for such Transaction!");
            return false;
        }
        return true;
    }


export default validBalance;