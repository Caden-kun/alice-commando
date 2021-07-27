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

}
