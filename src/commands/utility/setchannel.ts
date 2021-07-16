import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../globals";
import Storage from "../../storage";
export default class QotdsetCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["s"],

            args: [
                {
                    key: "qotdchannel",

                    prompt: "which channel would you like to set for the QOTD? Please provide a channel ID.",

                    type: "string"
                }
            ],

            description: "Server Admins can set the QOTD channel for the bot.",

            group: "group1",

            guildOnly: true,


            memberName: "setqotd",

            name: "setqotd",

            ownerOnly: true,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { qotdchannel }: { qotdchannel: string; }
    ): Promise<Message | Message[]> {

        STORAGE.qotdchannel = qotdchannel;
        if (msg.guild === null) return msg.say("There was an error?");
        STORAGE.qotdserver = msg.guild.id;
        // eslint-disable-next-line prefer-destructuring
        Storage.saveConfig();
        return msg.say(`<#${STORAGE.qotdchannel}> has been set! if this` +
        " appears as an invalid channel, please check if the channel ID is correct.");
    }
}