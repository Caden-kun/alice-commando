import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../globals";
import Storage from "../../storage";
export default class QotdCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "qotdchannel",

                    prompt: "which channel would you like to set for the QOTD? Please provide a channel ID.",

                    type: "string"
                },
                {
                    key: "qotdserver",

                    prompt: "Nice, you set a channel, now you need to set the server. Please provide the server ID." +
                    " Please note, the server ID must be the same server where the channel you selected is.",

                    type: "string"
                }
            ],

            description: "Server Admins can set the QOTD channel for the bot.",

            group: "group1",

            guildOnly: true,

            memberName: "setqotd",

            name: "setqotd",


            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { qotdchannel, qotdserver }: { qotdchannel: string; qotdserver: string; }
    ): Promise<Message | Message[]> {

        STORAGE.qotdchannel = qotdchannel;
        STORAGE.qotdserver = qotdserver;
        // eslint-disable-next-line prefer-destructuring
        Storage.saveConfig();
        return msg.say(`<#${STORAGE.qotdchannel}> has been set! if this` +
        " appears as an invalid channel, please check if the channel ID is correct.");
    }
}