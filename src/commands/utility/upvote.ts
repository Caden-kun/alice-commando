import * as commando from "discord.js-commando";
import { CONFIG, dbllink, topgglink } from "../../utils/globals";
import { Message, MessageEmbed } from "discord.js";
export default class UpvoteCommand extends commando.Command {
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
            + `[top.gg](${topgglink}) \n[Discord Bot List](${dbllink})`)
            .setFooter("Thank you for upvoting! It really helps the bot grow <3.")
            .setTimestamp();
        return msg.say(embed);
    }
}