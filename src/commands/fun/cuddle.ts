import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../globals";
import { Guild, Message, MessageEmbed, TextChannel } from "discord.js";
import { getMember } from "../../utils";

export default class CuddleCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "cuddleuser",

                    prompt: "Cuddling alone? I'm not allowing it! Who are you cuddling with? Please mention a user.",

                    type: "string"
                }
            ],

            clientPermissions: ["SEND_MESSAGES"],

            description: "Cuddles a user with a GIF.",

            group: "fun",

            guildOnly: true,

            memberName: "cuddle",

            name: "cuddle",

            throttling: {
                duration: 5,
                usages: 1
            }

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { cuddleuser }: { cuddleuser: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.reply("This command can only be used in guilds!");

        const member = await getMember(cuddleuser, msg.guild);

        if (member === null)
            return msg.reply("mention a user!");

        const cuddle = [
            "https://cdn.discordapp.com/attachments/857397061544181810/857397110483714088/cuddle1.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397119253872685/cuddle2.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397127671054356/cuddle3.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397135163260928/cuddle4.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397140942356490/cuddle5.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397148533915649/cuddle6.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397157485084682/cuddle7.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397166333886474/cuddle8.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397173393948672/cuddle9.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397171460898826/cuddle10.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397177494929448/cuddle11.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397192289419274/cuddle12.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397187713695784/cuddle13.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397191075954698/cuddle14.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397206796730408/cuddle15.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397205874900992/cuddle16.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397208524652544/cuddle17.gif"

        ];

        const cuddlereply = [
            "Awww!",
            ":pleading_face:",
            "So cute!",
            "Don't squeeze too hard!"


        ];
        const embed = new MessageEmbed()
            .setColor("#EFFF00")
            .setImage(cuddle[Math.floor(Math.random() * cuddle.length)])
            .setDescription(`${msg.author.toString()} is cuddling ${member.toString()}! ${cuddlereply[Math.floor(Math.random() * cuddlereply.length)]}`);
        const cuddlelogs = new MessageEmbed()
            .setTitle("Command used: Cuddle")
            .setDescription(`User: ${msg.author} - ${msg.author.tag}\nServer ID: ${msg.guild.id}\nServer Name: ${msg.guild.name}`)
            .setColor(CONFIG.colours.yellow)
            .setTimestamp();
        const botlogserver: Guild = await msg.client.guilds.fetch(STORAGE.botlogserver);

        const cuddlelog: TextChannel = botlogserver.channels.cache.get(STORAGE.botlogchannel) as TextChannel;
        void msg.channel.send(embed);
        return cuddlelog.send(cuddlelogs);

    }

}