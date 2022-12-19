// Wocka-Flocka-Bot

const cleverbot = require("cleverbot-free");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const jokes = require("./jokes.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("Wocka-Flocka is ready to rock-a rock-a!!!!");
});

client.on("messageDelete", (message) => {
  message.channel.send("Stop deleting messages!");
});

// Reactions & user moding added
const BOT_PREFIX = "!";
const MOD_ME_COMMAND = "mod-me";
const MODERATOR = "1029029727933055006";

client.on("messageCreate", (message) => {
  // "ping" command
  if (message.content === "ping") {
    message.reply("pong");
  }

  // "I love you my fellow humans!" command
  if (message.content == "I love you my fellow humans!") {
    message.react("🚀");
    message.react("❤️");
  }

  // "Who is the best bot?" command
  if (message.content === "Who is the best bot?") {
    message.reply("Wocka-Flocka is the best bot! 😉😂🚀");
  }

  // Mod user command
  if (message.content === `${BOT_PREFIX}${MOD_ME_COMMAND}`) {
    modUser(message.member);
  }

  // undo "mod-me" command (remove moderator role)
  if (message.content === `!un${MOD_ME_COMMAND}`) {
    message.member.roles.remove(MODERATOR);
  }
});

function modUser(member) {
  member.roles.add(MODERATOR);
}

// style options for the !help command
const embed = {
  title: "Wocka-Flocka Commands",
  description: "List of commands for Wocka-Flocka",
  color: 16711680,
  fields: [
    // add an image into the fields
    {
      name: "!help",
      value: "List of commands",
      image: {
        url: "https://i.imgur.com/1Gp0g3q.png",
      },
    },
    {
      name: "tell me a joke",
      value: "Wocka-Flocka will tell you a joke",
    },
    {
      name: "!mod-me",
      value: "Wocka-Flocka will give you the moderator role",
    },
    {
      name: "!unmod-me",
      value: "Wocka-Flocka will remove the moderator role from you",
    },
    {
      name: "ping",
      value: "Wocka-Flocka will reply with pong",
    },
    {
      name: "roll-the-dice",
      value: "Wocka-Flocka will roll a dice",
    },
    {
      name: "8ball",
      value: "Wocka-Flocka will reply with an 8ball answer",
    },
    {
      name: "pick a number",
      value: "Wocka-Flocka will pick a number",
    },
    {
      name: "get my avatar",
      value: "Wocka-Flocka will reply with your avatar",
    },
    {
      name: "get my ID",
      value: "Wocka-Flocka will reply with your ID",
    },
    {
      name: "Recommend Algorithm resources",
      value: "Wocka-Flocka will recommend Algorithm resources",
    },
    {
      name: "Recommend React resources",
      value: "Wocka-Flocka will recommend React resources",
    },
    {
      name: "Recommend Data Structures resources",
      value: "Wocka-Flocka will recommend Data Structures resources",
    },
    {
      name: "Recommend AI resources",
      value: "Wocka-Flocka will recommend AI resources",
    },
  ],
};

// call the !help command to get a list of commands
client.on("messageCreate", (message) => {
  if (message.content === "!help") {
    message.reply({ embeds: [embed] });
  }
});

// ======================================================== //
// ======================================================== //
// CLEVERBOT AI RESPONSE CONVERSATION
// ======================================================== //
// ======================================================== //

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

// ======================================================== //
// ======================================================== //
// CHANNEL & SERVER MESSAGE AUTOMATION
// ======================================================== //
// ======================================================== //

// Welcome new members to the server
client.on("guildMemberAdd", (member) => {
  member.guild.channels.cache
    .get("835704869210083389")
    .send(`Welcome to the server, ${member}`);
});

// Send a message to a specific channel
client.on("messageCreate", (message) => {
  if (message.content === "Send a message to a specific channel") {
    client.channels.cache.get("835704869210083389").send("Hello! 🚀");
  }
  // Send a message to a DM channel
  if (message.content === "Send a message to a DM channel") {
    message.author.send("Hello! 🚀");
  }

  // Get list of members in the server
  if (message.content === "Get list of members in the server") {
    client.guilds.cache
      .get("835704869210083386")
      .members.fetch()
      .then((res) => {
        console.log(res);
        message.reply(res);
      });
  }
});

// ======================================================== //
// ======================================================== //
// GAMES & FUN
// ======================================================== //
// ======================================================== //

// "Pick a number" command
client.on("messageCreate", (message) => {
  if (message.content === "pick a number") {
    const randomNum = Math.floor(Math.random() * 100);
    message.reply(`I pick the number ${Math.floor(Math.random() * 100) + 1}!`);
  }
});

