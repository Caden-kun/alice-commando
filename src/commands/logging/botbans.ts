import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Guild, Message, MessageEmbed, TextChannel } from "discord.js";
import Storage from "../../utils/storage";
export default class BotlogCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["setbanlogs"],

            args: [
                {
                    key: "banlogs",

                    prompt: "which channel would you like to set for the botlog? Please provide a channel ID.",

                    type: "string"
                }
            ],

            description: "Devs Only command",

            group: "group1",

            guildOnly: true,


            memberName: "banlogs",

            name: "banlogs",

            ownerOnly: true,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { banlogs }: { banlogs: string; }
    ): Promise<Message | Message[]> {

        STORAGE.botbanchannel = banlogs;
        if (msg.guild === null) return msg.say("There was an error?");
        STORAGE.botbanserver = msg.guild.id;
        // eslint-disable-next-line prefer-destructuring
        Storage.saveConfig();
        const embed = new MessageEmbed()
            .setTitle(`${msg.author.tag} has changed the Bot Ban Log location!`)
            .setDescription(`${msg.author} - ${msg.author.tag} has changed the command log channel to <#${STORAGE.botbanchannel}>!\n`
         + `Channel ID: ${STORAGE.botbanchannel}`)
            .setColor(CONFIG.colours.yellow)
            .setTimestamp();
        const banlogserver: Guild = await msg.client.guilds.fetch(STORAGE.botbanserver);

        const banlogchannel: TextChannel = banlogserver.channels.cache.get(STORAGE.botbanchannel) as TextChannel;

        void msg.say(`<#${STORAGE.botbanchannel}> has been set! Bot Ban logs` +
        " will be logged here.");
        return banlogchannel.send(embed);
    }
}