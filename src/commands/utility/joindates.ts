/* eslint-disable prefer-destructuring */
import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { getMember } from "../../utils/getMember";
import moment from "moment";
const status = {
    dnd: "<:AH_StatusDnd:723216144680484955> Do Not Disturb",
    idle: "<:AH_StatusIdle:723216355137945620> Idle",
    invisible: "<:AH_StatusOffline:849807927052206080> Offline",
    offline: "<:AH_StatusOffline:849807927052206080> Offline",
    online: "<:AH_StatusOnline:723216269255507968> Online"

};


export default class JoindatesCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            args: [
                {
                    key: "joindate",

                    prompt: "Please mention or provide the ID of the user.",

                    type: "string"
                }
            ],
            description: "Gets the user's account creation date and server join date (if applicable).",

            group: "utility",

            memberName: "joindates",

            name: "joindates",

            ownerOnly: false,

            throttling: {
                duration: 5,
                usages: 3
            }

        });
    }

    // Now to run the actual command, the run() parameters need to be defiend (by types and names)
    public async run(
        msg: commando.CommandoMessage,
        { joindate }: { joindate: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.reply("This command can only be used in guilds!");

        let member = await getMember(joindate, msg.guild);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
            .addField("Joined Server On:", `${joinServer}`, true)
            .addField("Account Created On:", `${joinDiscord}`, false)
            .addField("Status:", presenceString, true)
            .setTimestamp();
        return msg.channel.send(embed);
    }
}