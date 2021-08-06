import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../utils/globals";
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
        let warncount = db.get(`${member.id}_${msg.guild.id}_warns`);
        let warncolor = CONFIG.colours.red;
        if (warncount === null) {
            warncount = "0";
            warncolor = CONFIG.colours.green;
            console.log(warncolor);
        }
        const rembed = new MessageEmbed()
            .setDescription(`**${member.user.tag}** has **${warncount}** warnings!`)
            .setColor(warncolor);
        return msg.channel.send(rembed);
    }
}