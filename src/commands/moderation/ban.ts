import * as commando from "discord.js-commando";
import { CONFIG, STORAGE, replyembed } from "../../utils/globals";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import { getMember } from "../../utils/getMember";
export default class BanCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "banuser",

                    prompt: "Please mention a user to ban!",

                    type: "string"
                },
                {
                    default: "No reason provided",

                    key: "banreason",

                    prompt: "Please type a reason!",

                    type: "string"
                }
            ],

            description: "Bans a user and DM's them the reason.",

            group: "moderation",

            guildOnly: true,

            memberName: "ban",

            name: "ban",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 5
            },
            userPermissions: ["BAN_MEMBERS"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { banuser, banreason }: { banreason: string; banuser: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("there was an internal error!\nError 101 - message_guild_null\nPlease contact the devs with the error code if you think that there is a problem.");
        void msg.delete();
        const member = await getMember(banuser, msg.guild);

        // eslint-disable-next-line prefer-destructuring
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (member === undefined) {
            return msg.reply("Please mention a valid user to ban.");
        }
        if (member === null) {
            return msg.reply("Mention a user!");
        }
        if (member.id === msg.author.id) {
            return msg.reply("You can't ban yourself.");

        }
        if (!member.bannable)
            return msg.reply("I cannot ban this user. Please check if my role is above the user you are trying to ban.");

        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag} has been Banned!`)
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setDescription(`Reason: **${banreason}**\nModerator:${msg.author.tag} - ${msg.author.toString()}`)
            .setColor(CONFIG.colours.red)
            .setFooter(`Member ID: ${member.id}`)
            .setTimestamp();
        const dmembed = new MessageEmbed()
            .setTitle(`You have been banned from ${msg.guild.name}!`)
            .setDescription(`Reason: **${banreason}**`)
            .setColor(CONFIG.colours.red)
            .setFooter("You may not appeal this ban.")
            .setTimestamp();
        const channels = STORAGE.modlogs;

        channels.forEach((ch) => {
            const channel = msg.guild?.channels.cache.get(ch.channelID) as TextChannel | undefined;

            if (channel === undefined) return;

            return channel.send(embed);

        });
        try {
            await member.send(dmembed);

        } catch (err) {
            void msg.reply("I could not DM the user to inform them that they were banned.");
        }
        member.ban({ days: 0, reason: `${banreason}` })
            .catch(async (error) => msg.reply(`Ban failed.\n Reason: **${error}**`));
        let description = `**${member.user.tag}** was banned for **${banreason}**`;
        if (banreason === "No reason provided")
            description = `**${member.user.tag}** was banned.`;

        return replyembed(msg, description, CONFIG.colours.green);
    }
}

