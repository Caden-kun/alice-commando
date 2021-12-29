import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { STORAGE, dtimestamp } from "../../utils/globals";
import { Message } from "discord.js";
import Storage from "../../utils/storage";
import { getMember } from "../../utils/getMember";
export default class HiCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {

                    key: "scoreuser",

                    prompt: "Who's score would you like to update?",

                    type: "string"
                }
            ],
            description: "I add scores to the scoreboard",

            group: "utility",

            guildOnly: false,

            memberName: "addscore",

            name: "addscore",

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
        { scoreuser }: {scoreuser: string;}
    ): Promise<Message | Message[]> {
        if (msg.guild === null)
            return msg.reply("there was an error?");
        const osuser = STORAGE.osu.find((c) => c.osuid === msg.author.id);
        if (osuser === undefined)
            return msg.reply("You do not have permission to use this command.");
        const member = await getMember(scoreuser, msg.guild);
        if (member === null)
            return msg.reply("Please mention a valid user!");
        db.add(`${member.id}_osu`, 1);
        const newscore = db.get(`${member.id}_osu`);
        const timenow = Date.now();
        const dtime = dtimestamp(timenow);

        if (member.id === "589290324464238592") {
            STORAGE.noeltime = dtime;
        }
        if (member.id === "456231737488441344") {
            STORAGE.victime = dtime;
        }
        if (member.id === "597884706897264681") {
            STORAGE.cadentime = dtime;
        }
        Storage.saveConfig();
        return msg.reply(`Win added to <@${member.id}>!\nThey now have ${newscore} wins! gg ez`);
    }
}