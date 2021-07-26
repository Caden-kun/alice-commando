import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Guild, Message, MessageEmbed, TextChannel } from "discord.js";
import { getMember } from "../../utils/getMember";

// Creates a new class (being the command) extending off of the commando client
export default class AvatarCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            aliases: ["av", "pfp"],
            args: [
                {
                    default: "",
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
            // eslint-disable-next-line prefer-destructuring
            member = msg.member;
        if (member === null)
            return msg.reply("there was a problem?");
        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag}'s Avatar:`)
            .setColor(CONFIG.colours.yellow)
            .setImage(`${member.user.displayAvatarURL({ dynamic: true, size: 4096 })}`);
        void msg.channel.send(embed);


        const log = new MessageEmbed()
            .setTitle("Command used: Avatar")
            .setDescription(`User: ${msg.author} - ${msg.author.tag}\nServer ID: ${msg.guild.id}\nServer Name: ${msg.guild.name}`)
            .setColor(CONFIG.colours.yellow)
            .setTimestamp();
        const botlogserver: Guild = await msg.client.guilds.fetch(STORAGE.botlogserver);

        const cuddlelog: TextChannel = botlogserver.channels.cache.get(STORAGE.botlogchannel) as TextChannel;
        return cuddlelog.send(log);

    }

}