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
const random_question_1 = require("random-question");
class TopicCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["t", "subject"],
            clientPermissions: ["SEND_MESSAGES"],
            description: "sends a random topic to the channel.",
            group: "fun",
            guildOnly: true,
            memberName: "topic",
            name: "topic",
            throttling: {
                duration: 5,
                usages: 1
            }
        });
    }
    async run(msg) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return msg.say(random_question_1.randomQuestion());
    }
}
exports.default = TopicCommand;
