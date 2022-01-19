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
class ModlogremoveCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["delmodlog"],
            args: [
                {
                    key: "delmodlogs",
                    prompt: "Please mention the channel you are removing logs from!",
                    type: "string"
                }
            ],
            description: "Server Admins can remove channels from getting mod logs.",
            group: "moderation",
            guildOnly: true,
            memberName: "removelogs",
            name: "removelogs",
            ownerOnly: false,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]
        });
    }
    async run(msg, { delmodlogs }) {
        if (msg.guild === null)
            return msg.say("There was an error?");
        const channel = getChannel_1.getChannel(delmodlogs, msg.guild);
        if (channel === undefined)
            return msg.say("Please give me a **valid** channel");
        const chmodlog = globals_1.STORAGE.modlogs.findIndex((a) => a.serverID === msg.guild?.id);
        if (chmodlog === -1) {
            return msg.reply("This server does not have a modlog channel set!");
        }
        globals_1.STORAGE.modlogs.splice(chmodlog, 1);
        console.log(globals_1.STORAGE.modlogs);
        storage_1.default.saveConfig();
        return msg.say(`${channel} has been removed from logs!`);
    }
}
exports.default = ModlogremoveCommand;
