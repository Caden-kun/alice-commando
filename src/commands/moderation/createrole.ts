import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Message, MessageEmbed, TextChannel } from "discord.js";
export default class WarnCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "rolename",

                    prompt: "Please give me a role name!",

                    type: "string"
                }
            ],

            description: "Creates a role with an optional color.",

            group: "moderation",

            guildOnly: true,

            memberName: "createrole",

            name: "createrole",

            ownerOnly: false,

            throttling: {
                duration: 10,
                usages: 5
            },
            userPermissions: ["MANAGE_ROLES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { rolename }: { rolename: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("There was an error?");
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            void msg.guild.roles.create({
                data: {
                    color: "000000",
                    hoist: false,
                    name: rolename
                },
                reason: `Role Created By ${msg.author.tag}`
            });

        } catch (err) {
            return msg.reply("The role cannot be created. Please check my permissions!");
        }
        const embed = new MessageEmbed()
            .setTitle(`${msg.author.tag} has created a role!`)
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setDescription(`Role name: **${rolename}**`)
            .setColor(CONFIG.colours.red)
            .setFooter(`Author ID: ${msg.author.id}`)
            .setTimestamp();
        const channels = STORAGE.modlogs;


        channels.forEach((ch) => {
            const channel = msg.guild?.channels.cache.get(ch.channelID) as TextChannel | undefined;

            if (channel === undefined) return;

            return channel.send(embed);

        });
        const rcreateembed = new MessageEmbed()
            .setDescription(`Role \`${rolename}\` was created.`)
            .setColor(CONFIG.colours.yellow);
        return msg.channel.send(rcreateembed);
    }
}

