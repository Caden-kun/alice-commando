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
class SmileCommand extends commando.Command {
    constructor(client) {
        super(client, {
            args: [
                {
                    default: "",
                    key: "addtext",
                    prompt: "additional text?",
                    type: "string"
                }
            ],
            clientPermissions: ["SEND_MESSAGES"],
            description: "Sends a smiling GIF.",
            group: "fun",
            guildOnly: true,
            memberName: "smile",
            name: "smile",
            throttling: {
                duration: 5,
                usages: 1
            }
        });
    }
    async run(msg, { addtext }) {
        if (msg.guild === null)
            return msg.reply("This command can only be used in guilds!");
        const smile = [
            "https://cdn.discordapp.com/attachments/863241837601751040/863241880098439238/smile1.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241887485263892/smile2.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241893725995008/smile3.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241900122439700/smile4.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241902375960616/smile5.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241918217846794/smile6.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241926589153290/smile7.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241930308452352/smile8.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241934159347781/smile9.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241943857364992/smile10.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241947685453844/smile11.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241958456557588/smile12.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241959527415828/smile13.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241970650316810/smile14.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241981651058688/smile15.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863241987922722866/smile16.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863242002232901682/smile17.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863242013113581588/smile18.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863242024102133780/smile19.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863242033589256222/smile20.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863242046386995200/smile21.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863242054674939924/smile22.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863242064770629632/smile23.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863242073943179274/smile24.gif",
            "https://cdn.discordapp.com/attachments/863241837601751040/863242079969607700/smile25.gif"
        ];
        const smilereply = [
            ":smile:",
            "I'm so happy!",
            "Yay!"
        ];
        db.add(`${msg.author.id}_slaps`, 1);
        const commandused = db.get(`${msg.author.id}_smiles`);
        const embed = new discord_js_1.MessageEmbed()
            .setColor("#EFFF00")
            .setImage(smile[Math.floor(Math.random() * smile.length)])
            .setDescription(`${msg.author.toString()} is smiling! ${smilereply[Math.floor(Math.random() * smilereply.length)]}`)
            .setFooter(`${addtext} • That's ${commandused} smiles now! Keep on smiling!`)
            .setTimestamp();
        return msg.channel.send(embed);
    }
}
exports.default = SmileCommand;
