import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { dtimestamp } from "../../utils/globals";
export default class TimeCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            description: "tells you the time in a timestamp",

            group: "utility",

            guildOnly: false,


            memberName: "testtime",

            name: "testtime",

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
        const timenow = Date.now();
        const dtime = dtimestamp(timenow);
        return msg.reply(`The time is <t:${dtime}>`);
    }
}