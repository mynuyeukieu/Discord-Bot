const { Client, Collection } = require("discord.js");
//! Import Discord.Js.
const client = new Client({
  intents: 32767,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
//! Make New Discord Client.
const config = require("./botconfig/main.json");
const fs = require("fs");
//! Export Client To Give Other Files Access.
const chalk = require("chalk");
//! Import Chalk

//! ———————————————[Global Variables]———————————————
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection(); // slash 1
client.config = require("./botconfig/main.json");
require("./handler")(client);
//! Initializing the project.

//! ———————————————[Logging Into Client]———————————————
const token = process.env["clienttoken"] || client.config.clienttoken;
if (token === "") {
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(
    chalk.white("["),
    chalk.red.bold("AntiCrash"),
    chalk.white("]"),
    chalk.gray(" : "),
    chalk.white.bold("Invalid Token"),
  );
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(chalk.magenta("There Are 3 Ways To Fix This"));
  console.log(
    chalk.blue("Put Your ") + chalk.red("Bot Token ") + chalk.blue("in:"),
  );
  console.log(
    chalk.yellow.bold("1.) ") +
      chalk.cyan("index.js") +
      chalk.gray(
        " On the client.login line remove client.login(token) and write client.login('Your token')",
      ),
  );
  console.log(
    chalk.yellow.bold("2.) ") +
      chalk.cyan("ENV/Secrets") +
      chalk.gray(
        " If using replit, make new secret named 'clienttoken' and put your token in it else, if your using VsCode, Then Follow Some ENV tutorials (I don't suggest using it in VSC)",
      ),
  );
  console.log(
    chalk.yellow.bold("3.) ") +
      chalk.cyan("main.json ") +
      chalk.gray(
        'Go To botconfig/main.json, Find The Line with client.token and put "client.token":"Your Bot Token"',
      ),
  );
  console.log(
    chalk.green.bold("Still Need Help? Contact Me:\n") +
      chalk.yellow.italic("Discord: DrakeZee#5223\n") +
      chalk.yellow.italic("Discord Server: dsc.gg/botsway"),
  );
} else {
  client.login(token);
}
//! Login The Bot.
//! ———————————————[Error Handling]———————————————
process.on("unhandledRejection", (reason, p) => {
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(
    chalk.white("["),
    chalk.red.bold("AntiCrash"),
    chalk.white("]"),
    chalk.gray(" : "),
    chalk.white.bold("Unhandled Rejection/Catch"),
  );
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(
    chalk.white("["),
    chalk.red.bold("AntiCrash"),
    chalk.white("]"),
    chalk.gray(" : "),
    chalk.white.bold("Uncaught Exception/Catch"),
  );
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(
    chalk.white("["),
    chalk.red.bold("AntiCrash"),
    chalk.white("]"),
    chalk.gray(" : "),
    chalk.white.bold("Multiple Resolves"),
  );
  console.log(chalk.gray("—————————————————————————————————"));
  console.log(type, promise, reason);
});

const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.db, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Đã kết nối với DB");
  })
  .catch((err) => {
    console.log(err);
  });

//! Import https and HttpsAgent
const https = require("node:https");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
//! ———————————————[Logging Mysql]———————————————
require("dotenv").config();
const mysql = require("mysql");
var mysql_config = {
  connectionLimit: 5,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
};
const db = mysql.createConnection(mysql_config);
//! ———————————————[Module Exports]———————————————
module.exports = {
  client,
  fs,
  config,
  db,
  httpsAgent,
};
