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
class WarnLogSetCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["logwarns", "logwarn"],
            args: [
                {
                    key: "warnlogs",
                    prompt: "Which channel do you want to set warn logs for?",
                    type: "string"
                }
            ],
            description: "Server Admins can set a warnings channel.",
            group: "logging",
            guildOnly: true,
            memberName: "setwarnlogs",
            name: "setwarnlogs",
            ownerOnly: false,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]
        });
    }
    async run(msg, { warnlogs }) {
        if (msg.guild === null)
            return msg.say("There was an error?");
        const channel = getChannel_1.getChannel(warnlogs, msg.guild);
        if (channel === undefined)
            return msg.say("Please give me a **valid** channel");
        const warnGuild = globals_1.STORAGE.warnlogs.find((c) => c.serverID === msg.guild?.id);
        if (warnGuild !== undefined)
            return msg.reply("You already have modlog channel set in the server!");
        globals_1.STORAGE.warnlogs.push({ channelID: channel.id, serverID: msg.guild.id });
        storage_1.default.saveConfig();
        return msg.say(`${channel} has been set to recieve warn logs!`);
    }
}
exports.default = WarnLogSetCommand;
