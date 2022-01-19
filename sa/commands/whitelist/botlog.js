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
const discord_js_1 = require("discord.js");
const storage_1 = __importDefault(require("../../utils/storage"));
class BotlogCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["setbotlogs"],
            args: [
                {
                    key: "botchannel",
                    prompt: "which channel would you like to set for the botlog? Please provide a channel ID.",
                    type: "string"
                }
            ],
            description: "Devs Only command",
            group: "group1",
            guildOnly: true,
            memberName: "setcmdlog",
            name: "setcmdlog",
            ownerOnly: true,
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]
        });
    }
    async run(msg, { botchannel }) {
        globals_1.STORAGE.botlogchannel = botchannel;
        if (msg.guild === null)
            return msg.say("There was an error?");
        globals_1.STORAGE.botlogserver = msg.guild.id;
        // eslint-disable-next-line prefer-destructuring
        storage_1.default.saveConfig();
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`${msg.author.tag} has changed the command log location!`)
            .setDescription(`${msg.author} - ${msg.author.tag} has changed the command log channel to <#${globals_1.STORAGE.botlogchannel}>!\n`
            + `Channel ID: ${globals_1.STORAGE.botlogchannel}`)
            .setColor(globals_1.CONFIG.colours.yellow)
            .setTimestamp();
        const botlogserver = await msg.client.guilds.fetch(globals_1.STORAGE.botlogserver);
        const botlogs = botlogserver.channels.cache.get(globals_1.STORAGE.botlogchannel);
        void msg.say(`<#${globals_1.STORAGE.botlogchannel}> has been set! All command logs` +
            " will be logged here.");
        return botlogs.send(embed);
    }
}
exports.default = BotlogCommand;
