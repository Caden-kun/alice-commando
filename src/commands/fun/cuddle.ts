import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { getMember } from "../../utils";

export default class CuddleCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "huguser",

                    prompt: "Cuddling alone? I'm not allowing it! Who are you cuddling with? Please mention a user.",

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

    public async run(
        msg: commando.CommandoMessage,
        { huguser }: { huguser: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.reply("This command can only be used in guilds!");

        const member = await getMember(huguser, msg.guild);

        if (member === null)
            return msg.reply("mention a user!");

        const cuddle = [
            "http://cadenkun.com/alice/cuddle/cuddle1.gif",
            "http://cadenkun.com/alice/cuddle/cuddle2.gif",
            "http://cadenkun.com/alice/cuddle/cuddle3.gif",
            "http://cadenkun.com/alice/cuddle/cuddle4.gif",
            "http://cadenkun.com/alice/cuddle/cuddle5.gif",
            "http://cadenkun.com/alice/cuddle/cuddle6.gif",
            "http://cadenkun.com/alice/cuddle/cuddle7.gif",
            "http://cadenkun.com/alice/cuddle/cuddle8.gif",
            "http://cadenkun.com/alice/cuddle/cuddle9.gif",
            "http://cadenkun.com/alice/cuddle/cuddle10.gif",
            "http://cadenkun.com/alice/cuddle/cuddle11.gif",
            "http://cadenkun.com/alice/cuddle/cuddle12.gif",
            "http://cadenkun.com/alice/cuddle/cuddle13.gif",
            "http://cadenkun.com/alice/cuddle/cuddle14.gif",
            "http://cadenkun.com/alice/cuddle/cuddle15.gif",
            "http://cadenkun.com/alice/cuddle/cuddle16.gif",
            "http://cadenkun.com/alice/cuddle/cuddle17.gif"

        ];

        const cuddlereply = [
            "Awww!",
            ":pleading_face:",
            "So cute!",
            "Don't squeeze too hard!"


        ];
        const embed = new MessageEmbed()
            .setColor("#EFFF00")
            .setImage(cuddle[Math.floor(Math.random() * cuddle.length)])
            .setDescription(`${msg.author.toString()} is cuddling ${member.toString()}! ${cuddlereply[Math.floor(Math.random() * cuddlereply.length)]}`);
        return msg.channel.send(embed);

    }

}