import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Guild, Message, MessageEmbed, TextChannel } from "discord.js";
export default class SuggestCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            args: [
                {
                    key: "suggestion",

                    prompt: "What would you like to suggest? Mention your idea here.",

                    type: "string"
                }
            ],
            description: "I send a suggestion to the support server where the bot owner can review it.",

            group: "utility",

            guildOnly: false,

            memberName: "suggest",

            name: "suggest",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { suggestion }: {suggestion: string;}
    ): Promise<Message | Message[]> {
        let suggestlocation = "";
        if (msg.guild === null)
            suggestlocation = "Suggestion was done in the Bot's Direct Messages.";
        if (msg.guild !== null)
            suggestlocation = `**Server:** ${msg.guild.name}`;
        const embed = new MessageEmbed()
            .setTitle("New Bot Suggestion!")
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
            .setColor(CONFIG.colours.yellow)
            .setDescription(`**Message Author:** ${msg.author.tag} - ${msg.author.toString()}`
            + `\n${suggestlocation}\n**Suggestion:** ${suggestion}`)
            .setFooter(`User ID: ${msg.author.id}`)
            .setTimestamp();
        const suglogserver: Guild = await msg.client.guilds.fetch(STORAGE.suggestionserver);

        const botsuggest: TextChannel = suglogserver.channels.cache.get(STORAGE.suggestionchannel) as TextChannel;
        void await botsuggest.send(embed);
        return msg.reply("Thank you for your suggestion. It has been sent to the bot support server.");
    }
}