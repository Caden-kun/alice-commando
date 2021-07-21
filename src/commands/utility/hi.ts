import * as commando from "discord.js-commando";
import { Message } from "discord.js";
export default class HiCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["h"],

            description: "I say hi back :D",

            group: "utility",

            guildOnly: false,


            memberName: "hi",

            name: "hi",

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
        return msg.reply("Hi!");
    }
}