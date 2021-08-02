import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../utils/globals";
export default class MemberCountCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["membercount", "users", "totalusers"],

            description: "shows how many members the bot is serving!",

            group: "utility",

            guildOnly: true,


            memberName: "members",

            name: "members",

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
            .setTitle("Guild Count:")
            .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setDescription(`I am serving **${msg.client.users.cache.size}** users!`)
            .setTimestamp();
        return msg.channel.send(embed);
    }
}