import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../utils/globals";
import Storage from "../../utils/storage";
import { getChannel } from "../../utils/getChannel";
export default class ModlogsetCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["modlog"],

            args: [
                {
                    key: "modlogs",

                    prompt: "Which channel do you want to recieve modlogs for? please provide a channel ID.",

                    type: "string"
                }
            ],

            description: "Server Admins can set modlog channels to recieve deleted message logs.",

            group: "moderation",

            guildOnly: true,

            memberName: "setmodlogs",

            name: "setmodlogs",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["ADMINISTRATOR"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { modlogs }: { modlogs: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("There was an error?");

        const channel = getChannel(modlogs, msg.guild);

        if (channel === undefined) return msg.say("Please give me a **valid** channel");

        if (STORAGE.modlogs.includes(channel.id)) return msg.say("That channel is already on the modlogs list!");

        STORAGE.modlogs.push(channel.id);
        Storage.saveConfig();
        return msg.say(`<#${modlogs}> has been set! if this` +
        " appears as an invalid channel, please check if the channel ID is correct.");
    }
}