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
// Creates a new class (being the command) extending off of the commando client
class EmbedCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["e"],
            args: [
                {
                    error: "Your title must be under 256 characters! Please shorten your title!",
                    key: "title",
                    prompt: "Please add a title to the embed!",
                    type: "string",
                    validate: (value) => value.length < 256
                },
                {
                    error: "Your description must be under 4096 characters! Please shorten your description!",
                    key: "description",
                    prompt: "Nice, you added a title, now please add a description to the embed!",
                    type: "string",
                    validate: (value) => value.length < 4096,
                    wait: 90
                },
                {
                    error: "Please enter a valid HEX color code.",
                    key: "color",
                    prompt: "Cool, now you have a description and title! Please enter a hex code for the color of the embed.",
                    type: "string",
                    validate: (value) => value.length < 7
                },
                {
                    key: "image",
                    prompt: "One last thing, would you like to add an image to your embed? Type `null` if you do not want to have an image added.",
                    type: "string"
                }
            ],
            clientPermissions: ["MANAGE_MESSAGES"],
            description: "Creates an embed for the user",
            group: "utility",
            guildOnly: true,
            memberName: "embed",
            name: "embed",
            throttling: {
                duration: 5,
                usages: 3
            }
        });
    }
    // Now to run the actual command, the run() parameters need to be defiend (by types and names)
    async run(msg, { title, description, color, image }) {
        if (image === "null")
            image = "https://yourmomgay.com";
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setImage(image)
            .setColor(color)
            .setFooter(`${msg.guild?.name} • ${msg.author.tag}`);
        return msg.channel.send(embed);
    }
}
exports.default = EmbedCommand;
