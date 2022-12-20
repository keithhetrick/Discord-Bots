/*                                                                                                                                      
██╗    ██╗ ██████╗  ██████╗██╗  ██╗ █████╗       ███████╗██╗      ██████╗  ██████╗██╗  ██╗ █████╗     ██████╗  ██████╗ ████████╗
██║    ██║██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗      ██╔════╝██║     ██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
██║ █╗ ██║██║   ██║██║     █████╔╝ ███████║█████╗█████╗  ██║     ██║   ██║██║     █████╔╝ ███████║    ██████╔╝██║   ██║   ██║   
██║███╗██║██║   ██║██║     ██╔═██╗ ██╔══██║╚════╝██╔══╝  ██║     ██║   ██║██║     ██╔═██╗ ██╔══██║    ██╔══██╗██║   ██║   ██║   
╚███╔███╔╝╚██████╔╝╚██████╗██║  ██╗██║  ██║      ██║     ███████╗╚██████╔╝╚██████╗██║  ██╗██║  ██║    ██████╔╝╚██████╔╝   ██║   
 ╚══╝╚══╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝      ╚═╝     ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
*/

const cleverbot = require("cleverbot-free");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
require("dotenv").config();

// JSON files
const jokes = require("./jsonFiles/jokes.json");
const fortunes = require("./jsonFiles/fortune.json");
const eightBall = require("./jsonFiles/8ball.json");
const quotes = require("./jsonFiles/quotes.json");
const facts = require("./jsonFiles/facts.json");
// const { IP2Location } = require("ip2location-nodejs");

// API keys
const WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const IP_API_KEY = process.env.IP_GEOLOCATION_API_KEY;

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

// Embeded message
const exampleEmbed = {
  color: 0x0099ff,
  title: "Wocka-Flocka Commands",
  url: "https://discord.js.org",
  author: {
    name: "Wocka-Flocka",
    icon_url: "https://i.imgur.com/AfFp7pu.png",
    url: "https://discord.js.org",
  },
  description: "List of commands for Wocka-Flocka",
  thumbnail: {
    url: "https://i.imgur.com/AfFp7pu.png",
  },
  // create an array of fields with current list of bot commands
  fields: [
    {
      name: "!help",
      value: "List of avaliable commands",
    },
    {
      name: "\u200b",
      value: "\u200b",
      inline: false,
    },
    {
      name: "tell me a joke",
      value: "Wocka-Flocka will tell you a terrible joke",
      inline: true,
    },
    {
      name: "roll the dice",
      value: "Wocka-Flocka will roll some dice",
      inline: true,
    },
    {
      name: "8ball",
      value: "Wocka-Flocka will reply with an 8ball answer",
      inline: true,
    },
    {
      name: "tell me my fortune",
      value: "Wocka-Flocka will tell you your fortune",
      inline: true,
    },
    {
      name: "flip a coin",
      value: "Wocka Flocka flips a coin",
      inline: true,
    },
    {
      name: "rock, paper, scissors",
      value: "Returns rock, paper, or scissors",
      inline: true,
    },
    {
      name: "inspirational quote",
      value: "Wocka-Flocka will give you an inspirational quote",
      inline: true,
    },
    {
      name: "random fact",
      value: "Wocka-Flocka will give you a Snapple-top level random fact",
      inline: true,
    },
    {
      name: "pick a number",
      value: "Wocka-Flocka will pick a number between 1 and 100",
    },
    {
      name: "\u200b",
      value: "\u200b",
      inline: false,
    },
    {
      name: "HOLIDAY TRACKER",
      value: "\u200b",
      inline: false,
    },
    {
      name: "days until christmas",
      value: "Wocka-Flocka will tell you how many days until Christmas",
    },
    {
      name: "days until halloween",
      value: "Wocka-Flocka will tell you how many days until Halloween",
    },
    {
      name: "days until new years",
      value: "Wocka-Flocka will tell you how many days until New Years Eve",
    },
    {
      name: "\u200b",
      value: "\u200b",
      inline: false,
    },
    {
      name: "WEATHER, TIME & LOCATION TRACKER",
      value: "\u200b",
      inline: false,
    },
    {
      name: "what is the weather like",
      value: "Wocka-Flocka will tell you the weather",
    },
    {
      name: "what time is it in EST/CST/MST/PST",
      value: "Wocka-Flocka will tell you the time in EST/CST/MST/PST",
    },
    {
      name: "\u200b",
      value: "\u200b",
      inline: false,
    },
    {
      name: "Recommend Algorithm resources",
      value: "Wocka-Flocka will recommend Algorithm resources",
    },
    {
      name: "Recommend Data Structures resources",
      value: "Wocka-Flocka will recommend Data Structures resources",
    },
    {
      name: "Recommend Front End Development resources",
      value: "Wocka-Flocka will recommend Front End Development resources",
    },
    {
      name: "Recommend Back End Development resources",
      value: "Wocka-Flocka will recommend Back End Development resources",
    },
    {
      name: "Recommend Full Stack Development resources",
      value: "Wocka-Flocka will recommend Full Stack Development resources",
    },
    {
      name: "Recommend React resources",
      value: "Wocka-Flocka will recommend React resources",
    },
    {
      name: "Recommend Node resources",
      value: "Wocka-Flocka will recommend Node resources",
    },
    {
      name: "Recommend AI resources",
      value: "Wocka-Flocka will recommend AI resources",
    },
  ],
  image: {
    url: "https://i.imgur.com/AfFp7pu.png",
  },
  timestamp: new Date().toISOString(),
  footer: {
    text: "Bot creator: Keith Hetrick",
    icon_url: "https://i.imgur.com/AfFp7pu.png",
  },
};
// define current channel using ID 1028135751508033676
const channel = client.channels.cache.get("1028135751508033676");
// channel.send({ embeds: [exampleEmbed] });

