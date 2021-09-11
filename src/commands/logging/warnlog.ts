import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../utils/globals";
import Storage from "../../utils/storage";
import { getChannel } from "../../utils/getChannel";
export default class WarnLogSetCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["logwarns", "logwarn"],

            args: [
                {
                    key: "warnlogs",

                    prompt: "Which channel do you want to set warn logs for?",

                    type: "string"
                }
            ],

            description: "Server Admins can set a warnings channel.",

            group: "logging",

            guildOnly: true,

            memberName: "setwarnlogs",

            name: "setwarnlogs",

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
        { warnlogs }: { warnlogs: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("there was an internal error!\nError 101 - message_guild_null\nPlease contact the devs with the error code if you think that there is a problem.");

        const channel = getChannel(warnlogs, msg.guild);


        if (channel === undefined) return msg.say("Please give me a **valid** channel");
        const warnGuild = STORAGE.warnlogs.find((c) => c.serverID === msg.guild?.id);
        if (warnGuild !== undefined)
            return msg.reply("You already have modlog channel set in the server!");


        STORAGE.warnlogs.push({ channelID: channel.id, serverID: msg.guild.id });
        Storage.saveConfig();
        return msg.say(`${channel} has been set to recieve warn logs!`);
    }
}