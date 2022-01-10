"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../utils/globals");
const discord_js_1 = require("discord.js");
async function onReady(client) {
    console.log("Ready!");
    const users = client.users.cache.size;
    const activitiesList = [
        ` ${users} Users!`,
        ` ${client.registry.commands.size} commands!`,
        `alice invite || Watching over ${client.registry.commands.size} commands!`,
        `over ${client.guilds.cache.size} Servers!`,
        "I am alive?",
        "alice invite"
    ]; // Creates an arraylist containing phrases you want your bot to switch through.
    let item = activitiesList[Math.floor(Math.random() * activitiesList.length)];
    console.log(item);
    if (client.user === null)
        return;
    void client.user.setActivity(item, { type: "WATCHING" }); // Sets bot's activities to one of the phrases in the arraylist.
    const botboot = new discord_js_1.MessageEmbed()
        .setTitle("Bot has booted successfully!")
        .setDescription(`Total Users: **${users}** users\nTotal Servers: **${client.guilds.cache.size}** servers\n`
        + `Total commands: **${client.registry.commands.size}** Commands`)
        .setColor(globals_1.CONFIG.colours.green)
        .setTimestamp();
    const botlogserver = await client.guilds.fetch(globals_1.STORAGE.botlogserver);
    const botready = botlogserver.channels.cache.get(globals_1.STORAGE.botlogchannel);
    void botready.send(botboot);
    setInterval(() => {
        item = activitiesList[Math.floor(Math.random() * activitiesList.length)];
        console.log(item);
        if (client.user === null)
            return;
        void client.user.setActivity(item, { type: "WATCHING" }); // Sets bot's activities to one of the phrases in the arraylist.
    }, 600000); // Runs this every 10 Minutes.
}
exports.onReady = onReady;
