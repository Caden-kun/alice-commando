import { CONFIG, STORAGE } from "../utils/globals";
import { Message, MessageEmbed, PartialMessage, TextChannel } from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function messageUpdate(oldMsg: Message | PartialMessage, newMsg: Message | PartialMessage): Promise<void> {
    if (oldMsg.channel.type === "dm") return;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (oldMsg.author === null)
        return void console.log("there was an error.");
    if (oldMsg.author.bot) return;
    const embed = new MessageEmbed()
        .setTitle("Message edited!")
        .setAuthor(oldMsg.author.tag, oldMsg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        .setDescription(`**Channel:** ${oldMsg.channel}\n**Old Message:** ${oldMsg}\n **Edited Message:** ${newMsg}`)
        .setColor(CONFIG.colours.red)
        .setFooter(`Author: ${oldMsg.author.id} • Message ID: ${oldMsg.id}`)
        .setTimestamp();
    const channels = STORAGE.modlogs;

    channels.forEach((ch) => {
        const channel = oldMsg.guild?.channels.cache.get(ch.channelID) as TextChannel | undefined;

        if (channel === undefined) return;
        if (oldMsg.content === newMsg.content)
            return;
        return channel.send(embed);

    });

}
