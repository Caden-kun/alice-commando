import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Message, MessageEmbed } from "discord.js";
export default class MemberCountCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["membercount", "users", "totalusers"],

            description: "shows how many members the bot is serving!",

            group: "group1",

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
            .setTitle("Member Count:")
            .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setDescription(`I am serving **${STORAGE.membercount}** users!`)
            .setTimestamp();
        return msg.channel.send(embed);
    }
}