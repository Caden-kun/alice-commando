import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../globals";
import { Guild, Message, TextChannel } from "discord.js";
import Storage from "../../storage";
import { randomQuestion } from "random-question";
export default class QotdCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            aliases: ["question", "questionoftheday"],

            clientPermissions: ["SEND_MESSAGES"],

            description: "I send a random question every 1 day.",

            group: "fun",

            guildOnly: true,

            memberName: "qotd",

            name: "qotd",

            throttling: {
                duration: 5,
                usages: 1
            }

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        qotdchnl: Storage["qotdchannel"]
    ): Promise<Message | Message[]> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (qotdchnl === undefined)
            return msg.reply("please set a qotd channel using the command"
        + ` ${CONFIG.prefix}setchannel [channelID].`);
        const qotdserver: Guild = await msg.client.guilds.fetch(STORAGE.qotdserver);

        const qotd: TextChannel = qotdserver.channels.cache.get(STORAGE.qotdchannel) as TextChannel;
        void msg.reply("Qotd message sent. If it has not been delivered, please check your channel permissions.");
        return qotd.send(`**Question Of The Day:** ${randomQuestion()}`);

    }
}
