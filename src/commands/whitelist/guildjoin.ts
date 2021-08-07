import * as commando from "discord.js-commando";
import { Message } from "discord.js";
export default class GuildjoinCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["gj", "joinguild"],

            description: "I say hi back :D",

            group: "group1",

            guildOnly: true,

            memberName: "guildjoin",

            name: "guildjoin",

            ownerOnly: true,

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
        if (msg.channel.type !== "text") return msg.reply("Please use this command in a server!");
        if (msg.guild === null) return msg.reply("This command can only be used in guilds!");

        msg.client.emit("guildCreate", msg.guild);
        return msg.reply("Just emmited a guild join event!");
    }
}