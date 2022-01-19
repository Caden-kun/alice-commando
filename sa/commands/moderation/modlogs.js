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
const globals_1 = require("../../utils/globals");
const storage_1 = __importDefault(require("../../utils/storage"));
const getChannel_1 = require("../../utils/getChannel");
class ModlogsetCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["setlogs", ""],
            args: [
                {
                    key: "modlogs",
                    prompt: "Which channel do you want to recieve modlogs for? please provide a channel ID or mention a channel.",
                    type: "string"
                }
            ],
            description: "Server Admins can set modlog channels to recieve deleted message logs.",
            group: "moderation",
            guildOnly: true,
            memberName: "setlogs",
            name: "setlogs",
            ownerOnly: false,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]
        });
    }
    async run(msg, { modlogs }) {
        if (msg.guild === null)
            return msg.say("There was an error?");
        const channel = getChannel_1.getChannel(modlogs, msg.guild);
        if (channel === undefined)
            return msg.say("Please give me a **valid** channel");
        const modGuild = globals_1.STORAGE.modlogs.find((c) => c.serverID === msg.guild?.id);
        if (modGuild !== undefined)
            return msg.reply("You already have modlog channel set in the server!");
        globals_1.STORAGE.modlogs.push({ channelID: channel.id, serverID: msg.guild.id });
        storage_1.default.saveConfig();
        return msg.say(`${channel} has been set! if this` +
            " appears as an invalid channel, please check if the channel ID is correct.");
    }
}
exports.default = ModlogsetCommand;
