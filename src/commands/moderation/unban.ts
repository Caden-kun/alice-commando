import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Message, MessageEmbed, TextChannel } from "discord.js";
export default class UnbanCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            args: [
                {
                    key: "unbanuser",

                    prompt: "Please mention a user to unban!",

                    type: "string"
                },
                {
                    default: "No reason provided",

                    key: "unbanreason",

                    prompt: "Please type a reason!",

                    type: "string"
                }
            ],
            description: "Unbans a user",

            group: "utility",

            guildOnly: true,


            memberName: "unban",

            name: "unban",

            ownerOnly: false,

            throttling: {
                duration: 5,
                usages: 3
            },
            userPermissions: ["BAN_MEMBERS"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { unbanuser, unbanreason }: { unbanreason: string; unbanuser: string; }
    ): Promise<Message | Message[]> {
        let uidParsed = unbanuser;
        // Check if a member was tagged or not. If the member was tagged remove the
        // Tag from uid.
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (unbanuser.startsWith("<@") && unbanuser.endsWith(">")) {
            const re = new RegExp("[<@!>]", "g");
            uidParsed = unbanuser.replace(re, "");
        }

        if (uidParsed.length !== 18) {
            return msg.reply("Invalid user, please provide a valid ID.");
        }
        let bans;
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            bans = await msg.guild?.fetchBan(unbanuser);

        } catch (err) {
            return msg.reply("That user is not banned!");
        }
        const embed = new MessageEmbed()
            .setTitle(`${unbanuser} has been Unbanned!`)
            .setDescription(`Reason: **${unbanreason}**\nModerator:${msg.author.tag} - ${msg.author.toString()}`)
            .setColor(CONFIG.colours.green)
            .setTimestamp();
        const channels = STORAGE.modlogs;

        channels.forEach((ch) => {
            const channel = msg.guild?.channels.cache.get(ch.channelID) as TextChannel | undefined;

            if (channel === undefined) return;

            return channel.send(embed);

        });
        void msg.guild?.members.unban(unbanuser, unbanreason);
        let description = `**<@!${unbanuser}>** was unbanned! Reason: **${unbanreason}**`;
        if (unbanreason === "No reason provided")
            description = `<@!${unbanuser}> was unbanned.`;

        const unbanembed = new MessageEmbed()
            .setDescription(description)
            .setColor(CONFIG.colours.yellow);
        return msg.channel.send(unbanembed);


    }
}