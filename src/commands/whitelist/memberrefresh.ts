import * as commando from "discord.js-commando";
import { STORAGE, replyembed } from "../../utils/globals";
import { Message } from "discord.js";
import Storage from "../../utils/storage";
export default class HiCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    default: "--force",

                    key: "--force",

                    prompt: "forces a refresh of the membercount",

                    type: "string"
                }
            ],
            description: "refreshes the membercount database",

            group: "group1",

            guildOnly: false,


            memberName: "refreshmembercount",

            name: "refreshmembercount",

            ownerOnly: true,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage
    ): Promise<Message | Message[]> {
        let members = 0;
        msg.client.guilds.cache.forEach((g) => {
            members += g.memberCount;
        });
        STORAGE.membercount = members;
        Storage.saveConfig();
        return replyembed(msg, "Membercount refreshed.", "");
    }
}