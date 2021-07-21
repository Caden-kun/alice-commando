import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { getMember } from "../../utils";
import moment from "moment";
const status = {
    dnd: "<:AH_StatusDnd:723216144680484955> Do Not Disturb",
    idle: "<:AH_StatusIdle:723216355137945620> Idle",
    invisible: "<:AH_StatusOffline:849807927052206080> Offline",
    offline: "<:AH_StatusOffline:849807927052206080> Offline",
    online: "<:AH_StatusOnline:723216269255507968> Online"

};
export default class WhoisCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["userinfo", "user"],

            args: [
                {
                    key: "whouser",

                    prompt: "Who do you want to get info about? Please ping or provide an ID!",

                    type: "string"
                }
            ],
            description: "Gets information about a user in the server.",

            group: "utility",

            guildOnly: true,


            memberName: "whois",

            name: "whois",

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
        { whouser }: { whouser: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.reply("This command can only be used in guilds!");

        let member = await getMember(whouser, msg.guild);
        // eslint-disable-next-line prefer-destructuring
        if (member === null) member = msg.member;

        if (member === null) return msg.reply("There was a problem! Please contact the devs!");

        let presenceString;
        switch (member.presence.status) {
            case "online":
                presenceString = status.online;
                break;

            case "offline":
                presenceString = status.offline;
                break;

            case "idle":
                presenceString = status.idle;
                break;

            case "dnd":
                presenceString = status.dnd;
                break;

            case "invisible":
                presenceString = status.invisible;
                break;


        }

        const permsArray = member.permissions.toArray();
        let perms = `${permsArray
            .map((p) => `${p
                .charAt(0)
                .toUpperCase()}${p.toLowerCase()
                .slice(1)
                .replace(/_/g, " ")}`)}`
            .replace(/,/g, ", ");
        if (perms === "") {
            perms = "No Perms";
        }

        const joinDiscord = moment(member.user.createdAt).format("llll");
        const joinServer = moment(member.joinedAt).format("llll");
        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${member.user}`)
            .setColor(member.displayColor)
            .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
            .addField("Joined at:", `${joinServer}`, true)
            .addField("Account Created:", `${joinDiscord}`, false)
            .addField("Status:", presenceString, true)
            .addField("Permissions:", perms)
            .setFooter(`ID: ${member.id}`)
            .setTimestamp();

        return msg.channel.send(embed);
    }
}