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
class SetupdateCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["update"],
            args: [
                {
                    key: "updatemessage",
                    prompt: "What do you wanna add to the update text?",
                    type: "string",
                    wait: 90
                }
            ],
            description: "devs can set bot latest updates for botinfo",
            group: "group1",
            guildOnly: true,
            memberName: "setupdate",
            name: "setupdate",
            ownerOnly: true,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]
        });
    }
    async run(msg, { updatemessage }) {
        globals_1.STORAGE.botupdates = updatemessage;
        storage_1.default.saveConfig();
        return msg.channel.send("I have updated the bot updates embed!:"
            + ` **${globals_1.STORAGE.botupdates}**`);
    }
}
exports.default = SetupdateCommand;
