import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Message, MessageEmbed, Role, TextChannel } from "discord.js";
import { getMember } from "../../utils/getMember";
export default class AddRoleCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["roleadd", "role"],

            args: [
                {
                    key: "roleuser",

                    prompt: "Please ping a user to add the role to.",

                    type: "string"
                },
                {

                    key: "roleid",

                    prompt: "What role am I adding to the user? (Please ping the role or provide the ID).",

                    type: "string"
                }
            ],

            description: "I add a role to a user.",

            group: "moderation",

            guildOnly: true,

            memberName: "addrole",

            name: "addrole",

            ownerOnly: false,

            throttling: {
                duration: 5,
                usages: 3
            },
            userPermissions: ["MANAGE_ROLES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { roleuser, roleid }: { roleid: string; roleuser: string;}
    ): Promise<Message | Message[]> {
        let rIDParsed = roleid;
        if (msg.guild === null)
            return msg.reply("there was an error?");
        const member = await getMember(roleuser, msg.guild);

        if (roleid.startsWith("<@&") && roleid.endsWith(">")) {
            const re = new RegExp("[<@&>]", "g");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            rIDParsed = roleid.replace(re, "");
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (member === undefined)
            return msg.reply("Please provide a valid user.");
        if (member === null)
            return msg.reply("There was an error?");
        let radd;
        try {
            if (member.roles.cache.find((r) => r.id === rIDParsed)) {
                return msg.reply("The user already has that role!");
            }
            radd = member.guild.roles.cache.find((role) => role.id === rIDParsed) as Role;
            void await member.roles.add(rIDParsed);
            const rembed = new MessageEmbed()
                .setDescription(`Role <@&${rIDParsed}> successfully added to **${member.user.tag}**`)
                .setColor(CONFIG.colours.yellow);
            void msg.channel.send(rembed);

        } catch (err) {
            console.log(radd);
            return msg.reply(`I could not add that role to **${member.user.tag}**.` +
            " Please check if my role is higher than the role and user you are trying to add.");
        }
        const embed = new MessageEmbed()
            .setTitle(`Role Added to ${member.user.tag}!`)
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setDescription(`Role: <@&${rIDParsed}>\nUser: **${member.user.tag}** - ${member.toString()}\nModerator: ${msg.author.tag} - ${msg.author.toString()}`)
            .setColor(CONFIG.colours.green)
            .setFooter(`Role ID: ${rIDParsed}`)
            .setTimestamp();
        const channels = STORAGE.modlogs;

        channels.forEach((ch) => {
            const channel = msg.guild?.channels.cache.get(ch.channelID) as TextChannel | undefined;

            if (channel === undefined) return;

            return channel.send(embed);

        });
        return msg;
    }
}