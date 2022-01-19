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
class GuildleaveCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["gl", "leaveguild"],
            description: "I say hi back :D",
            group: "utility",
            guildOnly: true,
            memberName: "guildleave",
            name: "guilddleave",
            ownerOnly: true,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]
        });
    }
    async run(msg) {
        if (msg.channel.type !== "text")
            return msg.reply("Please use this command in a server!");
        if (msg.guild === null)
            return msg.reply("This command can only be used in guilds!");
        msg.client.emit("guildDelete", msg.guild);
        return msg.reply("Just emmited a guild delete event!");
    }
}
exports.default = GuildleaveCommand;
