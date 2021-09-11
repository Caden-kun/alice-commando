import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../utils/globals";
import { getMember } from "../../utils/getMember";
import { getUser } from "../../utils/getUser";
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
                    default: "lookup",

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
        if (whouser === "lookup")
            // eslint-disable-next-line prefer-destructuring
            member = msg.member;
        // eslint-disable-next-line prefer-destructuring
        if (member === null) {
            const user = await getUser(whouser, msg.client);
            if (user === null) return msg.reply("there was an internal error!\nError 100 - user_not_found\nPlease contact the devs with the error code if you think that there is a problem.");
            let presenceString;
            switch (user.presence.status) {
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
            const joinDiscord = moment(user.createdAt).format("llll");
            const embed = new MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
                .setTitle("This user is not in the server!")
                .setDescription(`${user.tag}`)
                .setColor(CONFIG.colours.yellow)
                .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                .addField("Account Created:", `${joinDiscord}`, false)
                .addField("Status:", presenceString, true)
                .setFooter(`ID: ${user.id}`)
                .setTimestamp();
            return msg.channel.send(embed);
        }

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
        let warncounts = db.get(`${member.id}_${msg.guild.id}_warns`);
        if (warncounts === null) warncounts = "0";
        const joinDiscord = moment(member.user.createdAt).format("llll");
        const joinServer = moment(member.joinedAt).format("llll");
        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${member.user}`)
            .setColor(member.displayColor)
            .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
            .addField("Joined at:", `${joinServer}`, true)
            .addField("Current Warns Count:", `${warncounts} Warnings`)
            .addField("Account Created:", `${joinDiscord}`, false)
            .addField("Status:", presenceString, true)
            .addField("Permissions:", perms)
            .setFooter(`ID: ${member.id}`)
            .setTimestamp();

        return msg.channel.send(embed);
    }
}