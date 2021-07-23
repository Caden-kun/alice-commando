import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../globals";
import { getMember } from "../../utils";

// Creates a new class (being the command) extending off of the commando client
export default class AvatarCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            aliases: ["av", "pfp"],
            args: [
                {
                    key: "userID",
                    prompt: "Please ping or provide an ID of the user!",
                    type: "string"
                }
            ],
            clientPermissions: ["EMBED_LINKS"],

            description: "Displays the avatar of a user in an embed.",

            group: "utility",


            guildOnly: true,

            memberName: "avatar",

            name: "avatar",
            throttling: {
                duration: 5,
                usages: 2
            }
        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { userID }: {userID: string;}
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.reply("This command can only be used in guilds!");
        let member = await getMember(userID, msg.guild);

        // eslint-disable-next-line prefer-destructuring
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (member === undefined) {
            // eslint-disable-next-line prefer-destructuring
            member = msg.member;

        }
        if (member === null)
            return msg.reply("mention a user!");

        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag}'s Avatar:`)
            .setColor(CONFIG.colours.yellow)
            .setImage(`${member.user.displayAvatarURL({ dynamic: true, size: 4096 })}`);
        return msg.channel.send(embed);
    }

}