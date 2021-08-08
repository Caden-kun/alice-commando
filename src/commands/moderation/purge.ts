import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Message, MessageEmbed, TextChannel } from "discord.js";
export default class PurgeCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["clear", "nuke", "bulkdelete"],

            args: [
                {
                    key: "purgeamount",

                    prompt: "how many messages are you purging?",

                    type: "string"
                }
            ],

            description: "clears the chat of up to 100 messages",

            group: "moderation",

            guildOnly: true,

            memberName: "purge",

            name: "purge",

            ownerOnly: false,

            throttling: {
                duration: 10,
                usages: 5
            },
            userPermissions: ["MANAGE_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { purgeamount }: { purgeamount: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("There was an error?");
        void msg.delete();
        const deleteCount = parseInt(purgeamount, 10);
        if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            return msg.reply("Please provide a number between 2 and 100 for the number of messages to delete");

        }

        const purgeembed = new MessageEmbed()
            .setDescription(`**${purgeamount}** messages was deleted.`)
            .setColor(CONFIG.colours.green);
        if (msg.channel.type === "dm")
            return msg.reply("I cannot purge dms!");
        const fetched = await msg.channel.messages.fetch({ limit: deleteCount });
        msg.channel.bulkDelete(fetched)
            .catch(async (err) => msg.reply(`Couldn't delete messages because of: ${err}`));
        void msg.channel.send(purgeembed)
            .then((message) => {
                void message.delete({ timeout: 5000 });
            });
        const channels = STORAGE.modlogs;
        const embed = new MessageEmbed()
            .setTitle(`Purge command used by ${msg.author.tag}`)
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            .setDescription(`**Purge Amount:** ${purgeamount} messages\n**Channel: **${msg.channel.toString()}\n**Moderator:** ${msg.author.tag} - ${msg.author.toString()}`)
            .setColor(CONFIG.colours.red)
            .setFooter(`Moderator ID: ${msg.author.id}`)
            .setTimestamp();
        channels.forEach((ch) => {
            const channel = msg.guild?.channels.cache.get(ch.channelID) as TextChannel | undefined;

            if (channel === undefined) return;

            return channel.send(embed);

        });
        return msg;
    }
}

