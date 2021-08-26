import { CONFIG, STORAGE, discordLogo } from "../utils/globals";
import { Client, Guild, MessageEmbed, TextChannel } from "discord.js";


export function onGuildCreate(client: Client, guild: Guild): void {
    // This event triggers when the bot joins a guild.
    const channelid = STORAGE.guildjoins;
    let guildicon = null;

    guildicon = guild.iconURL({ dynamic: true });
    if (guildicon === null) {
        guildicon = discordLogo;
    }

    const newguild = new MessageEmbed()
        .setColor(CONFIG.colours.green)
        .setTitle("I have been added to a new server!")
        .setThumbnail(guildicon)
        .addField("Server Name:", `> **${guild.name}**`, false)
        .addField("Server ID:", `> **${guild.id}**`, false)
        .addField("Total Members:", `> **${guild.memberCount}** Members`)
        .addField("Total Bot Users:", `> **${client.users.cache.size}** users`)
        .setFooter(`Serving ${client.guilds.cache.size} servers!`);
    const botLogs = guild.client.channels.cache.get(channelid) as TextChannel;
    void botLogs.send(newguild);
    if (client.guilds.cache.size === 35)
        void botLogs.send("Congratulations <@597884706897264681>, I have hit 35 servers!");
    if (client.guilds.cache.size === 40)
        void botLogs.send("Congratulations <@597884706897264681>, I have hit 40 servers!");
    if (client.guilds.cache.size === 50)
        void botLogs.send("Congratulations <@597884706897264681>, I have hit 50 servers! Only 25 more for verification!");
    if (client.guilds.cache.size === 60)
        void botLogs.send("Congratulations <@597884706897264681>, I have hit 60 servers! Only 15 more for verification!");
    if (client.guilds.cache.size === 70)
        void botLogs.send("Congratulations <@597884706897264681>, I have hit 70 servers! Only 5 more for verification!");
    if (client.guilds.cache.size === 75)
        void botLogs.send("CONGRATS!!! I have hit 75 servers! Go and get alice verifieid already!\n <@597884706897264681>");


}
