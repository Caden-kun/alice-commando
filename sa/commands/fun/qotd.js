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
const globals_1 = require("../../utils/globals");
const random_question_1 = require("random-question");
class QotdCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["question", "questionoftheday"],
            clientPermissions: ["SEND_MESSAGES"],
            description: "I send a random question every 1 day.",
            group: "fun",
            guildOnly: true,
            memberName: "qotd",
            name: "qotd",
            throttling: {
                duration: 5,
                usages: 1
            }
        });
    }
    async run(msg, qotdchnl) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (qotdchnl === undefined)
            return msg.reply("please set a qotd channel using the command"
                + ` ${globals_1.CONFIG.prefix}setchannel [channelID].`);
        const qotdserver = await msg.client.guilds.fetch(globals_1.STORAGE.qotdserver);
        const qotd = qotdserver.channels.cache.get(globals_1.STORAGE.qotdchannel);
        void msg.reply("Qotd message sent. If it has not been delivered, please check your channel permissions.");
        return qotd.send(`**Question Of The Day:** ${random_question_1.randomQuestion()}`);
    }
}
exports.default = QotdCommand;
