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
class QotdsetCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["s"],
            args: [
                {
                    key: "qotdchannel",
                    prompt: "which channel would you like to set for the QOTD? Please provide a channel ID.",
                    type: "string"
                }
            ],
            description: "Server Admins can set the QOTD channel for the bot.",
            group: "group1",
            guildOnly: true,
            memberName: "setqotd",
            name: "setqotd",
            ownerOnly: true,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]
        });
    }
    async run(msg, { qotdchannel }) {
        globals_1.STORAGE.qotdchannel = qotdchannel;
        if (msg.guild === null)
            return msg.say("There was an error?");
        globals_1.STORAGE.qotdserver = msg.guild.id;
        // eslint-disable-next-line prefer-destructuring
        storage_1.default.saveConfig();
        return msg.say(`<#${globals_1.STORAGE.qotdchannel}> has been set! if this` +
            " appears as an invalid channel, please check if the channel ID is correct.");
    }
}
exports.default = QotdsetCommand;
