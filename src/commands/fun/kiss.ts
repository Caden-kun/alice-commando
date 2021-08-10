import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { Message, MessageEmbed } from "discord.js";
import { getMember } from "../../utils/getMember";
export default class CuddleCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["smooch"],

            args: [
                {
                    key: "kissuser",

                    prompt: "kissing yourself? I'm not allowing it! Who are you kissing? Please mention a user.",

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

            description: "kisses a user with a GIF.",

            group: "fun",

            guildOnly: true,

            memberName: "kiss",

            name: "kiss",

            throttling: {
                duration: 5,
                usages: 2
            }

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { kissuser, addtext }: { addtext: string; kissuser: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.reply("This command can only be used in guilds!");

        const member = await getMember(kissuser, msg.guild);

        if (member === null)
            return msg.reply("mention a user!");

        const kiss = [
            "https://cdn.discordapp.com/attachments/872571438723375114/872571641350205570/kiss1.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571642591711232/kiss2.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571646265933864/kiss3.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571659515740180/kiss4.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571665144483880/kiss5.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571673558257715/kiss7.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571683842699264/kiss8.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571699055456296/kiss9.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571702134071436/kiss10.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571709629284463/kiss11.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571751245160570/kiss12.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571755275890688/kiss13.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571762955653170/kiss14.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571772548055101/kiss15.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571779598663690/kiss16.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571788784177162/kiss17.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571796912738305/kiss18.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571816269451314/kiss19.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571826050572318/kiss20.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571837173858414/kiss21.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571850293645322/kiss22.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571858900353094/kiss23.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571865502195732/kiss24.gif",
            "https://cdn.discordapp.com/attachments/872571438723375114/872571878114488350/kiss25.gif"

        ];

        const kissreply = [
            "That's hot :flushed:",
            "Cute!!"


        ];
        db.add(`${msg.author.id}_kiss${member.id}`, 1);

        const commandused = db.get(`${msg.author.id}_kiss${member.id}`);

        let desc = `${msg.author.toString()} is kissing ${member.toString()}! ${kissreply[Math.floor(Math.random() * kissreply.length)]}`;

        if (msg.author.id === member.id) desc = "Aww, let me give you a kiss :3 _kisses_";
        const embed = new MessageEmbed()
            .setColor("#EFFF00")
            .setImage(kiss[Math.floor(Math.random() * kiss.length)])
            .setDescription(desc)
            .setFooter(`${addtext} • That's ${commandused} kisses now!`)
            .setTimestamp();
        return msg.channel.send(embed);


    }

}