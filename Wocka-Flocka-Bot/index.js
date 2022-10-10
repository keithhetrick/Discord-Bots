// Griz-Bot

const cleverbot = require("cleverbot-free");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("Our bot is ready to go!!!!");
});

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.reply("pong");
  }
});

client.on("messageDelete", (message) => {
  message.channel.send("Stop deleting messages!");
});

// Reactions & user moding added
const BOT_PREFIX = "!";
const MOD_ME_COMMAND = "mod-me";

client.on("messageCreate", (message) => {
  if (message.content == "I love you my fellow humans!") {
    message.react("🚀");
    message.react("❤️");
  }

  if (message.content === `${BOT_PREFIX}${MOD_ME_COMMAND}`) {
    modUser(message.member);
  }
});

function modUser(member) {
  member.roles.add("1029029727933055006");
}

// Cleverbot AI response & add text / res to Discord
let conversation = [];

client.on("messageCreate", (message) => {
  if (message.author.bot) return false;
  if (message.mentions.has(client.user.id)) {
    let text = message.content;
    text = text.substring(text.indexOf(">") + 2, text.length);
    console.log(text);

    cleverbot(text, conversation).then((res) => {
      conversation.push(text);
      conversation.push(res);
      message.channel.send(res);
    });
  }
});

client.login(process.env.TOKEN);
