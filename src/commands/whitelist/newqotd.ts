import * as commando from "discord.js-commando";
import { STORAGE, qotdping } from "../../utils/globals";
import { Message } from "discord.js";
import Storage from "../../utils/storage";
import { randomQuestion } from "random-question";
export default class NewqotdCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            args: [
                {
                    default: "",
                    key: "forcescope",
                    prompt: "Error, you did not include the `--force` scope. Please retry.",
                    type: "string"
                }
            ],
            description: "sends a new qotd",

            group: "utility",

            guildOnly: true,

            memberName: "newqotd",

            name: "newqotd",

            ownerOnly: true,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { forcescope }: { forcescope: string;}
    ): Promise<Message | Message[]> {
        if (forcescope === "") {
            return msg.reply("You did not provide a scope!");
        }
        if (forcescope === "--force") {
            STORAGE.qotd = randomQuestion();
            Storage.saveConfig();
            const qotdtext = `${qotdping} **Today's Question Of The Day:** ${STORAGE.qotd}`;
            return msg.channel.send(qotdtext);
        }
        return msg;
    }
}