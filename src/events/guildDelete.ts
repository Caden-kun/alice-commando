import { CONFIG, STORAGE, discordLogo } from "../utils/globals";
import { Guild, MessageEmbed, TextChannel } from "discord.js";

export function onGuildDelete(guild: Guild): void {
    // This event triggers when the bot joins a guild.
    const channelid = STORAGE.botlogchannel;
    let guildicon = null;

    guildicon = guild.iconURL({ dynamic: true });
    if (guildicon === null) {
        guildicon = discordLogo;
    }

    const leaveguild = new MessageEmbed()
        .setColor(CONFIG.colours.red)
        .setTitle("I have been removed from a server! :((   ")
        .setThumbnail(guildicon)
        .addField("Server Name:", `> **${guild.name}**`, false)
        .addField("Server ID:", `> **${guild.id}**`, false)
        .addField("Total Members:", `> **${guild.memberCount}** Members`)
        .setFooter("Owner Information- New Guild");
    const botLogs = guild.client.channels.cache.get(channelid) as TextChannel;
    void botLogs.send(leaveguild);
}