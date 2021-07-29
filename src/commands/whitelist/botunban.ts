import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { Message } from "discord.js";
import { getMember } from "../../utils/getMember";
export default class BotBanCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {

                    key: "botunbanuserID",

                    prompt: "Please provide the ID of the user you are unbanning",

                    type: "string"
                }
            ],

            description: "Unbans a user from using the bot.",

            group: "group1",

            guildOnly: true,


            memberName: "botunban",

            name: "botunban",

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
        { botunbanuserID }: {botunbanuserID: string;}
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("there was an error?");
        const member = await getMember(botunbanuserID, msg.guild);
        if (member === null)
            return msg.reply("Please provide a valid ID!");
        const botbanuser = db.get(`botban_${member.id}`);
        console.log(botbanuser);
        if (botbanuser === null)
            return msg.reply(`${member.user.tag} is on the ban list!`);
        if (botbanuser === true)
            db.delete(`botban_${member.id}`);
        return msg.say(`${member.user.tag} has been unbanned from using the bot!`);
    }
}