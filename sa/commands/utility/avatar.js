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
const discord_js_1 = require("discord.js");
const getMember_1 = require("../../utils/getMember");
// Creates a new class (being the command) extending off of the commando client
class AvatarCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["av", "pfp"],
            args: [
                {
                    default: "",
                    key: "userID",
                    prompt: "Please ping or provide an ID of the user!",
                    type: "string"
                }
            ],
            clientPermissions: ["EMBED_LINKS"],
            description: "Displays the avatar of a user in an embed.",
            group: "utility",
            guildOnly: true,
            memberName: "avatar",
            name: "avatar",
            throttling: {
                duration: 5,
                usages: 2
            }
        });
    }
    async run(msg, { userID }) {
        if (msg.guild === null)
            return msg.reply("This command can only be used in guilds!");
        let member = await getMember_1.getMember(userID, msg.guild);
        // eslint-disable-next-line prefer-destructuring
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (member === undefined) {
            // eslint-disable-next-line prefer-destructuring
            member = msg.member;
        }
        if (member === null)
            // eslint-disable-next-line prefer-destructuring
            member = msg.member;
        if (member === null)
            return msg.reply("there was a problem?");
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`${member.user.tag}'s Avatar:`)
            .setColor(globals_1.CONFIG.colours.yellow)
            .setImage(`${member.user.displayAvatarURL({ dynamic: true, size: 4096 })}`);
        void msg.channel.send(embed);
        const log = new discord_js_1.MessageEmbed()
            .setTitle("Command used: Avatar")
            .setDescription(`User: ${msg.author} - ${msg.author.tag}\nServer ID: ${msg.guild.id}\nServer Name: ${msg.guild.name}`)
            .setColor(globals_1.CONFIG.colours.yellow)
            .setTimestamp();
        const botlogserver = await msg.client.guilds.fetch(globals_1.STORAGE.botlogserver);
        const cuddlelog = botlogserver.channels.cache.get(globals_1.STORAGE.botlogchannel);
        return cuddlelog.send(log);
    }
}
exports.default = AvatarCommand;
