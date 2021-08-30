import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../utils/globals";
import { nanoid } from "nanoid";
export default class NanoidCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            description: "Bot Moderator Command only.",

            group: "group1",

            guildOnly: true,

            memberName: "testnanoid",

            name: "testnanoid",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            }

        });
    }

    public async run(
        msg: commando.CommandoMessage
    ): Promise<Message | Message[]> {
        const botMod = STORAGE.botmods.find((c) => c.botmodid === msg.author.id);
        if (botMod === undefined)
            return msg.reply("You are not a bot moderator. You cannot use this command.");
        const botbanreference = nanoid(10);
        return msg.reply(`Your Reference Number is \`${botbanreference}\``);

    }
}