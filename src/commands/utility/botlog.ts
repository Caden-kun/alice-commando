import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../globals";
import { Guild, Message, MessageEmbed, TextChannel } from "discord.js";
import Storage from "../../storage";
export default class QotdsetCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["setbotlogs"],

            args: [
                {
                    key: "botchannel",

                    prompt: "which channel would you like to set for the botlog? Please provide a channel ID.",

                    type: "string"
                }
            ],

            description: "Devs Only command",

            group: "group1",

            guildOnly: true,


            memberName: "setcmdlog",

            name: "setcmdlog",

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
        { botchannel }: { botchannel: string; }
    ): Promise<Message | Message[]> {

        STORAGE.botlogchannel = botchannel;
        if (msg.guild === null) return msg.say("There was an error?");
        STORAGE.botlogserver = msg.guild.id;
        // eslint-disable-next-line prefer-destructuring
        Storage.saveConfig();
        const embed = new MessageEmbed()
            .setTitle(`${msg.author.tag} has changed the command log location!`)
            .setDescription(`${msg.author} - ${msg.author.tag} has changed the command log channel to <#${STORAGE.botlogchannel}>!\n`
         + `Channel ID: ${STORAGE.botlogchannel}`)
            .setColor(CONFIG.colours.yellow)
            .setTimestamp();
        const botlogserver: Guild = await msg.client.guilds.fetch(STORAGE.botlogserver);

        const botlogs: TextChannel = botlogserver.channels.cache.get(STORAGE.botlogchannel) as TextChannel;

        void msg.say(`<#${STORAGE.botlogchannel}> has been set! All command logs` +
        " will be logged here.");
        return botlogs.send(embed);
    }
}