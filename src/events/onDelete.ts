import { CONFIG, STORAGE } from "../utils/globals";
import { Message, MessageEmbed, PartialMessage, TextChannel } from "discord.js";

export async function onDelete(msg: Message | PartialMessage): Promise<void> {

    const files = msg.attachments.array();

    const embed = new MessageEmbed()
        .setTitle("Message deleted!")
        .setAuthor(msg.author?.tag, msg.author?.displayAvatarURL({ dynamic: true, size: 4096 }))
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        .setDescription(`Channel: ${msg.channel}\nMessage content: ${msg.content}`)
        .setColor(CONFIG.colours.red)
        .setTimestamp();
    if (msg.attachments.first() !== undefined) {
        embed.setImage(files[0].url);
    }
    const channels = STORAGE.modlogs;

    channels.forEach((ch) => {
        const channel = msg.guild?.channels.cache.get(ch) as TextChannel | undefined;

        if (channel === undefined) return;

        return channel.send(embed);

    });
}
