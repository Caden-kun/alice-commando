import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../utils/globals";
export default class HiCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["vote"],

            description: "vote for alice on top.gg!",

            group: "utility",

            guildOnly: false,


            memberName: "upvote",

            name: "upvote",

            ownerOnly: false,

            throttling: {
                duration: 10,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage
    ): Promise<Message | Message[]> {
        const embed = new MessageEmbed()
            .setTitle("Upvote Alice!")
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
            .setColor(CONFIG.colours.yellow)
            .setDescription("\n**You can upvote her on either one of these sites, or even both if you want!**\n"
            + "[top.gg](https://top.gg/bot/720809995628707902/vote) \n[Discord Bot List](https://discordbotlist.com/bots/alice-zuberg)")
            .setFooter("Thank you for upvoting!")
            .setTimestamp();
        return msg.say(embed);
    }
}