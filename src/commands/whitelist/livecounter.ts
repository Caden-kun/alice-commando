import * as commando from "discord.js-commando";
import { Message } from "discord.js";
export default class HiCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["livetime"],

            description: "bot live uptime",

            group: "group1",

            guildOnly: false,

            memberName: "liveuptime",

            name: "liveuptime",

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
        if (msg.client.uptime === null) return msg.reply("Uptime Error!");
        let seconds = Math.floor(msg.client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        setInterval(async () => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            msg.channel.messages.fetch({ around: "871568256316616765", limit: 1 })
                .then(async (message) => {
                    const fetchedMsg = message.first();
                    if (fetchedMsg === undefined)
                        return msg.reply("there was an error");
                    void fetchedMsg.delete();
                    return msg.channel.send(`Bot Uptime: **${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds.`);
                });
        }, 30000); // Runs this every 30 seconds.
        return msg;
    }
}

