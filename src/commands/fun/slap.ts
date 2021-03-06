import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../utils/globals";
import { getMember } from "../../utils/getMember";

export default class SlapCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "slapuser",

                    prompt: "Who deserves this painful slap from you? (mention a user)",

                    type: "string"
                },
                {
                    default: "",

                    key: "addtext",

                    prompt: "Anything you want to add?",

                    type: "string"
                }
            ],

            clientPermissions: ["SEND_MESSAGES"],

            description: "Slaps a user with a GIF.",

            group: "fun",

            guildOnly: true,

            memberName: "slap",

            name: "slap",

            throttling: {
                duration: 5,
                usages: 2
            }

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { slapuser, addtext }: { addtext: string; slapuser: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.reply("there was an internal error!\nError 101 - message_guild_null\nPlease contact the devs with the error code if you think that there is a problem.");

        const member = await getMember(slapuser, msg.guild);

        if (member === null)
            return msg.reply("there was an internal error!\nError 103 - member_not_found\nPlease contact the devs with the error code if you think that there is a problem.");

        const slap = [
            "https://cdn.discordapp.com/attachments/857396906921295932/863532362536189952/slap1.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532372405780490/slap2.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532378412679188/slap3.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532398570242108/slap4.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532422258491412/slap5.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532424948482098/slap6.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532437073821722/slap7.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532442961575946/slap8.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532448835174410/slap9.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532463229108244/slap10.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532468408418324/slap11.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532478858133524/slap12.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532491344314378/slap13.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532493268713482/slap14.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532502711140362/slap15.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532506955120681/slap16.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532516996415488/slap17.gif",
            "https://cdn.discordapp.com/attachments/857396906921295932/863532518158106674/slap18.gif"

        ];
        const slapreply = [
            "OUCH!",
            "That hurt :cry:",
            "That was mean :(("


        ];
        db.add(`${msg.author.id}_slaps${member.id}`, 1);

        const commandused = db.get(`${msg.author.id}_slaps${member.id}`);

        let desc = `${msg.author.toString()} gave ${member.toString()} a slap! ${slapreply[Math.floor(Math.random() * slapreply.length)]}`;

        if (msg.author.id === member.id) desc = "I mean, if you insist, then take this slap from me :((";
        const embed = new MessageEmbed()
            .setColor(CONFIG.colours.yellow)
            .setImage(slap[Math.floor(Math.random() * slap.length)])
            .setDescription(desc)
            .setFooter(`${addtext} ??? That's ${commandused} slaps now! :(`)
            .setTimestamp();
        return msg.channel.send(embed);


    }
}