import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../globals";
import Storage from "../../storage";
export default class BotbanCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "banuser",

                    prompt: "Who are you banning from using alice? Please ping the user or provide their ID.",

                    type: "string"
                }
            ],

            description: "Bot Devs can ban users from using commands from alice.",

            group: "group1",

            guildOnly: true,

            memberName: "botban",

            name: "botban",


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