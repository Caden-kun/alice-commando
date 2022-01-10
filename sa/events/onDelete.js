"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../utils/globals");
const discord_js_1 = require("discord.js");
async function onDelete(msg) {
    if (msg.channel.type === "dm")
        return;
    if (msg.author?.bot === true)
        return;
    const files = msg.attachments.array();
    const embed = new discord_js_1.MessageEmbed()
        .setTitle("Message deleted!")
        .setAuthor(msg.author?.tag, msg.author?.displayAvatarURL({ dynamic: true, size: 4096 }))
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        .setDescription(`Channel: ${msg.channel}\nMessage content: ${msg.content}`)
        .setColor(globals_1.CONFIG.colours.red)
        .setFooter(`Author: ${msg.author?.id} • Message ID: ${msg.id}`)
        .setTimestamp();
    if (msg.attachments.first() !== undefined) {
        embed.setImage(files[0].url);
    }
    const channels = globals_1.STORAGE.modlogs;
    channels.forEach((ch) => {
        const channel = msg.guild?.channels.cache.get(ch.channelID);
        if (channel === undefined)
            return;
        return channel.send(embed);
    });
}
exports.onDelete = onDelete;
