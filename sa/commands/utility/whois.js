"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commando = __importStar(require("discord.js-commando"));
const db = __importStar(require("quick.db"));
const discord_js_1 = require("discord.js");
const getMember_1 = require("../../utils/getMember");
const moment_1 = __importDefault(require("moment"));
const status = {
    dnd: "<:AH_StatusDnd:723216144680484955> Do Not Disturb",
    idle: "<:AH_StatusIdle:723216355137945620> Idle",
    invisible: "<:AH_StatusOffline:849807927052206080> Offline",
    offline: "<:AH_StatusOffline:849807927052206080> Offline",
    online: "<:AH_StatusOnline:723216269255507968> Online"
};
class WhoisCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["userinfo", "user"],
            args: [
                {
                    default: "",
                    key: "whouser",
                    prompt: "Who do you want to get info about? Please ping or provide an ID!",
                    type: "string"
                }
            ],
            description: "Gets information about a user in the server.",
            group: "utility",
            guildOnly: true,
            memberName: "whois",
            name: "whois",
            ownerOnly: false,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]
        });
    }
    async run(msg, { whouser }) {
        if (msg.guild === null)
            return msg.reply("This command can only be used in guilds!");
        let member = await getMember_1.getMember(whouser, msg.guild);
        // eslint-disable-next-line prefer-destructuring
        if (member === null)
            member = msg.member;
        if (member === null)
            return msg.reply("There was a problem! Please contact the devs!");
        let presenceString;
        switch (member.presence.status) {
            case "online":
                presenceString = status.online;
                break;
            case "offline":
                presenceString = status.offline;
                break;
            case "idle":
                presenceString = status.idle;
                break;
            case "dnd":
                presenceString = status.dnd;
                break;
            case "invisible":
                presenceString = status.invisible;
                break;
        }
        const permsArray = member.permissions.toArray();
        let perms = `${permsArray
            .map((p) => `${p
            .charAt(0)
            .toUpperCase()}${p.toLowerCase()
            .slice(1)
            .replace(/_/g, " ")}`)}`
            .replace(/,/g, ", ");
        if (perms === "") {
            perms = "No Perms";
        }
        let warncounts = db.get(`${member.id}_${msg.guild.id}_warns`);
        if (warncounts === null)
            warncounts = "0";
        const joinDiscord = moment_1.default(member.user.createdAt).format("llll");
        const joinServer = moment_1.default(member.joinedAt).format("llll");
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${member.user}`)
            .setColor(member.displayColor)
            .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
            .addField("Joined at:", `${joinServer}`, true)
            .addField("Current Warns Count:", `${warncounts} Warnings`)
            .addField("Account Created:", `${joinDiscord}`, false)
            .addField("Status:", presenceString, true)
            .addField("Permissions:", perms)
            .setFooter(`ID: ${member.id}`)
            .setTimestamp();
        return msg.channel.send(embed);
    }
}
exports.default = WhoisCommand;
