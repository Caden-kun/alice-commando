import { CONFIG, STORAGE } from "../utils/globals";
import { Guild, MessageEmbed, TextChannel } from "discord.js";
import { CommandoClient } from "discord.js-commando";
import Storage from "../utils/storage";
export async function onReady(client: CommandoClient): Promise<void> {
    console.log("Ready!");
    const users = client.users.cache.size;
    const activitiesList = [
        `${STORAGE.membercount} Users!`,
        `${client.registry.commands.filter((c) => !c.ownerOnly).size} commands!`,
        `alice invite || Watching over ${client.registry.commands.filter((c) => !c.ownerOnly).size} commands!`,
        `over ${client.guilds.cache.size} Servers!`,
        "I am alive?",
        "alice invite",
        "alice upvote!",
        "over Kirito || alice help for help!"


    ]; // Creates an arraylist containing phrases you want your bot to switch through.
    let item = activitiesList[Math.floor(Math.random() * activitiesList.length)];
    console.log(item);
    if (client.user === null) return;
    void client.user.setActivity(item, { type: "WATCHING" }); // Sets bot's activities to one of the phrases in the arraylist.
    const botboot = new MessageEmbed()
        .setTitle("Bot has booted successfully!")
        .setDescription(`Total Users: **${users}** users\nTotal Servers: **${client.guilds.cache.size}** servers\n`
        + `Total commands: **${client.registry.commands.filter((c) => !c.ownerOnly).size}** Commands`)
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
    setInterval(() => {
        let members = 0;
        client.guilds.cache.forEach((g) => {
            members += g.memberCount;
        });
        STORAGE.membercount = members;
        Storage.saveConfig();

    }, 120000);
}

