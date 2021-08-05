import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import { getMember } from "../../utils/getMember";
export default class DelWarnCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["pardon"],

            args: [
                {
                    key: "warnuser",

                    prompt: "Who are you removing a warn from?",

                    type: "string"
                }
            ],

            description: "Removes a warn from a user.",

            group: "moderation",

            guildOnly: true,

            memberName: "delwarn",

            name: "delwarn",

            ownerOnly: false,

            throttling: {
                duration: 5,
                usages: 3
            },
            userPermissions: ["MANAGE_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { warnuser }: { warnuser: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("There was an error?");
        void msg.delete();
        const member = await getMember(warnuser, msg.guild);

        // eslint-disable-next-line prefer-destructuring
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (member === undefined) {
            return msg.reply("Please mention a valid user to warn!");
        }
        if (member === null) {
            return msg.reply("Mention a user!");
        }

        db.add(`${member.id}_${msg.guild.id}_warns`, -1);
        let warncount = db.get(`${member.id}_${msg.guild.id}_warns`);
        if (warncount === null) warncount = "0";
        if (warncount === "0")
            return msg.reply(`${member.user.tag} has no warnings!`);
        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag} has had a warning removed!`)
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setDescription(`Moderator: ${msg.author.tag} - ${msg.author.toString()}\nWarns: **${warncount}** warnings`)
            .setColor(CONFIG.colours.green)
            .setTimestamp();
        const channels = STORAGE.warnlogs;

        channels.forEach((ch) => {
            const channel = msg.guild?.channels.cache.get(ch.channelID) as TextChannel | undefined;

            if (channel === undefined) return;

            return channel.send(embed);

        });
        return msg.reply(`**${member.user.tag}**'s warning was deleted. Total Warnings: ${warncount}`);
    }
}

