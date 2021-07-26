import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../utils/globals";
import Storage from "../../utils/storage";
import { getChannel } from "../../utils/getChannel";
export default class WarnlogremoveCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["removewarnlog"],

            args: [
                {
                    key: "delwarnlog",

                    prompt: "Please mention the channel you are removing logs from!",

                    type: "string"
                }
            ],

            description: "Server Admins can remove a channel from warning logs.",

            group: "logging",

            guildOnly: true,

            memberName: "delwarnlogs",

            name: "delwarnlogs",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { delwarnlog }: { delwarnlog: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("There was an error?");

        const channel = getChannel(delwarnlog, msg.guild);
        if (channel === undefined) return msg.say("Please give me a **valid** channel");

        const chmodlog = STORAGE.warnlogs.findIndex((a) => a.serverID === msg.guild?.id);
        if (chmodlog === -1) {
            return msg.reply("This server does not have a modlog channel set!");
        }

        STORAGE.warnlogs.splice(chmodlog, 1);
        Storage.saveConfig();
        return msg.say(`${channel} has been removed from warn logs!`);
    }
}