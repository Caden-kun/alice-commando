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
class UptimeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["u"],
            description: "Shows how long the bot was online for.",
            group: "utility",
            guildOnly: false,
            memberName: "uptime",
            name: "uptime",
            ownerOnly: false,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]
        });
    }
    async run(msg) {
        if (msg.client.uptime === null)
            return msg.reply("Uptime Error!");
        let seconds = Math.floor(msg.client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        return msg.channel.send(`Bot Uptime: **${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds.`);
    }
}
exports.default = UptimeCommand;
