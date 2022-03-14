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
    const urgentmessage = new MessageEmbed()
        .setTitle(`Urgent Bot Announcement for ${msg.client.user?.username}!`)
        .setThumbnail(msg.client.user?.displayAvatarURL({ dynamic: true }) ?? "" )
        .setDescription("Normal commands will are being phased out in favour of **slash commands** (/).")
        .addField("What does this mean for you?", "The server you are currently in must re-invite the bot to support slash commands. "
        + "To re-invite alice to your server, [click here!](https://discord.com/api/oauth2/authorize?client_id=934225413163589682&permissions=1644972474359&scope=bot%20applications.commands)", true)
        .addField("When will normal commands stop working?", "The expected date for normal commands to stop working is <t:1651183200>.", true)
        .setFooter("This announcement will be removed once the bot rewrite has been completed. Thank you for choosing Alice <3.")
        .setImage("https://cdn.discordapp.com/attachments/783267063421992960/953024667143274496/unknown.png")
        .setColor(CONFIG.colours.yellow)
        .setTimestamp();
    const number = Math.random();
    console.log(number);
    if (number > 0.6)
        return msg.channel.send(urgentmessage);
    const botlog: TextChannel = botlogserver.channels.cache.get(STORAGE.botlogchannel) as TextChannel;
    return botlog.send(botlogevent);
}
