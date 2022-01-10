"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable sort-keys */
const commando = __importStar(require("discord.js-commando"));
const globals_1 = require("../../utils/globals");
const discord_js_1 = require("discord.js");
class BotinfoCommand extends commando.Command {
    constructor(client) {
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
    async run(msg) {
        const guilds = msg.client.guilds.cache.size;
        const channels = msg.client.channels.cache.size;
        const users = msg.client.users.cache.size;
        const ownerid = globals_1.CONFIG.owner;
        const owner = await msg.client.users.fetch(ownerid);
        const devid = globals_1.CONFIG.dev;
        const dev = await msg.client.users.fetch(devid);
        if (msg.client.uptime === null)
            return msg.reply("Uptime Error!");
        let seconds = Math.floor(msg.client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        const embed = new discord_js_1.MessageEmbed()
            .setColor(globals_1.CONFIG.colours.yellow)
            .setTitle("Alice - Bot Info")
            .setDescription(`Alice Zuberg is owned and created by ${owner} **${owner.tag}**`)
            .addFields({ name: "Developers:", value: `**${owner} - ${owner.tag}** (Main Developer)\n**${dev} - ${dev.tag}** (Co-Developer)` }, { name: "\u200B", value: "\u200B" }, { name: "Total Servers:", value: `**${guilds}** servers`, inline: true }, { name: "Total Channels:", value: `**${channels}** channels`, inline: true }, { name: "Uptime:", value: `**${days}** days, **${hours}** hours, **${minutes}** minutes.`, inline: true }, { name: "Total Users:", value: `**${users}** total users`, inline: true }, { name: "Total Commands:", value: `**${this.client.registry.commands.size}** commands`, inline: true }, { name: "\u200B", value: "\u200B", inline: true }, { name: "Latest Update:", value: `${globals_1.STORAGE.botupdates}`, inline: false }, { name: "Bot Invite Link:", value: "[Click here](https://discord.com/api/oauth2/authorize?client_id=720809995628707902&permissions=8&scope=bot)", inline: true }, { name: "Need help?", value: "[Join the Bot Support Server!](https://discord.gg/DsTsNCvumJ)", inline: true }, { name: "Bot Source Code:", value: "[Go to Github!](https://github.com/Caden-kun/alice-commando)", inline: true })
            .setFooter("I miss Eugeo :(");
        return msg.channel.send(embed);
    }
}
exports.default = BotinfoCommand;
