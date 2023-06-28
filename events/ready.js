const { client, config, httpsAgent } = require("../bi");
const fetch = require("node-fetch").default;
const UserAgent = require('user-agents');
const useragent = new UserAgent();
const chalk = require("chalk");
const { version: discordjsVersion } = require("discord.js");
const { prefix } = require("../botconfig/main.json");
const main_json = require("../botconfig/main.json");
client.on("ready", async () => {
  const supportServer = client.guilds.cache.get(`${main_json.TestingServerID}`);
  if (!supportServer) return console.log("");
  //! ———————————————[Load Status]———————————————
  client.user.setStatus("dnd");
  async function random() {
    const url = "https://" + config.SERVER_URL + "/players.json";
    const response = await fetch(url, { agent: httpsAgent, headers: {'User-Agent': useragent.toString()} });
    const infos = await fetch("https://" + config.SERVER_URL + "/info.json", {
      agent: httpsAgent,headers: {'User-Agent': useragent.toString()}
    });
    const body = await response.json();
    const info = await infos.json();
    let entry = {};
    entry.infos = info;
    if (
      undefined !== entry.infos &&
      entry.infos.vars["Công việc"] &&
      entry.infos.vars.sv_maxClients &&
      entry.infos.vars.Uptime
    ) {
      var b = entry.infos.vars["Công việc"];
      var max = entry.infos.vars.sv_maxClients;
      var times = entry.infos.vars.Uptime;
      let entryy = {};
      entryy.players = body;
      if (undefined !== entryy.players && entryy.players.length) {
        var onl = entryy.players.length;
        let status = [
          `Anh Chị Em ${onl || "0"}/${max || "550"} | ${
            b || "👮🏻: 00 👨‍⚕️: 00 🔧: 00"
          }`,
          `Anh chị em Uptime: ${times || "00h 00m"}`,
          `${prefix}help || ${client.guilds.cache.size} ${
            client.guilds.cache.size > 1 ? "Servers" : "Server"
          }`,
          "NightMare Gang",
        ];
        let rstatus = Math.floor(Math.random() * status.length);

        client.user.setActivity({ name: status[rstatus], type: "WATCHING" });
      }
    }
  }
 setInterval(random, 1000 * 10);
  //! ———————————————[Ready MSG]———————————————
  console.log(chalk.green.bold("Success!"));
  console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(
      `${
        client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Users,"
          : "User,"
      }`,
    ),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`),
  );
  console.log(
    chalk.white(`Prefix:` + chalk.red(` ${prefix}`)),
    chalk.white("||"),
    chalk.red(`${client.commands.size}`),
    chalk.white(`Commands`),
  );
  console.log(
    chalk.white(`Support-Server: `) +
      chalk.red(`${supportServer.name || "None"}`),
  );
  console.log("");
  console.log(chalk.red.bold("——————————[Statistics]——————————"));
  console.log(
    chalk.gray(
      `Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}`,
    ),
  );
  console.log(
    chalk.gray(
      `Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2,
      )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2,
      )} MB`,
    ),
  );
});
