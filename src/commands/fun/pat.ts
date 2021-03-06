import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../utils/globals";
import { getMember } from "../../utils/getMember";

export default class PatCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            aliases: ["headpats", "pats", "headpat"],

            args: [
                {
                    key: "patuser",

                    prompt: "Who are you giving headpats to? Please mention a user!",

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

            description: "Hugs a user with a GIF.",

            group: "fun",

            guildOnly: true,

            memberName: "pat",

            name: "pat",

            throttling: {
                duration: 5,
                usages: 2
            }

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { patuser, addtext }: { addtext: string; patuser: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.reply("there was an internal error!\nError 101 - message_guild_null\nPlease contact the devs with the error code if you think that there is a problem.");

        const member = await getMember(patuser, msg.guild);

        if (member === null)
            return msg.reply("there was an internal error!\nError 103 - member_not_found\nPlease contact the devs with the error code if you think that there is a problem.");

        const pats = [
            "https://cdn.discordapp.com/attachments/857397018322403378/868619608377143356/pat1.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619615507480626/pat2.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619619873734726/pat3.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619633467461682/pat4.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619634839003178/pat5.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619643869347900/pat6.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619658654285904/pat7.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619659711250484/pat8.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619669920157696/pat9.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619678388465704/pat10.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619688438034483/pat11.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619695249580072/pat12.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619702006599720/pat13.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619707769552926/pat14.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619717508747275/pat15.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619725230448661/pat16.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619735724605480/pat17.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619740300607488/pat18.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619747745464421/pat19.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619760605212702/pat20.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619763654459482/pat21.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619771191648266/pat22.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619782772121680/pat23.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619792486125578/pat24.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619796005138502/pat25.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619806402809866/pat26.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619810337062972/pat27.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619822097895444/pat28.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619829391798332/pat29.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619838761873458/pat30.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619847641206844/pat31.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619860001841209/pat32.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619875210362930/pat33.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619879366938664/pat34.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619892302164059/pat35.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619893581414420/pat36.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619900497834024/pat37.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619910002118696/pat38.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619916213903400/pat39.gif",
            "https://cdn.discordapp.com/attachments/857397018322403378/868619923700736041/pat40.gif"
        ];

        const patreply = [
            ":pleading_face:",
            "*smiles*",
            "Awww!"
        ];
        db.add(`${msg.author.id}_pats${member.id}`, 1);

        const commandused = db.get(`${msg.author.id}_pats${member.id}`);

        let desc = `${msg.author.toString()} is giving ${member.toString()} headpats! ${patreply[Math.floor(Math.random() * patreply.length)]}`;

        if (msg.author.id === member.id) desc = "*headpats* There there~";
        const embed = new MessageEmbed()
            .setColor(CONFIG.colours.yellow)
            .setImage(pats[Math.floor(Math.random() * pats.length)])
            .setDescription(desc)
            .setFooter(`${addtext} ??? That's ${commandused} pats now!`)
            .setTimestamp();
        return msg.channel.send(embed);

    }


}