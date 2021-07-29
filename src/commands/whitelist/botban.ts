import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { Message } from "discord.js";
import { getMember } from "../../utils/getMember";
export default class BotBanCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {

                    key: "botbanuserID",

                    prompt: "Please provide the ID of the user you are banning.",

                    type: "string"
                }
            ],

            description: "Bans a user from using the bot.",

            group: "group1",

            guildOnly: true,


            memberName: "botban",

            name: "botban",

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
        { botbanuserID }: {botbanuserID: string;}
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("there was an error?");
        const member = await getMember(botbanuserID, msg.guild);
        const botbanuser = db.get(`botban_${member?.id}`);
        if (botbanuser === true)
            return msg.reply(`${member?.user.tag} is already banned from the bot!`);
        if (botbanuser === null)
            db.set(`botban_${member?.id}`, true);
        return msg.say(`${member?.user.tag} has been banned from using the bot!`);
    }
}