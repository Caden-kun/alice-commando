import { CONFIG, STORAGE } from "../utils/globals";
import { Message, MessageEmbed, TextChannel } from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function messageUpdate(oldMsg: Message, newMsg: Message): Promise<void> {
    if (oldMsg.channel.type === "dm") return;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    if (oldMsg.author.bot === true) return;
    const files = oldMsg.attachments.array();

    const embed = new MessageEmbed()
        .setTitle("Message edited!")
        .setAuthor(oldMsg.author.tag, oldMsg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        .setDescription(`Channel: ${oldMsg.channel}\nOld Message: ${oldMsg}\n Edited Message: ${newMsg}`)
        .setColor(CONFIG.colours.red)
        .setFooter(`Author: ${oldMsg.author.id} • Message ID: ${oldMsg.id}`)
        .setTimestamp();
    if (oldMsg.attachments.first() !== undefined) {
        embed.setImage(files[0].url);
    }
    const channels = STORAGE.modlogs;

    channels.forEach((ch) => {
        const channel = oldMsg.guild?.channels.cache.get(ch.channelID) as TextChannel | undefined;

        if (channel === undefined) return;

        return channel.send(embed);

    });

}
