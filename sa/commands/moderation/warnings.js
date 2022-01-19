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
const db = __importStar(require("quick.db"));
const getMember_1 = require("../../utils/getMember");
class WarnCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["warnhistory"],
            args: [
                {
                    default: "",
                    key: "warningsuser",
                    prompt: "who are you fetching warn logs for?",
                    type: "string"
                }
            ],
            description: "Shows the number of warns a user has.",
            group: "moderation",
            guildOnly: true,
            memberName: "warnings",
            name: "warnings",
            ownerOnly: false,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_MESSAGES"]
        });
    }
    async run(msg, { warningsuser }) {
        if (msg.guild === null)
            return msg.say("There was an error?");
        void msg.delete();
        const member = await getMember_1.getMember(warningsuser, msg.guild);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (member === null) {
            return msg.reply("mention a user!");
        }
        db.get(`${member.id}_${msg.guild.id}_warns`);
        let warncount = db.get(`${member.id}_warns`);
        if (warncount === null)
            warncount = "0";
        return msg.reply(`**${member.user.tag}** has **${warncount}** warnings!`);
    }
}
exports.default = WarnCommand;
