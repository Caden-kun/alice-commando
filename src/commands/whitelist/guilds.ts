import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../utils/globals";
export default class GuildCountCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["servercount", "servers", "totalservers"],

            description: "shows how many servers the bot is in!",

            group: "utility",

            guildOnly: true,


            memberName: "guilds",

            name: "guilds",

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
            .setDescription(`I am serving **${msg.client.guilds.cache.size}** servers! :D`)
            .setTimestamp();
        return msg.channel.send(embed);
    }
}