import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../globals";
export default class InvCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["inv"],

            description: "Gives you a link to invite Alice",

            group: "utility",

            guildOnly: false,


            memberName: "invite",

            name: "invite",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage
    ): Promise<Message | Message[]> {
        const embed = new MessageEmbed()
            .setColor(CONFIG.colours.yellow)
            .setTitle("Alice - Invite Me!")
            .setDescription("Interested in inviting Alice to a Server you own?")
            .addField("Invite link:", "[Click here!](https://discord.com/api/oauth2/authorize?client_id=720809995628707902&permissions=8&scope=bot)", false)
            .addField("Got any questions, or queries?", "[Join the Bot Support Server!](https://discord.gg/DsTsNCvumJ)")
            .setFooter("I miss Eugeo :(");

        return msg.channel.send(embed);
    }
}