/* eslint-disable @typescript-eslint/no-unused-vars */
import * as commando from "discord.js-commando";
import * as db from "quick.db";

import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../utils/globals";
export default class StatsCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["cmdstats", "commandstats"],

            args: [
                {
                    default: "fun",

                    key: "cmdgroup",

                    prompt: "Which command group are you getting command stats from?",

                    type: "string"
                }
            ],

            description: "Checks how many times a group of commands was used.",

            group: "group1",

            guildOnly: true,

            memberName: "stats",

            name: "stats",

            ownerOnly: true,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { cmdgroup }: { cmdgroup: string; }
    ): Promise<Message | Message[]> {
        // Fun commands
        const cuddlestats = db.get("cuddle");
        const gifstats = db.get("gif");
        const hugstats = db.get("hug");
        const kissstats = db.get("kiss");
        const memestats = db.get("meme");
        const patstats = db.get("pat");
        const redditstats = db.get("reddit");
        const slapstats = db.get("slap");
        const smilestats = db.get("smile");
        const topicstats = db.get("topic");
        // Moderation
        const addrolelogs = db.get("addrole");
        const removerolelogs = db.get("removerole");
        const deletewarnlogs = db.get("delwarn");
        const initlogs = db.get("init");
        const unbanlogs = db.get("unban");
        const warnlogs = db.get("warn");
        const warningslogs = db.get("warnings");
        // Logs
        const delmodlogs = db.get("removelogs");
        const modlogstats = db.get("setmodlogs");
        //  Utility
        const avatarstats = db.get("avatar");
        const botinfostats = db.get("botinfo");
        const embedstats = db.get("embed");
        const histats = db.get("hi");
        const imgstats = db.get("image");
        const invstats = db.get("invite");
        const joinstats = db.get("joindates");
        const serverinfstats = db.get("serverinfo");
        const uptimestats = db.get("uptime");
        const whoisstats = db.get("whois");

        switch (cmdgroup.toLowerCase()) {
            case "fun":
                // eslint-disable-next-line no-case-declarations
                let statcmd = "null";
                statcmd = `Cuddle Command Usage: ${cuddlestats}\nHug Command Usage: ${hugstats}
                Headpat Command Usage: ${patstats}\nReddit Command Usage: ${redditstats}\nSlap Command Usage: ${slapstats}\n
                Smile Command Usage: ${smilestats}\n`;
                // eslint-disable-next-line no-case-declarations
                const embed = new MessageEmbed()
                    .setTitle(`Command Stats: ${cmdgroup}`)
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
                    .setColor(CONFIG.colours.yellow)
                    .setDescription(statcmd)
                    .setFooter(msg.author.tag)
                    .setTimestamp();
                return msg.channel.send(embed);
            case "logs":
                // eslint-disable-next-line no-case-declarations
                let logstatcmd = "null";
                logstatcmd = `Setmodlogs Command Usage: ${modlogstats}\n Removemodlogs Command Usage: ${delmodlogs}`;
                // eslint-disable-next-line no-case-declarations
                const logembed = new MessageEmbed()
                    .setTitle(`Command Stats: ${cmdgroup}`)
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
                    .setColor(CONFIG.colours.yellow)
                    .setDescription(logstatcmd)
                    .setFooter(msg.author.tag)
                    .setTimestamp();
                return msg.channel.send(logembed);
            case "moderation":
                // eslint-disable-next-line no-case-declarations
                let modstatcmd = "null";
                modstatcmd = `Addrole Command Usage: ${addrolelogs}\n Removemodlogs Command Usage: ${delmodlogs}\n`;
                // eslint-disable-next-line no-case-declarations
                const modembed = new MessageEmbed()
                    .setTitle(`Command Stats: ${cmdgroup}`)
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
                    .setColor(CONFIG.colours.yellow)
                    .setDescription(modstatcmd)
                    .setFooter(msg.author.tag)
                    .setTimestamp();
                return msg.channel.send(modembed);
            case "utility":
                // eslint-disable-next-line no-case-declarations
                let utilstatcmds = "null";
                utilstatcmds = `Avatar Command Usage: ${avatarstats}\nBotinfo Command Usage: ${botinfostats}\n
                Embed Command Usage: ${embedstats}\nHi Command Usage: ${histats}\n
                Invite Command Usage: ${invstats}\nJoindates Command Usage: ${joinstats}\n
                Server Info Command Usage: ${serverinfstats}\nUptime Command Usage: ${uptimestats}\nWhois Command Usage: ${whoisstats}\n`;
                // eslint-disable-next-line no-case-declarations
                const utilstatcmd = new MessageEmbed()
                    .setTitle(`Command Stats: ${cmdgroup}`)
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
                    .setColor(CONFIG.colours.yellow)
                    .setDescription(utilstatcmds)
                    .setFooter(msg.author.tag)
                    .setTimestamp();
                return msg.channel.send(utilstatcmd);
            default:
                return msg.channel.send("Please select a group!");
        }
    }
}