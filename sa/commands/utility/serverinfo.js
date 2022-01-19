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
/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const commando = __importStar(require("discord.js-commando"));
const globals_1 = require("../../utils/globals");
const discord_js_1 = require("discord.js");
const moment_1 = __importDefault(require("moment"));
const filterLevels = {
    DISABLED: "Off",
    ALL_MEMBERS: "Everyone",
    MEMBERS_WITHOUT_ROLES: "No Role"
};
const verificationLevels = {
    NONE: "None",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "(╯°□°）╯︵ ┻━┻",
    VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
};
class ServerinfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["server"],
            description: "Gets info about the server.",
            group: "utility",
            memberName: "serverinfo",
            name: "serverinfo",
            ownerOnly: false,
            throttling: {
                duration: 5,
                usages: 3
            }
        });
    }
    async run(msg) {
        if (msg.guild === null)
            return msg.reply("This command can only be used in guilds!");
        const roles = msg.guild.roles.cache.sort((a, b) => b.position - a.position).map((role) => role.toString());
        const members = msg.guild.members.cache;
        const channels = msg.guild.channels.cache;
        const emojis = msg.guild.emojis.cache;
        let guildicon = msg.guild.iconURL({ dynamic: true });
        if (guildicon === null) {
            guildicon = globals_1.discordLogo;
        }
        const embed = new discord_js_1.MessageEmbed()
            .setDescription("**Server Info**")
            .setColor(globals_1.CONFIG.colours.yellow)
            .setThumbnail(guildicon)
            .addField("General", [
            `**Name:** ${msg.guild.name}`,
            `**ID:** ${msg.guild.id}`,
            `**Owner:** ${msg.guild.owner?.user.tag} (${msg.guild.ownerID})`,
            `**Region:** ${msg.guild.region}`,
            `**Boost Tier:** ${msg.guild.premiumTier ? `Tier ${msg.guild.premiumTier}` : "None"}`,
            `**Explicit Filter:** ${filterLevels[msg.guild.explicitContentFilter]}`,
            `**Verification Level:** ${verificationLevels[msg.guild.verificationLevel]}`,
            `**Time Created:** ${moment_1.default(msg.guild.createdTimestamp).format("LT")} ${moment_1.default(msg.guild.createdTimestamp).format("LL")} [${moment_1.default(msg.guild.createdTimestamp).fromNow()}]`,
            "\u200b"
        ])
            .addField("Statistics", [
            `**Role Count:** ${roles.length}`,
            `**Emoji Count:** ${emojis.size}`,
            `**Regular Emoji Count:** ${emojis.filter((emoji) => !emoji.animated).size}`,
            `**Animated Emoji Count:** ${emojis.filter((emoji) => emoji.animated).size}`,
            `**Member Count:** ${msg.guild.memberCount}`,
            `**Humans:** ${members.filter((member) => !member.user.bot).size}`,
            `**Bots:** ${members.filter((member) => member.user.bot).size}`,
            `**Text Channels:** ${channels.filter((channel) => channel.type === "text").size}`,
            `**Voice Channels:** ${channels.filter((channel) => channel.type === "voice").size}`,
            `**Boost Count:** ${msg.guild.premiumSubscriptionCount !== null || "0"}`,
            "\u200b"
        ])
            .addField("Presence", [
            `<:AH_StatusOnline:723216269255507968> **Online:** ${members.filter((member) => member.presence.status === "online").size}`,
            `<:AH_StatusIdle:723216355137945620> **Idle:** ${members.filter((member) => member.presence.status === "idle").size}`,
            `<:AH_StatusDnd:723216144680484955> **Do Not Disturb:** ${members.filter((member) => member.presence.status === "dnd").size}`,
            `<:AH_StatusInvis:723216426537844748> **Offline:** ${members.filter((member) => member.presence.status === "offline").size}`,
            "\u200b"
        ])
            .setTimestamp();
        return msg.channel.send(embed);
    }
}
exports.default = ServerinfoCommand;
