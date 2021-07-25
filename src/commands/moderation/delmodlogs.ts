import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../utils/globals";
import Storage from "../../utils/storage";
import { getChannel } from "../../utils/getChannel";
export default class ModlogremoveCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["delmodlog"],

            args: [
                {
                    key: "delmodlogs",

                    prompt: "Please mention the channel you are removing logs from!",

                    type: "string"
                }
            ],

            description: "Server Admins can set modlog channels to recieve deleted message logs.",

            group: "moderation",

            guildOnly: true,

            memberName: "removelogs",

            name: "removelogs",

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
        { delmodlogs }: { delmodlogs: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("There was an error?");

        const channel = getChannel(delmodlogs, msg.guild);
        if (channel === undefined) return msg.say("Please give me a **valid** channel");

        const foundIndex = STORAGE.modlogs.findIndex((a) => a === `${channel.id}`);

        if (foundIndex === -1)
            return msg.reply(`${channel} is not set as a modlog channel! Please try again.`);

        STORAGE.modlogs.splice(foundIndex, 1);
        console.log(STORAGE.modlogs);
        Storage.saveConfig();
        return msg.say(`${channel} has been removed from logs!`);
    }
}