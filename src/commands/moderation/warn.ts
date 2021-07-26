import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import { getMember } from "../../utils/getMember";
export default class WarnCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["strike"],

            args: [
                {
                    key: "warnuser",

                    prompt: "Who are you warning?",

                    type: "string"
                },
                {
                    key: "warnreason",

                    prompt: "Please type a reason!",

                    type: "string"
                }
            ],

            description: "Warns a user and DM's them.",

            group: "moderation",

            guildOnly: true,

            memberName: "warn",

            name: "warn",

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
        { warnuser, warnreason }: { warnreason: string; warnuser: string; }
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
        if (member.id === msg.author.id) {
            return msg.reply("dumbass you cannot warn yourself!");

        }

        db.add(`${member.id}_${msg.guild.id}_warns`, 1);
        const warncount = db.get(`${member.id}_${msg.guild.id}_warns`);
        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag} has been warned!`)
            .setDescription(`Reason: **${warnreason}**\nModerator:${msg.author.tag} - ${msg.author.toString()}\nWarns: **${warncount}** warnings`)
            .setColor(CONFIG.colours.red)
            .setFooter("Someone has been naughty!")
            .setTimestamp();
        const dmembed = new MessageEmbed()
            .setTitle(`You have been warned in ${msg.guild.name}!`)
            .setDescription(`Reason: **${warnreason}**\nWarns: **${warncount}** warnings`)
            .setColor(CONFIG.colours.red)
            .setFooter("Please follow the rules next time.")
            .setTimestamp();
        const channels = STORAGE.warnlogs;

        channels.forEach((ch) => {
            const channel = msg.guild?.channels.cache.get(ch.channelID) as TextChannel | undefined;

            if (channel === undefined) return;

            return channel.send(embed);

        });
        void member.send(dmembed);
        return msg.reply(`**${member.user.tag}** has been warned.`);
    }
}

