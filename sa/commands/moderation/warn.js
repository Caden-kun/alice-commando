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
const globals_1 = require("../../utils/globals");
const discord_js_1 = require("discord.js");
const getMember_1 = require("../../utils/getMember");
class WarnCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["strike"],
            args: [
                {
                    key: "warnuser",
                    prompt: "Who are you warning?",
                    type: "string"
                },
                {
                    key: "warnreason",
                    prompt: "Please type a reason!",
                    type: "string"
                }
            ],
            description: "Warns a user and DM's them.",
            group: "moderation",
            guildOnly: true,
            memberName: "warn",
            name: "warn",
            ownerOnly: false,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_MESSAGES"]
        });
    }
    async run(msg, { warnuser, warnreason }) {
        if (msg.guild === null)
            return msg.say("There was an error?");
        void msg.delete();
        const member = await getMember_1.getMember(warnuser, msg.guild);
        // eslint-disable-next-line prefer-destructuring
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (member === undefined) {
            return msg.reply("Please mention a valid user to warn!");
        }
        if (member === null) {
            return msg.reply("Mention a user!");
        }
        if (member.id === msg.author.id) {
            return msg.reply("You can't warn yourself!");
        }
        db.add(`${member.id}_${msg.guild.id}_warns`, 1);
        const warncount = db.get(`${member.id}_${msg.guild.id}_warns`);
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`${member.user.tag} has been warned!`)
            .setDescription(`Reason: **${warnreason}**\nModerator:${msg.author.tag} - ${msg.author.toString()}\nWarns: **${warncount}** warnings`)
            .setColor(globals_1.CONFIG.colours.red)
            .setFooter("Someone has been naughty!")
            .setTimestamp();
        const dmembed = new discord_js_1.MessageEmbed()
            .setTitle(`You have been warned in ${msg.guild.name}!`)
            .setDescription(`Reason: **${warnreason}**\nWarns: **${warncount}** warnings`)
            .setColor(globals_1.CONFIG.colours.red)
            .setFooter("Please follow the rules next time.")
            .setTimestamp();
        const channels = globals_1.STORAGE.warnlogs;
        channels.forEach((ch) => {
            const channel = msg.guild?.channels.cache.get(ch.channelID);
            if (channel === undefined)
                return;
            return channel.send(embed);
        });
        void member.send(dmembed);
        return msg.reply(`**${member.user.tag}** has been warned.`);
    }
}
exports.default = WarnCommand;
