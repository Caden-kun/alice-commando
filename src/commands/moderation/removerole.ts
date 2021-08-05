import * as commando from "discord.js-commando";
import { Message, Role } from "discord.js";
import { getMember } from "../../utils/getMember";
export default class AddRoleCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["roleremove", "rrole"],

            args: [
                {
                    key: "roleuser",

                    prompt: "Please ping a user to remove the role from.",

                    type: "string"
                },
                {

                    key: "roleid",

                    prompt: "What role am I removing from the user? (Please ping the role or provide the ID).",

                    type: "string"
                }
            ],

            description: "I remove a role from a user.",

            group: "moderation",

            guildOnly: true,

            memberName: "removerole",

            name: "removerole",

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
            if (!member.roles.cache.find((r) => r.id === rIDParsed)) {
                return msg.reply("The user does not have that role!");
            }
            radd = member.guild.roles.cache.find((role) => role.id === rIDParsed) as Role;
            void await member.roles.remove(rIDParsed);
            void msg.reply(`I have removed the role from **${member.user.tag}**!`);
        } catch (err) {
            console.log(radd);
            return msg.reply(`I could not remove that role from **${member.user.tag}**.` +
            " Please check if my role is higher than the role and user you are trying to remove.");
        }
        return msg;
    }
}