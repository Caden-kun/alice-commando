/* eslint-disable sort-keys */
import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../globals";
import { Guild, Message, MessageEmbed, TextChannel } from "discord.js";
import { col } from "../../bot";
export default class HiCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["bot"],

            description: "Info about the bot",

            group: "utility",

            guildOnly: true,


            memberName: "botinfo",

            name: "botinfo",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage
    ): Promise<Message | Message[]> {
        const guilds = msg.client.guilds.cache.size;
        const channels = msg.client.channels.cache.size;
        const users = msg.client.users.cache.size;
        const ownerid = CONFIG.owner;
        const owner = await msg.client.users.fetch(ownerid);
        const devid = CONFIG.dev;
        const dev = await msg.client.users.fetch(devid);

        let size = 0;
        col.commands.each(() => {
            size ++;
        });
        const embed = new MessageEmbed()
            .setColor(CONFIG.colours.yellow)
            .setTitle("Alice - Bot Info")
            .setDescription(`Alice Zuberg is owned and created by ${owner} **${owner.tag}**`)
            .addFields(
                { name: "Developers:", value: `**${owner} - ${owner.tag}** (Main Developer)\n**${dev} - ${dev.tag}** (Co-Developer)` },
                { name: "\u200B", value: "\u200B" },
                { name: "Total Servers:", value: `**${guilds}** servers`, inline: true },
                { name: "Total Channels:", value: `**${channels}** channels`, inline: true },
                { name: "\u200B", value: "\u200B", inline: true },
                { name: "Total Users:", value: `**${users}** total users`, inline: true },
                { name: "Total Commands:", value: `**${size}** commands`, inline: true },
                { name: "\u200B", value: "\u200B", inline: true },
                { name: "Latest Update:", value: `${STORAGE.botupdates}`, inline: false },
                { name: "Bot Invite Link:", value: "[Click here](https://discord.com/api/oauth2/authorize?client_id=720809995628707902&permissions=8&scope=bot)", inline: true },
                { name: "Need help?", value: "[Join the Bot Support Server!](https://discord.gg/DsTsNCvumJ)", inline: true },
                { name: "\u200B", value: "\u200B", inline: true }
            )
            .setFooter("I miss Eugeo :(");
        if (msg.guild === null) return msg.reply("there was an error?");
        const botinfo = new MessageEmbed()
            .setTitle("Command used: botinfo")
            .setDescription(`User: ${msg.author} - ${msg.author.tag}\nServer ID: ${msg.guild.id}\nServer Name: ${msg.guild.name}`)
            .setColor(CONFIG.colours.yellow)
            .setTimestamp();
        const botlogserver: Guild = await msg.client.guilds.fetch(STORAGE.botlogserver);

        const botinfolog: TextChannel = botlogserver.channels.cache.get(STORAGE.botlogchannel) as TextChannel;
        void msg.channel.send(embed);
        return botinfolog.send(botinfo);
    }
}