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
const discord_js_1 = require("discord.js");
const globals_1 = require("../../utils/globals");
class InvCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["inv"],
            description: "Gives you a link to invite Alice",
            group: "utility",
            guildOnly: false,
            memberName: "invite",
            name: "invite",
            ownerOnly: false,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]
        });
    }
    async run(msg) {
        const embed = new discord_js_1.MessageEmbed()
            .setColor(globals_1.CONFIG.colours.yellow)
            .setTitle("Alice - Invite Me!")
            .setDescription("Interested in inviting Alice to a Server you own?")
            .addField("Invite link:", "[Click here!](https://discord.com/api/oauth2/authorize?client_id=720809995628707902&permissions=8&scope=bot)", false)
            .addField("Got any questions, or queries?", "[Join the Bot Support Server!](https://discord.gg/DsTsNCvumJ)")
            .setFooter("I miss Eugeo :(");
        return msg.channel.send(embed);
    }
}
exports.default = InvCommand;
