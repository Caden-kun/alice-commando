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
const discord_js_1 = require("discord.js");
const getMember_1 = require("../../utils/getMember");
class CuddleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            aliases: ["cuddles", "cubbles", "cubble"],
            args: [
                {
                    key: "cuddleuser",
                    prompt: "Cuddling alone? I'm not allowing it! Who are you cuddling with? Please mention a user.",
                    type: "string"
                },
                {
                    default: "",
                    key: "addtext",
                    prompt: "Anything you want to add?",
                    type: "string"
                }
            ],
            clientPermissions: ["SEND_MESSAGES"],
            description: "Cuddles a user with a GIF.",
            group: "fun",
            guildOnly: true,
            memberName: "cuddle",
            name: "cuddle",
            throttling: {
                duration: 5,
                usages: 1
            }
        });
    }
    async run(msg, { cuddleuser, addtext }) {
        if (msg.guild === null)
            return msg.reply("This command can only be used in guilds!");
        const member = await getMember_1.getMember(cuddleuser, msg.guild);
        if (member === null)
            return msg.reply("mention a user!");
        const cuddle = [
            "https://cdn.discordapp.com/attachments/857397061544181810/857397110483714088/cuddle1.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397119253872685/cuddle2.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397127671054356/cuddle3.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397135163260928/cuddle4.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397140942356490/cuddle5.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397148533915649/cuddle6.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397157485084682/cuddle7.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397166333886474/cuddle8.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397173393948672/cuddle9.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397171460898826/cuddle10.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397177494929448/cuddle11.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397192289419274/cuddle12.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397187713695784/cuddle13.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397191075954698/cuddle14.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397206796730408/cuddle15.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397205874900992/cuddle16.gif",
            "https://cdn.discordapp.com/attachments/857397061544181810/857397208524652544/cuddle17.gif"
        ];
        const cuddlereply = [
            "Awww!",
            ":pleading_face:",
            "So cute!",
            "Don't squeeze too hard!"
        ];
        db.add(`${msg.author.id}_cuddles${member.id}`, 1);
        const commandused = db.get(`${msg.author.id}_cuddles${member.id}`);
        let desc = `${msg.author.toString()} is cuddling ${member.toString()}! ${cuddlereply[Math.floor(Math.random() * cuddlereply.length)]}`;
        if (msg.author.id === member.id)
            desc = "Awww, cmhere! Take this cuddle from me :pleading_face:";
        const embed = new discord_js_1.MessageEmbed()
            .setColor("#EFFF00")
            .setImage(cuddle[Math.floor(Math.random() * cuddle.length)])
            .setDescription(desc)
            .setFooter(`${addtext} ??? That's ${commandused} cuddles now!`)
            .setTimestamp();
        return msg.channel.send(embed);
    }
}
exports.default = CuddleCommand;
