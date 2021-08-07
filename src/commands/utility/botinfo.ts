/* eslint-disable sort-keys */
import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Message, MessageEmbed } from "discord.js";
export default class BotinfoCommand extends commando.Command {
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
        if (msg.client.uptime === null) return msg.reply("Uptime Error!");
        let seconds = Math.floor(msg.client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        const embed = new MessageEmbed()
            .setColor(CONFIG.colours.yellow)
            .setTitle("Alice - Bot Info")
            .setDescription(`Alice Zuberg is owned and created by ${owner} **${owner.tag}**`)
            .setImage("https://top.gg/api/widget/720809995628707902.png")
            .addFields(
                { name: "Developers:", value: `**${owner} - ${owner.tag}** (Main Developer)\n**${dev} - ${dev.tag}** (Co-Developer)` },
                { name: "\u200B", value: "\u200B" },
                { name: "Total Servers:", value: `**${guilds}** servers`, inline: true },
                { name: "Total Channels:", value: `**${channels}** channels`, inline: true },
                { name: "Uptime:", value: `**${days}** days, **${hours}** hours, **${minutes}** minutes.`, inline: true },
                { name: "Total Users:", value: `**${users}** total users`, inline: true },
                { name: "Total Commands:", value: `**${this.client.registry.commands.size}** commands`, inline: true },
                { name: "Coding Language:", value: "**TypeScript**", inline: true },
                { name: "Latest Update:", value: `${STORAGE.botupdates}`, inline: false },
                { name: "Bot Invite Link:", value: "[Click here](https://discord.com/api/oauth2/authorize?client_id=720809995628707902&permissions=8&scope=bot)", inline: true },
                { name: "Need help?", value: "[Join the Bot Support Server!](https://discord.gg/DsTsNCvumJ)", inline: true },
                { name: "Bot Source Code:", value: "[Go to Github!](https://github.com/Caden-kun/alice-commando)", inline: true },
                { name: "Trello:", value: "[Click here](https://trello.com/b/ZrkXBDGo/alice-zuberg)", inline: true }
            )
            .setFooter("I miss Eugeo :(");
        return msg.channel.send(embed);
    }
}