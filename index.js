#!/usr/bin/env node
import inquirer from "inquirer";
class ATM {
    accountBalance;
    constructor(initialBalance) {
        this.accountBalance = initialBalance;
    }
    withdrawCash(amount) {
        if (amount <= this.accountBalance) {
            this.accountBalance -= amount;
            return `Transaction successful. Please collect your cash. Remaining balance: ${this.accountBalance}`;
        }
        else {
            return "Insufficient funds.";
        }
    }
    balanceInquiry() {
        return `Your account balance is: ${this.accountBalance}`;
    }
}
async function main() {
    const atm = new ATM(60000);
    console.log("Welcome to Our Bank ATM");
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please choose an option:',
            choices: ['Withdraw', 'Balance Inquiry'],
        },
    ]);
    if (choice === 'Withdraw') {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'please choose an option:',
                choices: ['Enter custom amount', 'Fast Cash'],
            },
        ]);
        if (action === 'Enter custom amount') {
            const { withdrawAmount } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'withdrawAmount',
                    message: 'Enter the amount you want to withdraw:',
                    validate: (input) => {
                        return !isNaN(parseFloat(input)) && parseFloat(input) > 0 ? true : 'Please enter a valid amount.';
                    },
                },
            ]);
            console.log(atm.withdrawCash(parseFloat(withdrawAmount)));
        }
        else if (action === 'Fast Cash') {
            const { denomination } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'denomination',
                    message: 'Please choose a denomination:',
                    choices: ['1000', '2000', '5000'],
                },
            ]);
            console.log(atm.withdrawCash(parseFloat(denomination)));
        }
    }
    else if (choice === 'Balance Inquiry') {
        console.log(atm.balanceInquiry());
    }
    console.log("Thank you for using Our Bank ATM.");
}
main();
