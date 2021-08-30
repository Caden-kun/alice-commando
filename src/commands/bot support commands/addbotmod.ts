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

                    prompt: "mention a user you would like to give bot mod perms to.",

                    type: "string"
                }
            ],

            description: "Dev Only Command",

            group: "group1",

            guildOnly: true,

            memberName: "addbotmod",

            name: "addbotmod",

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
        const botMod = STORAGE.botmods.find((c) => c.botmodid === member.id);
        if (botMod !== undefined)
            return msg.reply("You already set this user as a bot mod.");


        STORAGE.botmods.push({ botmodid: member.id });
        Storage.saveConfig();
        return msg.reply(`**${member.user.tag}** has been added as a bot mod. I sure hope you know what you're doing.`);
    }
}