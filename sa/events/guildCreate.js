"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../utils/globals");
const discord_js_1 = require("discord.js");
function onGuildCreate(client, guild) {
    // This event triggers when the bot joins a guild.
    const channelid = globals_1.STORAGE.guildjoins;
    let guildicon = null;
    guildicon = guild.iconURL({ dynamic: true });
    if (guildicon === null) {
        guildicon = globals_1.discordLogo;
    }
    const newguild = new discord_js_1.MessageEmbed()
        .setColor(globals_1.CONFIG.colours.green)
        .setTitle("I have been added to a new server!")
        .setThumbnail(guildicon)
        .addField("Server Name:", `> **${guild.name}**`, false)
        .addField("Server ID:", `> **${guild.id}**`, false)
        .addField("Total Members:", `> **${guild.memberCount}** Members`)
        .addField("Total Bot Users:", `> **${client.users.cache.size}** users`)
        .setFooter("Owner Information- New Guild");
    const botLogs = guild.client.channels.cache.get(channelid);
    void botLogs.send(newguild);
}
exports.onGuildCreate = onGuildCreate;
