import { CONFIG, STORAGE } from "../globals";
import { Client, Guild, MessageEmbed, TextChannel } from "discord.js";
import { Collections } from "../utils/types";

export async function onReady(client: Client, col: Collections): Promise<void> {
    console.log("Ready!");
    const users = client.users.cache.size;
    const activitiesList = [
        ` ${users} Users!`,
        ` ${col.commands.size} commands!`,
        `alice invite || Watching over ${col.commands.size} commands!`,
        `over ${client.guilds.cache.size} Servers!`,
        "I am alive?",
        "alice invite"


    ]; // Creates an arraylist containing phrases you want your bot to switch through.

    let item = activitiesList[Math.floor(Math.random() * activitiesList.length)];
    console.log(item);
    if (client.user === null) return;
    void client.user.setActivity(item, { type: "WATCHING" }); // Sets bot's activities to one of the phrases in the arraylist.
    const botboot = new MessageEmbed()
        .setTitle("Bot has booted successfully!")
        .setDescription(`Total Users: **${users}** users\nTotal Servers: **${client.guilds.cache.size}** servers\n`)
        .setColor(CONFIG.colours.green)
        .setTimestamp();
    const botlogserver: Guild = await client.guilds.fetch(STORAGE.botlogserver);

    const botready: TextChannel = botlogserver.channels.cache.get(STORAGE.botlogchannel) as TextChannel;
    void botready.send(botboot);
    setInterval(() => {
        item = activitiesList[Math.floor(Math.random() * activitiesList.length)];
        console.log(item);
        if (client.user === null) return;
        void client.user.setActivity(item, { type: "WATCHING" }); // Sets bot's activities to one of the phrases in the arraylist.
    }, 600000); // Runs this every 10 Minutes.
}

exports.onReady = onReady;