// "Roll the dice" command
client.on("messageCreate", (message) => {
  if (message.content === "roll the dice") {
    const diceRoll1 = Math.floor(Math.random() * 6) + 1;
    const diceRoll2 = Math.floor(Math.random() * 6) + 1;
    const randomNumber = diceRoll1 + diceRoll2;
    if (randomNumber === 1) {
      message.reply("Snake eyes 👁 You rolled a 1");
    } else if (randomNumber === 2) {
      message.reply("Tutu 🩰 You rolled a 2");
    } else if (randomNumber === 11) {
      message.reply("Yo! You rolled a 11 🎲");
    } else if (randomNumber === 12) {
      message.reply("Box cars 🎲 You rolled a 12");
    } else if (randomNumber === 7) {
      message.reply("Lucky 7 🍀 You rolled a 7");
    } else if (randomNumber === 9) {
      message.reply("Bang bang 🔫 Jesse James's .45, You rolled 9");
    } else message.reply(`You rolled a ${randomNumber}`);
  }
});

// 8 BALL GAME
client.on("messageCreate", (message) => {
  if (message.content === "8ball") {
    message.reply(
      `The 8 ball says: ${
        eightBall[Math.floor(Math.random() * eightBall.length)]
      }`
    );
  }
});

const eightBall = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful",
];

// "Tell me a joke" command
client.on("messageCreate", (message) => {
  if (message.content === "tell me a joke") {
    // jokes come from json file
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    message.reply(randomJoke);
  }
});

// ======================================================== //
// ======================================================== //
// REQUEST USER INFORMATION
// ======================================================== //
// ======================================================== //

client.on("messageCreate", (message) => {
  const user = message.author;

  // Get user's avatar
  if (message.content === "get my avatar") {
    message.reply(user.displayAvatarURL());
  }

  // Get user's username
  if (message.content === "get my username") {
    message.reply(`Your username is: ${user.username}`);
  }

  // Get user's tag
  if (message.content === "get my tag") {
    message.reply(`Your user tag is: ${user.tag}`);
  }

  // Get user's ID
  if (message.content === "get my ID") {
    message.reply(`Your user ID is: ${user.id}`);
  }

  // Get user's status
  if (message.content === "get my status") {
    if (user.presence.status === "online") {
      message.reply("You are online, duh!");
    } else if (user.presence.status === "idle") {
      message.reply("You are idle. So sad.");
    } else if (user.presence.status === "dnd") {
      message.reply("Looks like you are busy.");
    } else if (user.presence.status === "offline") {
      message.reply("You are offline. Get back to work!");
    }
    message.reply(user.presence.status);
  }

  // Get user's nickname
  if (message.content === "get my nickname") {
    if (!user.nickname) {
      message.reply("You don't have a nickname, silly.");
    } else message.reply(user.nickname);
  }

  // Get user's discriminator
  if (message.content === "get my discriminator") {
    message.reply(`Your user disciminator is: ${user.discriminator}`);
  }
});

// ======================================================== //
// ======================================================== //
// ALGORITHMS, DATA STRUCTURES & CODING RESOURCES
// ======================================================== //
// ======================================================== //

client.on("messageCreate", (message) => {
  // Recommend Algorithm resources
  if (message.content === "Recommend Algorithm resources") {
    message.reply(
      "https://www.youtube.com/watch?v=0IAPZzGSbME \n https://www.youtube.com/watch?v=9RHO6jU--GU \n https://www.youtube.com/watch?v=Qk0zUZW-U_M"
    );
  }

  // Recommend Data Structures resources
  if (message.content === "Recommend Data Structures resources") {
    message.reply(
      "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"
    );
  }

  // Recommend React resources
  if (message.content === "Recommend React resources") {
    message.reply(
      "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr"
    );
  }

  // Recommend React Native resources
  if (message.content === "Recommend React resources") {
    message.reply(
      "https://www.youtube.com/watch?v=Ke90Tje7VS0 \n https://www.youtube.com/watch?v=DLX62G4lc44 \n https://www.youtube.com/watch?v=DLX62G4lc44"
    );
  }

  // Recommend Node.js resources
  if (message.content === "Recommend Node.js resources") {
    message.reply(
      "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr"
    );
  }

  // Recommend HTML/CSS resources
  if (message.content === "Recommend HTML/CSS resources") {
    message.reply(
      "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"
    );
  }

  // Recommend JavaScript resources
  if (message.content === "Recommend JavaScript resources") {
    message.reply(
      "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"
    );
  }

  // Recommend Python resources
  if (message.content === "Recommend Python resources") {
    message.reply(
      "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"
    );
  }

  // Recommend AI resources
  if (message.content === "Recommend AI resources") {
    message.reply(
      "Check out these resources: https://www.coursera.org/learn/machine-learning https://www.coursera.org/learn/convolutional-neural-networks https://www.coursera.org/learn/natural-language-processing-tensorflow https://www.coursera.org/learn/ai-for-everyone"
    );
  }
});
