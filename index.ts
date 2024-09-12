#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
class Player {
    name: string;
    fuel: number = 100;
    constructor(name: string) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}

let player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please Enter Your name:"
});
let opponentSelect = await inquirer.prompt({
    type: "list",
    name: "select",
    message: "Select Your Opponent",
    choices: ["Skeleton", "Assassin", "Zombie"]
});

let p1 = new Player(player.name);
let o1 = new Player(opponentSelect.select);

const attackOpponent = () => {
    let num = Math.floor(Math.random() * 2);
    if (num > 0) {
        p1.fuelDecrease();
        console.log(chalk.bold.red(`${p1.name} fuel is ${p1.fuel}`));
        console.log(chalk.bold.green(`${o1.name} fuel is ${o1.fuel}`));
        if (p1.fuel <= 0) {
            console.log(chalk.red.bold.italic("You Loose Better Luck Next Time"));
            process.exit();
        }
    } else {
        o1.fuelDecrease();
        console.log(chalk.bold.red(`${p1.name} fuel is ${p1.fuel}`));
        console.log(chalk.bold.green(`${o1.name} fuel is ${o1.fuel}`));
        if (o1.fuel <= 0) {
            console.log(chalk.green.bold.italic("You Win"));
            process.exit();
        }
    }
};

let ask = await inquirer.prompt({
    type: "list",
    name: "opt",
    message: "Select your action",
    choices: ["Attack", "Drink Portion", "Run For Your Life.."]
});

switch (ask.opt) {
    case "Attack":
        attackOpponent();
        break;
    case "Drink Portion":
        p1.fuelIncrease();
        console.log(chalk.bold.italic.green(`Your Drink Health Portion fuel is ${p1.fuel}`));
        break;
    case "Run For Your Life..":
        console.log(chalk.red.bold.italic("You Loose, Better Luck Next Time"));
        process.exit();
        break;
    default:
        console.log("Invalid choice!");
}
