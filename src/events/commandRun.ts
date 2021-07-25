import * as db from "quick.db";
import { CONFIG, STORAGE } from "../utils/globals";
import { Command, CommandoMessage } from "discord.js-commando";
import { Guild, Message, MessageEmbed, TextChannel } from "discord.js";

export async function onCommandRun(cmd: Command, msg: CommandoMessage): Promise<Message[] | Message | undefined> {

    let desc = `User: ${msg.author} - ${msg.author.tag}\nServer ID: ${msg.guild?.id}\nServer Name: ${msg.guild?.name}`;

    if (msg.channel.type === "dm") desc = `User: ${msg.author} - ${msg.author.tag}`;
    db.add(`${cmd.name}`, 1);
    const botlogevent = new MessageEmbed()
        .setTitle(msg.channel.type === "dm" ? `Command used: ${cmd.name} (DM)` : `Command used: ${cmd.name}`)
        .setDescription(desc)
        .setColor(CONFIG.colours.yellow)
        .setTimestamp();
    const botlogserver: Guild = await msg.client.guilds.fetch(STORAGE.botlogserver);

    const botlog: TextChannel = botlogserver.channels.cache.get(STORAGE.botlogchannel) as TextChannel;
    return botlog.send(botlogevent);
}
