import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../utils/globals";
import Storage from "../../utils/storage";
import { getMember } from "../../utils/getMember";
export default class ModlogsetCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "botmod",

                    prompt: "mention a user you want to remove as a bot mod.",

                    type: "string"
                }
            ],

            description: "Dev Only Command",

            group: "group1",

            guildOnly: true,

            memberName: "removebotmod",

            name: "removebotmod",

            ownerOnly: true,

            throttling: {
                duration: 60,
                usages: 1
            }

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { botmod }: { botmod: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("There was an error?");

        const member = await getMember(botmod, msg.guild);


        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (member === undefined) return msg.say("Please give me a **valid** user");
        if (member === null) return msg.say("Please give me a **valid** user");
        const botMod = STORAGE.botmods.findIndex((c) => c.botmodid === member.id);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (botMod === -1)
            return msg.reply("This user is not a bot mod! Please double check and try again.");


        STORAGE.botmods.splice(botMod, 1);
        Storage.saveConfig();
        return msg.reply(`**${member.user.tag}** has been removed as a bot mod.`);
    }
}