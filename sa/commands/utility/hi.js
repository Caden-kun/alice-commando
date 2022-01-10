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
class HiCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["h"],
            description: "I say hi back :D",
            group: "utility",
            guildOnly: false,
            memberName: "hi",
            name: "hi",
            ownerOnly: false,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]
        });
    }
    async run(msg) {
        return msg.reply("Hi!");
    }
}
exports.default = HiCommand;