// call the !help command to get a list of commands
client.on("messageCreate", (message) => {
  if (message.content === "!help") {
    // message.reply({ embeds: [embed] });
    message.reply({ embeds: [exampleEmbed] });
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

// Welcome message to new members to the server
// create manually welcome command for below message
// client.on("guildMemberAdd", (member) => {
//   member.guild.channels.cache
//     .get("1028135751508033676")
//     .send(`Welcome to the server, ${member}`);
// });

// add users name to the welcome message

// const welcomeEmbed = {
//   color: 3447003,
//   title: "Welcome to the server!",
//   description: "We're so glad you're here. 🚀",
//   fields: [
//     {
//       name: "Please read the rules",
//       value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     },
//     {
//       name: "Please introduce yourself",
//       value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     },
//   ],
//   timestamp: new Date(),
//   footer: {
//     text: "Wocka-Flocka",
//     icon_url: "https://i.imgur.com/AfFp7pu.png",
//   },
// };

// manualy call the above welcome message witha command
// client.on("messageCreate", (message) => {
//   if (message.content === "!welcome") {
//     message.reply({ embeds: [welcomeEmbed] });
//   }
// });

// client.on("guildMemberAdd", (member) => {
//   member.guild.channels.cache.get("1028135751508033676").send({
//     embeds: [
//       {
//         title: `Welcome to the server, ${member}`,
//         description: "We're so glad you're here. 🚀",
//         fields: [
//           {
//             name: "Please read the rules",
//             value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//           },
//           {
//             name: "Please introduce yourself",
//             value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//           },
//         ],
//         timestamp: new Date(),
//         footer: {
//           text: "Wocka-Flocka",
//           icon_url: "https://i.imgur.com/AfFp7pu.png",
//         },
//       },
//     ],
//   });
// });

// show username in welcome message
client.on("messageCreate", (message) => {
  if (message.content === "!welcome") {
    message.reply({
      embeds: [
        {
          title: `Welcome to the server, ${message.author.username}`,
          description: "We're so glad you're here. 🚀",
          fields: [
            {
              name: "Please read the rules",
              value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            },
            {
              name: "Please introduce yourself",
              value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "Wocka-Flocka",
            icon_url: "https://i.imgur.com/AfFp7pu.png",
          },
        },
      ],
    });
  }

  // Send a message to a specific channel
  if (message.content === "Send a message to channel") {
    client.channels.cache.get("1054444166664429639").send("Hello! 🚀");
  }
  // Send a message to a DM channel
  if (message.content === "Send message to DM") {
    message.author.send("Hello! 🚀");
  }

  // Get list of members in the server
  if (message.content === "Get list of current members") {
    // fetch all current members in the server
    const list = client.guilds.cache.get("1028135751508033676");

    list.members.cache.forEach((member) => {
      console.log(member.user.username);
    });

    // total number of members in the server
    const members = list.members.cache;
    message.author.send(`Total members: ${members.size}`);
    console.log(`Total members: ${members.size}`);
  }
});

// ======================================================== //
// ======================================================== //
// GAMES & FUN
// ======================================================== //
// ======================================================== //

client.on("messageCreate", (message) => {
  // "Pick a number" command
  if (message.content === "pick a number") {
    const randomNum = Math.floor(Math.random() * 100 + 1);
    message.reply(`I pick the number ${randomNum}!`);
  }

  // "Roll the dice" command
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

  // "8ball" command
  if (message.content === "8ball") {
    // 8ball responses come from json file
    const randomEightBall =
      eightBall[Math.floor(Math.random() * eightBall.length)];
    message.reply(`The 8 ball says: ${randomEightBall}`);
  }

  // "Tell me a joke" command
  if (message.content === "tell me a joke") {
    // jokes come from json file
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    message.reply(randomJoke);
  }

  // "Tell me my fortune" command
  if (message.content === "tell me my fortune") {
    // fortunes come from json file
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    message.reply(`Fortune teller says: ${randomFortune}`);
  }

  // "Flip a coin" command
  if (message.content === "flip a coin") {
    const coinFlip = Math.floor(Math.random() * 2) + 1;
    if (coinFlip === 1) {
      message.reply("Heads 🪙");
    } else if (coinFlip === 2) {
      message.reply("Tails 🪙");
    }
  }

  // "Rock, paper, scissors" command
  if (message.content === "rock, paper, scissors") {
    const rockPaperScissors = Math.floor(Math.random() * 3) + 1;
    if (rockPaperScissors === 1) {
      message.reply("Rock 🪨");
    } else if (rockPaperScissors === 2) {
      message.reply("Paper 📰");
    } else if (rockPaperScissors === 3) {
      message.reply("Scissors ✂️");
    }
  }

  // share inspirational quote
  if (message.content === "inspirational quote") {
    // quotes come from json file
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    message.reply(`"${randomQuote.quoteText}" - ${randomQuote.quoteAuthor}`);
  }

  // random fact generator
  if (message.content === "random fact") {
    // facts come from json file
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    message.reply(randomFact);
  }

  // ======================================================== //
  // ======================================================== //
  // HOLIDAY COUNTDOWNS
  // ======================================================== //
  // ======================================================== //

  // "aays until christmas" command
  if (message.content === "days until christmas") {
    const today = new Date();
    const nextChristmas = new Date(today.getFullYear(), 11, 25);
    if (today.getMonth() === 11 && today.getDate() > 25) {
      nextChristmas.setFullYear(nextChristmas.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const daysUntilChristmas = Math.ceil(
      (nextChristmas.getTime() - today.getTime()) / oneDay
    );
    message.reply(`There are ${daysUntilChristmas} days until Christmas!`);
  }

  // days until new years
  if (message.content === "days until new years") {
    const today = new Date();
    const nextNewYears = new Date(today.getFullYear(), 11, 31);
    if (today.getMonth() === 11 && today.getDate() > 31) {
      nextNewYears.setFullYear(nextNewYears.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const daysUntilNewYears = Math.ceil(
      (nextNewYears.getTime() - today.getTime()) / oneDay
    );
    message.reply(`There are ${daysUntilNewYears} days until New Years!`);
  }

  // days until valentines day

  // get current date
  if (message.content === "what is the date") {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    message.reply(`Today is ${month}/${date}/${year}`);
  }

  // ======================================================== //
  // ======================================================== //
  // TIME ZONES
  // ======================================================== //
  // ======================================================== //

  // get time in EST
  if (message.content === "what time is it in EST") {
    const estTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    message.reply(`It is currently ${estTime} in EST`);
  }

  // get time in CST
  if (message.content === "what time is it in CST") {
    const cstTime = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
    });
    message.reply(`It is currently ${cstTime} in CST`);
  }

  // get time in PST
  if (message.content === "what time is it in PST") {
    const pstTime = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });
    message.reply(`It is currently ${pstTime} in PST`);
  }

  // get time in MST
  if (message.content === "what time is it in MST") {
    const mstTime = new Date().toLocaleString("en-US", {
      timeZone: "America/Denver",
    });
    message.reply(`It is currently ${mstTime} in MST`);
  }

  // show users ip address in a message
  if (message.content === "where is my ip address located") {
    const axios = require("axios");
    axios
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${IP_API_KEY}`
        // "https://ipgeolocation.abstractapi.com/v1/?api_key=433722e6c1e640499d7284bdceb6fedc"
      )
      .then((response) => {
        console.log(response.data);
        message.reply(
          `Your IP address is located in ${response.data.city}, ${response.data.region}, ${response.data.country}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // get IP address & return current weather using the IP information
  if (message.content === "what is the weather like") {
    const axios = require("axios");
    axios
      .get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${IP_API_KEY}`)
      .then((response) => {
        console.log("LOCATION RESPONSE DATA: " + response.data.city);
        const city = response.data.city;
        const region = response.data.region;
        const country = response.data.country;
        const latitude = response.data.latitude;
        const longitude = response.data.longitude;
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=imperial`
          )
          .then((response) => {
            console.log(
              "WEATHER RESPONSE DATA: " + response.data.weather[0].main
            );
            const currentWeatherMain = response.data.weather[0].main;
            const currentWeatherDescription =
              response.data.weather[0].description;
            const currentTemp = response.data.main.temp;
            const currentFeelsLike = response.data.main.feels_like;
            const currentWindSpeed = response.data.wind.speed;
            const currentHumidity = response.data.main.humidity;
            const currentClouds = response.data.clouds.all;
            message.reply(
              `The current weather in ${city}, ${region}, ${country} is: ${currentWeatherMain} & ${currentWeatherDescription}, with a temperature of ${currentTemp} °F and a real-feel of ${currentFeelsLike} °F. The wind speed is ${currentWindSpeed} MPH with a humidity of ${currentHumidity}% and a cloudiness of ${currentClouds}%. `
            );
          })
          .catch((error) => {
            console.log("WEATHER ERROR: " + error);
          });
      })
      .catch((error) => {
        console.log("LOCATION ERROR: " + error);
      });
  }

  // // Automate Quote of the day that happens every 24 hours
  // const schedule = require("node-schedule");
  // const rule = new schedule.RecurrenceRule();
  // rule.hour = 0;
  // rule.minute = 0;
  // rule.second = 0;
  // const job = schedule.scheduleJob(rule, function () {
  //   const quoteOfTheDay = quotes[Math.floor(Math.random() * quotes.length)];
  //   client.channels.cache
  //     .get("CHANNEL ID")
  //     .send(`"${quoteOfTheDay.quoteText}" - ${quoteOfTheDay.quoteAuthor}`);
  // });

  // // Alt automated quote of the day
  // const quoteOfTheDay = () => {
  //   const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  //   return randomQuote;
  // };

  // // set up schedule for quote of the day
  // const schedule = require("node-schedule");
  // const rule = new schedule.RecurrenceRule();
  // rule.dayOfWeek = [0, new schedule.Range(0, 6)];
  // rule.hour = 0;
  // rule.minute = 0;

  // schedule.scheduleJob(rule, function () {
  //   console.log("The answer to life, the universe, and everything!");
  //   client.channels.cache.get("CHANNEL_ID").send(quoteOfTheDay());
  // });
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
