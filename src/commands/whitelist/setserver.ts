import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../globals";
import Storage from "../../storage";
export default class QotdCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "serverID",

                    prompt: "which server would you like to set for the QOTD? Please provide a channel ID.",

                    type: "string"
                }
            ],

            description: "Server Admins can set the QOTD channel for the bot.",

            group: "group1",

            guildOnly: true,

            memberName: "setserver",

            name: "setserver",


            throttling: {
                duration: 60,
                usages: 3
            },
            userPermissions: ["MANAGE_GUILD"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { serverID }: { serverID: string; }
    ): Promise<Message | Message[]> {

        STORAGE.qotdserver = serverID;
        // eslint-disable-next-line prefer-destructuring
        Storage.saveConfig();
        return msg.say("Server has been set! if this" +
        " appears as an invalid channel, please check if the channel ID is correct.");
    }
}