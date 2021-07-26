import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { randomQuestion } from "random-question";
export default class TopicCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            aliases: ["t", "subject"],

            clientPermissions: ["SEND_MESSAGES"],

            description: "sends a random topic to the channel.",

            group: "fun",

            guildOnly: true,

            memberName: "topic",

            name: "topic",

            throttling: {
                duration: 5,
                usages: 1
            }

        });
    }

    public async run(
        msg: commando.CommandoMessage
    ): Promise<Message | Message[]> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return msg.say(randomQuestion());

    }
}
