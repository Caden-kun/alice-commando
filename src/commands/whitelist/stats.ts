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

        const cuddlestats = db.get("cuddle");
        const hugstats = db.get("hug");
        const patstats = db.get("pat");
        const qotdstats = db.get("qotd");
        const redditstats = db.get("reddit");
        const slapstats = db.get("slap");
        const smilestats = db.get("smile");

        const modlogstats = db.get("setmodlogs");


        switch (cmdgroup.toLowerCase()) {
            case "fun":
                // eslint-disable-next-line no-case-declarations
                let statcmd = "null";
                statcmd = `Cuddle Command Usage: ${cuddlestats}\nHug Command Usage: ${hugstats}\n
                Headpat Command Usage: ${patstats}\nQOTD Command Usage: ${qotdstats}\n
                Reddit Command Usage: ${redditstats}\nSlap Command Usage: ${slapstats}\n
                Smile Command Usage: ${smilestats}\n`;
                // eslint-disable-next-line no-case-declarations
                const embed = new MessageEmbed()
                    .setTitle(`Command Stats: ${cmdgroup}`)
                    .setDescription(statcmd)
                    .setFooter(msg.author.tag)
                    .setTimestamp();
                return msg.channel.send(embed);
            case "moderation":
                // eslint-disable-next-line no-case-declarations
                let modstatcmd = "null";
                modstatcmd = `Setmodlogs Command Usage: ${modlogstats}`;
                // eslint-disable-next-line no-case-declarations
                const modembed = new MessageEmbed()
                    .setTitle(`Command Stats: ${cmdgroup}`)
                    .setColor(CONFIG.colours.yellow)
                    .setDescription(modstatcmd)
                    .setFooter(msg.author.tag)
                    .setTimestamp();
                return msg.channel.send(modembed);

            default:
                void msg.client.user?.setStatus("dnd");
                return msg.channel.send("Status set to dnd");
        }
    }
}