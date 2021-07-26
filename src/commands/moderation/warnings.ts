import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { Message } from "discord.js";
import { getMember } from "../../utils/getMember";
export default class WarnCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["warnhistory"],

            args: [
                {
                    default: "",

                    key: "warningsuser",

                    prompt: "who are you fetching warn logs for?",

                    type: "string"
                }
            ],

            description: "Shows the number of warns a user has.",

            group: "moderation",

            guildOnly: true,

            memberName: "warnings",

            name: "warnings",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { warningsuser }: { warningsuser: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("There was an error?");
        void msg.delete();
        const member = await getMember(warningsuser, msg.guild);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (member === null) {
            return msg.reply("mention a user!");
        }
        db.get(`${member.id}_${msg.guild.id}_warns`);
        let warncount = db.get(`${member.id}_warns`);
        if (warncount === null)
            warncount = "0";
        return msg.reply(`**${member.user.tag}** has **${warncount}** warnings!`);
    }
}

