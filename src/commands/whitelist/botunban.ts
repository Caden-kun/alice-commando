import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { Message } from "discord.js";
import { STORAGE } from "../../utils/globals";
import { getUser } from "../../utils/getUser";
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
        { botunbanuserID }: {botunbanuserID: string;}
    ): Promise<Message | Message[]> {
        const botMod = STORAGE.botmods.find((c) => c.botmodid === msg.author.id);
        if (botMod === undefined)
            return msg.reply("You are not a bot moderator. You cannot use this command.");
        if (msg.guild === null) return msg.say("there was an error?");
        const user = await getUser(botunbanuserID, msg.client);
        if (user === null)
            return msg.reply("Please provide a valid ID!");
        const botbanuser = db.get(`botban_${user.id}`);
        if (botbanuser === null)
            return msg.reply(`**${user.tag}** NOT on the ban list!`);
        if (botbanuser === true)
            db.delete(`botban_${user.id}`);
        return msg.say(`**${user.tag}** has been unbanned from using the bot!`);
    }
}