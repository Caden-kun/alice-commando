"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commando = __importStar(require("discord.js-commando"));
const db = __importStar(require("quick.db"));
const discord_js_1 = require("discord.js");
const globals_1 = require("../../utils/globals");
class StatsCommand extends commando.Command {
    constructor(client) {
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
    async run(msg, { cmdgroup }) {
        // Fun commands
        const cuddlestats = db.get("cuddle");
        const hugstats = db.get("hug");
        const patstats = db.get("pat");
        const qotdstats = db.get("qotd");
        const redditstats = db.get("reddit");
        const slapstats = db.get("slap");
        const smilestats = db.get("smile");
        // Moderation
        const delmodlogs = db.get("removelogs");
        const modlogstats = db.get("setmodlogs");
        //  Utility
        const avatarstats = db.get("avatar");
        const botinfostats = db.get("botinfo");
        const embedstats = db.get("embed");
        const histats = db.get("hi");
        const invstats = db.get("invite");
        const joinstats = db.get("joindates");
        const serverinfstats = db.get("serverinfo");
        const setqotdstats = db.get("setqotd");
        const uptimestats = db.get("uptime");
        const whoisstats = db.get("whois");
        switch (cmdgroup.toLowerCase()) {
            case "fun":
                // eslint-disable-next-line no-case-declarations
                let statcmd = "null";
                statcmd = `Cuddle Command Usage: ${cuddlestats}\nHug Command Usage: ${hugstats}\n
                Headpat Command Usage: ${patstats}\nQOTD Command Usage: ${qotdstats}\n
                Reddit Command Usage: ${redditstats}\nSlap Command Usage: ${slapstats}\n
                Smile Command Usage: ${smilestats}\n`;
                // eslint-disable-next-line no-case-declarations
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(`Command Stats: ${cmdgroup}`)
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
                    .setColor(globals_1.CONFIG.colours.yellow)
                    .setDescription(statcmd)
                    .setFooter(msg.author.tag)
                    .setTimestamp();
                return msg.channel.send(embed);
            case "moderation":
                // eslint-disable-next-line no-case-declarations
                let modstatcmd = "null";
                modstatcmd = `Setmodlogs Command Usage: ${modlogstats}\n Removemodlogs Command Usage: ${delmodlogs}`;
                // eslint-disable-next-line no-case-declarations
                const modembed = new discord_js_1.MessageEmbed()
                    .setTitle(`Command Stats: ${cmdgroup}`)
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
                    .setColor(globals_1.CONFIG.colours.yellow)
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
                Server Info Command Usage: ${serverinfstats}\nSetQotd Command Usage: ${setqotdstats}\n
                Uptime Command Usage: ${uptimestats}\nWhois Command Usage: ${whoisstats}\n`;
                // eslint-disable-next-line no-case-declarations
                const utilstatcmd = new discord_js_1.MessageEmbed()
                    .setTitle(`Command Stats: ${cmdgroup}`)
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
                    .setColor(globals_1.CONFIG.colours.yellow)
                    .setDescription(utilstatcmds)
                    .setFooter(msg.author.tag)
                    .setTimestamp();
                return msg.channel.send(utilstatcmd);
            default:
                return msg.channel.send("Please select a group!");
        }
    }
}
exports.default = StatsCommand;
