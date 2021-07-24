import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../utils/globals";
import Storage from "../../utils/storage";

export default class SetupdateCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["update"],

            args: [
                {
                    key: "updatemessage",

                    prompt: "What do you wanna add to the update text?",

                    type: "string",

                    wait: 90
                }
            ],

            description: "devs can set bot latest updates for botinfo",

            group: "group1",

            guildOnly: true,

            memberName: "setupdate",

            name: "setupdate",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { updatemessage }: { updatemessage: string; }
    ): Promise<Message | Message[]> {
        STORAGE.botupdates = updatemessage;
        Storage.saveConfig();
        return msg.channel.send("I have updated the bot updates embed!:"
        + ` **${STORAGE.botupdates}**`);
    }
}