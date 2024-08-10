#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.green(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`));
        }
        else {
            console.log(chalk.red("Insufficient balance. Withdrawal unsuccessful."));
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(chalk.green(`Deposit of $${amount} successful. New balance: $${this.balance}`));
    }
    // Check balance
    checkBalance() {
        console.log(chalk.blue(`Your current balance is: $${this.balance}`));
    }
}
// Function to display a welcome message with user's name
function displayWelcomeMessage(name) {
    console.log(chalk.yellowBright.bold("*******************************************************************************"));
    console.log(chalk.yellowBright.bold("*                                                                             *"));
    console.log(chalk.yellowBright.bold(`*                Welcome to the Bank App, ${name}!                 *`));
    console.log(chalk.yellowBright.bold("*                                                                             *"));
    console.log(chalk.yellowBright.bold("*******************************************************************************"));
    console.log(chalk.cyanBright("\nPlease follow the instructions to manage your bank account.\n"));
}
// User interaction part
async function main() {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Please enter your name:'
    });
    displayWelcomeMessage(name);
    const account = new BankAccount(123456789, 500); // Example account
    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit']
        });
        switch (action) {
            case 'Check Balance':
                account.checkBalance();
                break;
            case 'Deposit':
                const { depositAmount } = await inquirer.prompt({
                    type: 'input',
                    name: 'depositAmount',
                    message: 'Enter amount to deposit:',
                    validate: (input) => {
                        const amount = parseFloat(input);
                        return !isNaN(amount) && amount > 0 ? true : 'Please enter a valid amount';
                    }
                });
                account.deposit(parseFloat(depositAmount));
                break;
            case 'Withdraw':
                const { withdrawAmount } = await inquirer.prompt({
                    type: 'input',
                    name: 'withdrawAmount',
                    message: 'Enter amount to withdraw:',
                    validate: (input) => {
                        const amount = parseFloat(input);
                        return !isNaN(amount) && amount > 0 ? true : 'Please enter a valid amount';
                    }
                });
                account.withdraw(parseFloat(withdrawAmount));
                break;
            case 'Exit':
                console.log(chalk.yellow(`Thank you for using the bank, ${name}! Goodbye!`));
                return;
        }
    }
}
main();
