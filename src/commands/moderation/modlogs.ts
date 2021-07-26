import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../utils/globals";
import Storage from "../../utils/storage";
import { getChannel } from "../../utils/getChannel";
export default class ModlogsetCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["setlogs", ""],

            args: [
                {
                    key: "modlogs",

                    prompt: "Which channel do you want to recieve modlogs for? please provide a channel ID or mention a channel.",

                    type: "string"
                }
            ],

            description: "Server Admins can set modlog channels to recieve deleted message logs.",

            group: "moderation",

            guildOnly: true,

            memberName: "setlogs",

            name: "setlogs",

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
        { modlogs }: { modlogs: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("There was an error?");

        const channel = getChannel(modlogs, msg.guild);


        if (channel === undefined) return msg.say("Please give me a **valid** channel");
        const modGuild = STORAGE.modlogs.find((c) => c.serverID === msg.guild?.id);
        if (modGuild !== undefined)
            return msg.reply("You already have modlog channel set in the server!");


        STORAGE.modlogs.push({ channelID: channel.id, serverID: msg.guild.id });
        Storage.saveConfig();
        return msg.say(`${channel} has been set! if this` +
        " appears as an invalid channel, please check if the channel ID is correct.");
    }
}