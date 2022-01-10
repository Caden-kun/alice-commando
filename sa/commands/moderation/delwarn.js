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
class DelWarnCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["pardon"],
            args: [
                {
                    key: "warnuser",
                    prompt: "Who are you removing a warn from?",
                    type: "string"
                }
            ],
            description: "Removes a warn from a user.",
            group: "moderation",
            guildOnly: true,
            memberName: "delwarn",
            name: "delwarn",
            ownerOnly: false,
            throttling: {
                duration: 5,
                usages: 3
            },
            userPermissions: ["MANAGE_MESSAGES"]
        });
    }
    async run(msg, { warnuser }) {
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
        db.add(`${member.id}_${msg.guild.id}_warns`, -1);
        let warncount = db.get(`${member.id}_${msg.guild.id}_warns`);
        if (warncount === null)
            warncount = "0";
        if (warncount === "0")
            return msg.reply(`${member.user.tag} has no warnings!`);
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`${member.user.tag} has had a warning removed!`)
            .setDescription(`Moderator: ${msg.author.tag} - ${msg.author.toString()}\nWarns: **${warncount}** warnings`)
            .setColor(globals_1.CONFIG.colours.green)
            .setTimestamp();
        const channels = globals_1.STORAGE.warnlogs;
        channels.forEach((ch) => {
            const channel = msg.guild?.channels.cache.get(ch.channelID);
            if (channel === undefined)
                return;
            return channel.send(embed);
        });
        return msg.reply(`**${member.user.tag}**'s warning was deleted. Total Warnings: ${warncount}`);
    }
}
exports.default = DelWarnCommand;
