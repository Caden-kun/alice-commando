import * as commando from "discord.js-commando";
import { Message } from "discord.js";
export default class UptimeCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["u"],

            description: "Shows how long the bot was online for.",

            group: "utility",

            guildOnly: false,


            memberName: "uptime",

            name: "uptime",

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
        if (msg.client.uptime === null) return msg.reply("internal error!\nError 102 - uptime_not_found\nPlease contact the devs with the error code if you think that there is a problem.");
        let seconds = Math.floor(msg.client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        return msg.channel.send(`Bot Uptime: **${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds.`);
    }
}